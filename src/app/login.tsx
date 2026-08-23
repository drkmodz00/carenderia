import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { useRouter } from "expo-router";

import { loginStyles as styles } from "@/styles/admin/login.styles";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = () => {
    setError("");

    /* ================================
       VALIDATION
    ================================= */

    if (!username.trim()) {
      setError(
        "Please enter your username.",
      );

      return;
    }

    if (!password.trim()) {
      setError(
        "Please enter your password.",
      );

      return;
    }

    setIsLoading(true);

    /* ================================
       TEMPORARY LOGIN
       
       Username: admin
       Password: admin123
    ================================= */

    setTimeout(() => {
      const validUsername =
        username.trim().toLowerCase() ===
        "admin";

      const validPassword =
        password === "admin123";

      if (
        validUsername &&
        validPassword
      ) {
        setIsLoading(false);

        /*
          Go directly to MENU
        */

        router.replace("/admin/orders");
      } else {
        setIsLoading(false);

        setError(
          "Invalid username or password.",
        );
      }
    }, 500);
  };

  /* =====================================================
     SCREEN
  ===================================================== */

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>

          {/* ==========================================
              LOGO
          =========================================== */}

          <View style={styles.logo}>
            <Text style={styles.logoText}>
              🍽️
            </Text>
          </View>

          {/* ==========================================
              BRAND
          =========================================== */}

          <Text style={styles.brandName}>
            Carenderia POS
          </Text>

          <Text style={styles.brandSubtitle}>
            Mabilis · Madali · Maaasahan
          </Text>

          {/* ==========================================
              LOGIN CARD
          =========================================== */}

          <View style={styles.card}>

            <Text style={styles.title}>
              Mag-login
            </Text>

            {/* ======================================
                ERROR
            ======================================= */}

            {error !== "" && (
              <View style={styles.errorBox}>
                <Text style={styles.errorIcon}>
                  !
                </Text>

                <Text style={styles.errorText}>
                  {error}
                </Text>
              </View>
            )}

            {/* ======================================
                USERNAME
            ======================================= */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Username
              </Text>

              <TextInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError("");
                }}
                style={styles.input}
                placeholder="Ilagay ang username"
                placeholderTextColor="#A98F79"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
              />
            </View>

            {/* ======================================
                PASSWORD
            ======================================= */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Password
              </Text>

              <View
                style={
                  styles.passwordContainer
                }
              >
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  style={
                    styles.passwordInput
                  }
                  placeholder="Ilagay ang password"
                  placeholderTextColor="#A98F79"
                  secureTextEntry={
                    !showPassword
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={
                    handleLogin
                  }
                  returnKeyType="done"
                />

                <Pressable
                  onPress={() =>
                    setShowPassword(
                      (current) =>
                        !current,
                    )
                  }
                  style={
                    styles.showButton
                  }
                >
                  <Text
                    style={
                      styles.showButtonText
                    }
                  >
                    {showPassword
                      ? "Hide"
                      : "Show"}
                  </Text>
                </Pressable>
              </View>
            </View>

            {/* ======================================
                LOGIN BUTTON
            ======================================= */}

            <Pressable
              onPress={handleLogin}
              disabled={isLoading}
              style={[
                styles.loginButton,
                isLoading &&
                  styles.loginButtonDisabled,
              ]}
            >
              <Text
                style={
                  styles.loginButtonText
                }
              >
                {isLoading
                  ? "Nagla-login..."
                  : "Login"}
              </Text>
            </Pressable>

          </View>

          {/* ==========================================
              DEMO ACCOUNT
          =========================================== */}

          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>
              Demo Account
            </Text>

            <Text style={styles.demoText}>
              Username: admin
            </Text>

            <Text style={styles.demoText}>
              Password: admin123
            </Text>
          </View>

          {/* ==========================================
              FOOTER
          =========================================== */}

          <Text style={styles.footer}>
            Carenderia POS v1.0 · © 2026
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
