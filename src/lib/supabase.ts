import "react-native-url-polyfill/auto";

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("EXPO_PUBLIC_SUPABASE_URL is missing");
}

if (!supabaseAnonKey) {
  throw new Error("EXPO_PUBLIC_SUPABASE_ANON_KEY is missing");
}

const isSSR = typeof window === "undefined";

const webStorage = {
  getItem: async (key: string): Promise<string | null> => {
    if (isSSR) {
      return null;
    }

    return window.localStorage.getItem(key);
  },

  setItem: async (
    key: string,
    value: string
  ): Promise<void> => {
    if (isSSR) {
      return;
    }

    window.localStorage.setItem(key, value);
  },

  removeItem: async (key: string): Promise<void> => {
    if (isSSR) {
      return;
    }

    window.localStorage.removeItem(key);
  },
};

const storage =
  Platform.OS === "web"
    ? webStorage
    : AsyncStorage;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);