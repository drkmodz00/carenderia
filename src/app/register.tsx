import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { supabase } from "@/lib/supabase";
import { registerStyles as styles } from "@/styles/admin/register.styles";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const testSupabase = async () => {
    try {
      console.log(
        "SUPABASE URL:",
        process.env.EXPO_PUBLIC_SUPABASE_URL
      );

      const { data, error } =
        await supabase.auth.getSession();

      console.log("SESSION:", data);
      console.log("ERROR:", error);
    } catch (err) {
      console.error("SUPABASE TEST ERROR:", err);
    }
  };

  const handleRegister = async () => {
    if (loading) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password) {
      Alert.alert(
        "Missing Information",
        "Please complete all fields."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: {
              name: cleanName,
              role: "admin",
            },
          },
        });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Account was not created.");
      }

      const { data: sessionData } =
        await supabase.auth.getSession();

      if (sessionData.session) {
        router.replace("/admin/orders");
        return;
      }

      Alert.alert(
        "Account Created",
        "Your account has been created. Please verify your email before logging in.",
        [
          {
            text: "Go to Login",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error: any) {
      console.log("Registration error:", error);

      let message =
        "Something went wrong while creating your account.";

      if (
        error?.message
          ?.toLowerCase()
          .includes("already registered")
      ) {
        message = "That email is already registered.";
      } else if (error?.message) {
        message = error.message;
      }

      Alert.alert("Registration Failed", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.eyebrow}>
            CARENDERIA POS
          </Text>

          <Text style={styles.title}>
            Create admin account
          </Text>

          <Text style={styles.subtitle}>
            Set up the administrator account to manage your POS.
          </Text>

          <Text style={styles.label}>
            Full name
          </Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Enter full name"
            placeholderTextColor="#5F646D"
            autoCapitalize="words"
            editable={!loading}
            style={styles.input}
          />

          <Text style={styles.label}>
            Email
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            placeholderTextColor="#5F646D"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            style={styles.input}
          />

          <Text style={styles.label}>
            Password
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Minimum 6 characters"
            placeholderTextColor="#5F646D"
            secureTextEntry
            editable={!loading}
            style={styles.passwordInput}
          />

          <Pressable
            onPress={handleRegister}
            disabled={loading}
            style={[
              styles.registerButton,
              loading && styles.registerButtonDisabled,
            ]}
          >
            <Text style={styles.registerButtonText}>
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.replace("/login")}
            disabled={loading}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
