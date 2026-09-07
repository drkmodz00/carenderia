import { supabase } from "@/lib/supabase";

export type RestaurantSettings = {
  id: string;
  name: string;
  address: string | null;

  receipt_footer_enabled: boolean;
  receipt_footer_message: string | null;

  printer_enabled: boolean;
  printer_status:
    | "connected"
    | "disconnected"
    | "connecting"
    | "error";

  updated_at: string;
};

export type UserProfile = {
  id: string;
  name: string | null;
  username: string;
  role: "admin" | "cashier" | string;
};

/**
 * =====================================================
 * GET RESTAURANT SETTINGS
 * =====================================================
 */
export async function getRestaurantSettings(): Promise<RestaurantSettings> {
  const { data, error } = await supabase
    .from("restaurant_settings")
    .select("*")
    .order("updated_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Failed to load settings: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      "Restaurant settings have not been created yet."
    );
  }

  return data as RestaurantSettings;
}

/**
 * =====================================================
 * CREATE DEFAULT RESTAURANT SETTINGS
 * =====================================================
 */
export async function createRestaurantSettings(): Promise<RestaurantSettings> {
  const { data, error } = await supabase
    .from("restaurant_settings")
    .insert({
      name: "Carenderia ni Aling Rosa",
      address: null,

      receipt_footer_enabled: true,
      receipt_footer_message:
        "Salamat sa inyong pagbisita!",

      printer_enabled: false,
      printer_status: "disconnected",
    })
    .select()
    .single();

  if (error) {
    throw new Error(
      `Failed to create settings: ${error.message}`
    );
  }

  return data as RestaurantSettings;
}

/**
 * =====================================================
 * UPDATE RESTAURANT SETTINGS
 * =====================================================
 */
export async function updateRestaurantSettings(
  updates: Partial<
    Pick<
      RestaurantSettings,
      | "name"
      | "address"
      | "receipt_footer_enabled"
      | "receipt_footer_message"
      | "printer_enabled"
      | "printer_status"
    >
  >
): Promise<RestaurantSettings> {
  const current =
    await getRestaurantSettings();

  const { data, error } = await supabase
    .from("restaurant_settings")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", current.id)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Failed to update settings: ${error.message}`
    );
  }

  return data as RestaurantSettings;
}

/**
 * =====================================================
 * GET CURRENT USER PROFILE
 *
 * Uses the currently authenticated Supabase user.
 *
 * If the profile doesn't exist yet, automatically
 * creates one using the Auth user's metadata/email.
 * =====================================================
 */
export async function getCurrentProfile(): Promise<UserProfile | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(
      `Authentication error: ${authError.message}`
    );
  }

  if (!user) {
    return null;
  }

  /**
   * ===================================================
   * GET EXISTING PROFILE
   * ===================================================
   */

  const {
    data: existingProfile,
    error: profileError,
  } = await supabase
    .from("profiles")
    .select(
      "id, name, username, role"
    )
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    throw new Error(
      `Failed to load profile: ${profileError.message}`
    );
  }

  /**
   * ===================================================
   * PROFILE EXISTS
   * ===================================================
   */

  if (existingProfile) {
    return existingProfile as UserProfile;
  }

  /**
   * ===================================================
   * PROFILE DOES NOT EXIST
   *
   * Automatically create it.
   * ===================================================
   */

  const metadata =
    user.user_metadata ?? {};

  const generatedUsername =
    metadata.username ??
    user.email?.split("@")[0] ??
    `user_${user.id.slice(0, 8)}`;

  const generatedName =
    metadata.name ??
    metadata.full_name ??
    user.email?.split("@")[0] ??
    "Admin";

  const generatedRole =
    metadata.role ?? "admin";

  const {
    data: newProfile,
    error: insertError,
  } = await supabase
    .from("profiles")
    .insert({
      id: user.id,

      name: generatedName,

      username:
        generatedUsername,

      role: generatedRole,
    })
    .select(
      "id, name, username, role"
    )
    .single();

  if (insertError) {
    throw new Error(
      `Failed to create profile: ${insertError.message}`
    );
  }

  return newProfile as UserProfile;
}
