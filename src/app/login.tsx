import React, { useState } from "react";
import { Alert,  Pressable, Text, TextInput, useWindowDimensions, View, } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { loginStyles } from "@/styles/admin/login.styles";

const TABLET_BREAKPOINT = 768;

export default function LoginPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      console.log("LOGIN START:", cleanEmail);

      const {
        data: authData,
        error: loginError,
      } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      console.log(
        "AUTH RESULT:",
        authData,
        loginError
      );

      if (loginError) {
        Alert.alert(
          "Login Failed",
          loginError.message
        );
        return;
      }

      if (!authData.user) {
        Alert.alert(
          "Login Failed",
          "User account could not be loaded."
        );
        return;
      }

      const user = authData.user;

      const username =
        user.user_metadata?.username;

      const name =
        user.user_metadata?.name;

      const role =
        user.user_metadata?.role;

      console.log("LOGGED IN USER:", {
        id: user.id,
        email: user.email,
        username,
        name,
        role,
      });

      if (role === "admin") {
        console.log("ROLE: ADMIN");

        router.replace("/admin/orders");
        return;
      }

      if (role === "cashier") {
        console.log("ROLE: CASHIER");

        router.replace("/admin/orders");
        return;
      }

      console.log("INVALID ROLE:", role);

      await supabase.auth.signOut();

      Alert.alert(
        "Access Denied",
        "Your account does not have a valid role."
      );
    } catch (error: any) {
      console.log(
        "LOGIN ERROR:",
        error
      );

      Alert.alert(
        "Login Failed",
        error?.message ||
          "Something went wrong while logging in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={[
        loginStyles.page,
        {
          flexDirection: isTablet ? "row" : "column",
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {isTablet && (
        <View style={loginStyles.brandPanel}>
          <Text style={loginStyles.brandEyebrow}>Admin Portal</Text>
          <Text style={loginStyles.brandTitle}>
            Manage orders with ease
          </Text>
          <Text style={loginStyles.brandText}>
            Sign in with your account to access the system.
          </Text>
        </View>
      )}

      <View style={loginStyles.formPanel}>
        <View style={loginStyles.card}>
          {/* TITLE */}
          <Text style={loginStyles.title}>Welcome back</Text>
          <Text style={loginStyles.subtitle}>Log in to continue</Text>

          {/* EMAIL */}
          <Text style={loginStyles.label}>Email</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#5B5F68"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            style={loginStyles.input}
          />

          <Text style={loginStyles.label}>Password</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#5B5F68"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
            style={loginStyles.inputLast}
          />

          <Pressable
            onPress={handleLogin}
            disabled={loading}
            style={[
              loginStyles.loginButton,
              loading && loginStyles.loginButtonDisabled,
            ]}
          >
            <Text style={loginStyles.loginButtonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </Pressable>

          {/* REGISTER */}
          <Pressable
            onPress={() => router.replace("/register")}
            disabled={loading}
            style={loginStyles.registerButton}
          >
            <Text style={loginStyles.registerButtonText}>
              Don't have an account? Create Account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}