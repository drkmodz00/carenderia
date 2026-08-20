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

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const handleLogin = () => {
    setError("");

    /* ============================================
       VALIDATION
    ============================================ */

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    setIsLoading(true);

    /*
      FRONTEND ONLY LOGIN

      Temporary credentials:

      Username: admin
      Password: admin123

      Later replace this with your
      backend authentication.
    */

    setTimeout(() => {
      if (
        username.trim().toLowerCase() === "admin" &&
        password === "admin123"
      ) {
        setIsLoading(false);

        // Replace login page with admin dashboard
        router.replace("/admin");
      } else {
        setIsLoading(false);

        setError(
          "Invalid username or password."
        );
      }
    }, 700);
  };

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
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.loginContainer}>

          {/* ======================================
              LOGO
          ====================================== */}

          <View style={styles.logo}>
            <Text style={styles.logoText}>
              C
            </Text>
          </View>

          {/* ======================================
              BRAND
          ====================================== */}

          <Text style={styles.brandName}>
            Carenderia
          </Text>

          <Text style={styles.brandSubtitle}>
            Management System
          </Text>

          {/* ======================================
              LOGIN CARD
          ====================================== */}

          <View style={styles.card}>

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to manage your carenderia
            </Text>

            {/* ==================================
                ERROR
            ================================== */}

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

            {/* ==================================
                USERNAME
            ================================== */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                USERNAME
              </Text>

              <TextInput
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError("");
                }}
                style={styles.input}
                placeholder="Enter username"
                placeholderTextColor="#A98F79"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* ==================================
                PASSWORD
            ================================== */}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                PASSWORD
              </Text>

              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError("");
                  }}
                  style={styles.passwordInput}
                  placeholder="Enter password"
                  placeholderTextColor="#A98F79"
                  secureTextEntry={
                    !showPassword
                  }
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={
                    handleLogin
                  }
                />

                <Pressable
                  onPress={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  style={styles.showButton}
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

            {/* ==================================
                LOGIN BUTTON
            ================================== */}

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
                  ? "Signing in..."
                  : "Login"}
              </Text>
            </Pressable>

            {/* ==================================
                DEMO CREDENTIALS
            ================================== */}

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

          </View>

          {/* ======================================
              FOOTER
          ====================================== */}

          <Text style={styles.footer}>
            Carenderia Management System v1.0
          </Text>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}