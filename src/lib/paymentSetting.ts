import { supabase } from "@/lib/supabase";

export type PaymentSettings = {
  id: string;
  qr_image_url: string | null;
  account_name: string | null;
  updated_at?: string;
};

type RestaurantSettingsRow = {
  id: string;
  gcash_qr_url: string | null;
  gcash_account_name: string | null;
  updated_at: string;
};

const SELECT_COLUMNS =
  "id, gcash_qr_url, gcash_account_name, updated_at";

function mapRow(row: RestaurantSettingsRow): PaymentSettings {
  return {
    id: row.id,
    qr_image_url: row.gcash_qr_url,
    account_name: row.gcash_account_name,
    updated_at: row.updated_at,
  };
}

/**
 * Get the restaurant's GCash payment settings.
 */
export async function getPaymentSettings(): Promise<PaymentSettings | null> {
  const { data, error } = await supabase
    .from("restaurant_settings")
    .select(SELECT_COLUMNS)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw error;
  }

  if (!data) {
    return null;
  }

  return mapRow(data as RestaurantSettingsRow);
}

/**
 * Upload a GCash QR image to Supabase Storage.
 */
async function uploadPaymentQr(localUri: string): Promise<string> {
  const response = await fetch(localUri);

  if (!response.ok) {
    throw new Error("Unable to read the selected QR image.");
  }

  const blob = await response.blob();

  const contentType = blob.type || "image/jpeg";

  if (!contentType.startsWith("image/")) {
    throw new Error(
      "Please select a valid image for the GCash QR code."
    );
  }

  const extensionMap: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };

  const fileExt = extensionMap[contentType] || "jpg";

  const filePath = `qr/gcash-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("payment-qr")
    .upload(filePath, blob, {
      contentType,
      upsert: true,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("payment-qr")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Save GCash QR and account name.
 *
 * GCash is the only QR payment configured here.
 * Cash/GCash selection belongs to the order/payment method.
 */
export async function savePaymentSettings(input: {
  qrImageUri: string | null;
  accountName: string;
}): Promise<PaymentSettings> {
  const existing = await getPaymentSettings();

  if (!existing) {
    throw new Error(
      "No restaurant settings found yet. Please set up your restaurant name in Settings first."
    );
  }

  const payload: Record<string, unknown> = {
    gcash_account_name: input.accountName.trim() || null,
    updated_at: new Date().toISOString(),
  };

  if (input.qrImageUri) {
    payload.gcash_qr_url = await uploadPaymentQr(
      input.qrImageUri
    );
  }

  const { data, error } = await supabase
    .from("restaurant_settings")
    .update(payload)
    .eq("id", existing.id)
    .select(SELECT_COLUMNS)
    .single();

  if (error) {
    throw error;
  }

  return mapRow(data as RestaurantSettingsRow);
}

/**
 * Remove the GCash QR.
 *
 * The account name is intentionally kept.
 */
export async function removePaymentQr(): Promise<PaymentSettings> {
  const existing = await getPaymentSettings();

  if (!existing) {
    throw new Error("No restaurant settings found.");
  }

  const { data, error } = await supabase
    .from("restaurant_settings")
    .update({
      gcash_qr_url: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select(SELECT_COLUMNS)
    .single();

  if (error) {
    throw error;
  }

  return mapRow(data as RestaurantSettingsRow);
}
