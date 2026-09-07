import { supabase } from "@/lib/supabase";

/* =====================================================
   TYPES
===================================================== */

export type MenuItem = {
  id: string;
  category_id: string;
  category: string;
  name: string;
  price: number;
  available: boolean;
  icon: string | null;
  image_url: string | null;
};

type SupabaseMenuItem = {
  id: string;
  category_id: string;
  name: string;
  price: number;
  available: boolean;
  icon: string | null;
  image_url: string | null;

  categories:
    | {
        id: string;
        name: string;
      }
    | {
        id: string;
        name: string;
      }[]
    | null;
};

/* =====================================================
   CONSTANTS
===================================================== */

const STORAGE_BUCKET = "menu-images";

/* =====================================================
   HELPER:
   CONVERT SUPABASE DATA → MENU ITEM
===================================================== */

function mapMenuItem(
  item: SupabaseMenuItem
): MenuItem {
  const itemCategory = Array.isArray(
    item.categories
  )
    ? item.categories[0]
    : item.categories;

  return {
    id: String(item.id),

    category_id: String(
      item.category_id
    ),

    category:
      itemCategory?.name ??
      "Uncategorized",

    name: item.name,

    price: Number(item.price),

    available: Boolean(
      item.available
    ),

    icon: item.icon ?? null,

    image_url:
      item.image_url ?? null,
  };
}

/* =====================================================
   HELPER:
   GET STORAGE PATH FROM IMAGE URL
===================================================== */

function getStoragePath(
  imageUrl: string | null
): string | null {
  if (!imageUrl) {
    return null;
  }

  try {
    /*
      Example URL:

      https://xxxxx.supabase.co/storage/v1/object/public/
      menu-images/123456-adobo.jpg

      We only need:

      123456-adobo.jpg
    */

    const marker =
      `/storage/v1/object/public/${STORAGE_BUCKET}/`;

    const index =
      imageUrl.indexOf(marker);

    if (index === -1) {
      return null;
    }

    return decodeURIComponent(
      imageUrl.substring(
        index + marker.length
      )
    );
  } catch (error) {
    console.error(
      "Unable to get storage path:",
      error
    );

    return null;
  }
}

/* =====================================================
   UPLOAD IMAGE
===================================================== */

export async function uploadMenuImage(
  imageUri: string
): Promise<string> {
  if (!imageUri) {
    throw new Error(
      "No image was selected."
    );
  }

  try {
    /*
      Convert URI to Blob.

      Works for Expo Web and browser.
    */

    const response =
      await fetch(imageUri);

    if (!response.ok) {
      throw new Error(
        "Unable to read selected image."
      );
    }

    const blob =
      await response.blob();

    /*
      Generate unique filename.
    */

    const extension =
      imageUri
        .split(".")
        .pop()
        ?.split("?")[0]
        ?.toLowerCase() || "jpg";

    const fileName =
      `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}.${extension}`;

    /* =================================================
       UPLOAD TO SUPABASE STORAGE
    ================================================= */

    const {
      error: uploadError,
    } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(
        fileName,
        blob,
        {
          contentType:
            blob.type ||
            "image/jpeg",

          cacheControl:
            "3600",

          upsert: false,
        }
      );

    if (uploadError) {
      console.error(
        "Image upload error:",
        uploadError
      );

      throw uploadError;
    }

    /* =================================================
       GET PUBLIC URL
    ================================================= */

    const {
      data: publicUrlData,
    } =
      supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(
          fileName
        );

    if (
      !publicUrlData?.publicUrl
    ) {
      throw new Error(
        "Unable to get image URL."
      );
    }

    return publicUrlData.publicUrl;

  } catch (error) {
    console.error(
      "uploadMenuImage error:",
      error
    );

    throw error;
  }
}

/* =====================================================
   DELETE IMAGE FROM STORAGE
===================================================== */

export async function deleteMenuImage(
  imageUrl: string | null
): Promise<void> {
  if (!imageUrl) {
    return;
  }

  const storagePath =
    getStoragePath(imageUrl);

  if (!storagePath) {
    return;
  }

  const {
    error,
  } = await supabase.storage
    .from(STORAGE_BUCKET)
    .remove([
      storagePath,
    ]);

  if (error) {
    console.error(
      "Image delete error:",
      error
    );

    /*
      Don't throw here.

      If the database item was already
      deleted, a Storage deletion failure
      shouldn't make the UI look like the
      whole operation failed.
    */
  }
}

/* =====================================================
   GET MENU ITEMS
===================================================== */

export async function getMenuItems(): Promise<
  MenuItem[]
> {
  const {
    data,
    error,
  } = await supabase
    .from("menu_items")
    .select(`
      id,
      category_id,
      name,
      price,
      available,
      icon,
      image_url,
      categories (
        id,
        name
      )
    `)
    .order("name", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (
    (data ?? []) as SupabaseMenuItem[]
  ).map(mapMenuItem);
}

/* =====================================================
   ADD MENU ITEM
===================================================== */

export async function addMenuItem(
  name: string,
  price: number,
  category: string,
  image?: string | null
): Promise<MenuItem> {
  /* ===================================================
     FIND CATEGORY
  =================================================== */

  const {
    data: categoryData,
    error: categoryError,
  } = await supabase
    .from("categories")
    .select("id, name")
    .eq("name", category)
    .maybeSingle();

  if (categoryError) {
    throw categoryError;
  }

  if (!categoryData) {
    throw new Error(
      `Category "${category}" was not found.`
    );
  }

  let imageUrl:
    | string
    | null = null;

  /* ===================================================
     UPLOAD IMAGE
  =================================================== */

  if (image) {
    imageUrl =
      await uploadMenuImage(
        image
      );
  }

  /* ===================================================
     INSERT MENU ITEM
  =================================================== */

  const {
    data,
    error,
  } = await supabase
    .from("menu_items")
    .insert({
      category_id:
        categoryData.id,

      name: name.trim(),

      price,

      available: true,

      /*
        Keep icon if your frontend
        still uses it.
      */
      icon: null,

      /*
        Actual image URL
      */
      image_url: imageUrl,
    })
    .select(`
      id,
      category_id,
      name,
      price,
      available,
      icon,
      image_url,
      categories (
        id,
        name
      )
    `)
    .single();

  if (error) {
    /*
      If database insertion fails after
      successful image upload, remove
      the uploaded image to avoid an
      orphaned Storage file.
    */

    if (imageUrl) {
      await deleteMenuImage(
        imageUrl
      );
    }

    throw error;
  }

  return mapMenuItem(
    data as SupabaseMenuItem
  );
}

/* =====================================================
   UPDATE MENU ITEM
===================================================== */

export async function updateMenuItem(
  id: string,
  name: string,
  price: number,
  category: string,
  image?: string | null
): Promise<MenuItem> {
  /* ===================================================
     FIND CATEGORY
  =================================================== */

  const {
    data: categoryData,
    error: categoryError,
  } = await supabase
    .from("categories")
    .select("id, name")
    .eq("name", category)
    .maybeSingle();

  if (categoryError) {
    throw categoryError;
  }

  if (!categoryData) {
    throw new Error(
      `Category "${category}" was not found.`
    );
  }

  /* ===================================================
     GET CURRENT IMAGE
  =================================================== */

  const {
    data: currentItem,
    error: currentItemError,
  } = await supabase
    .from("menu_items")
    .select(
      "image_url"
    )
    .eq("id", id)
    .single();

  if (currentItemError) {
    throw currentItemError;
  }

  const oldImageUrl =
    currentItem?.image_url ??
    null;

  let newImageUrl =
    oldImageUrl;

  /* ===================================================
     IF NEW IMAGE WAS SELECTED
  =================================================== */

  if (
    image &&
    image !== oldImageUrl
  ) {
    newImageUrl =
      await uploadMenuImage(
        image
      );
  }

  /* ===================================================
     UPDATE DATABASE
  =================================================== */

  const {
    data,
    error,
  } = await supabase
    .from("menu_items")
    .update({
      category_id:
        categoryData.id,

      name: name.trim(),

      price,

      image_url:
        newImageUrl,
    })
    .eq("id", id)
    .select(`
      id,
      category_id,
      name,
      price,
      available,
      icon,
      image_url,
      categories (
        id,
        name
      )
    `)
    .single();

  if (error) {
    /*
      Database update failed.

      If a new image was uploaded,
      delete it because it is no
      longer needed.
    */

    if (
      newImageUrl &&
      newImageUrl !== oldImageUrl
    ) {
      await deleteMenuImage(
        newImageUrl
      );
    }

    throw error;
  }

  /* ===================================================
     DELETE OLD IMAGE
  =================================================== */

  if (
    oldImageUrl &&
    newImageUrl !== oldImageUrl
  ) {
    await deleteMenuImage(
      oldImageUrl
    );
  }

  return mapMenuItem(
    data as SupabaseMenuItem
  );
}

/* =====================================================
   TOGGLE MENU ITEM
===================================================== */

export async function toggleMenuItem(
  id: string,
  available: boolean
): Promise<MenuItem> {
  const {
    data,
    error,
  } = await supabase
    .from("menu_items")
    .update({
      available,
    })
    .eq("id", id)
    .select(`
      id,
      category_id,
      name,
      price,
      available,
      icon,
      image_url,
      categories (
        id,
        name
      )
    `)
    .single();

  if (error) {
    throw error;
  }

  return mapMenuItem(
    data as SupabaseMenuItem
  );
}

/* =====================================================
   DELETE MENU ITEM
===================================================== */

export async function deleteMenuItem(
  id: string
): Promise<void> {
  /* ===================================================
     GET IMAGE BEFORE DELETE
  =================================================== */

  const {
    data: item,
    error: itemError,
  } = await supabase
    .from("menu_items")
    .select(
      "image_url"
    )
    .eq("id", id)
    .single();

  if (itemError) {
    throw itemError;
  }

  /* ===================================================
     DELETE DATABASE RECORD
  =================================================== */

  const {
    error,
  } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (error) {
    throw error;
  }

  /* ===================================================
     DELETE IMAGE FROM STORAGE
  =================================================== */

  if (item?.image_url) {
    await deleteMenuImage(
      item.image_url
    );
  }
}