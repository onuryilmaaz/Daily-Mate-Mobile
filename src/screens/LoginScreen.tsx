import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { authService } from "../api/authService";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/shared/ui/Input";
import Button from "../components/shared/ui/Button";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }
    setIsLoading(true);
    try {
      const { token, user } = await authService.login({ email, password });
      login(token, user);
    } catch (error) {
      Alert.alert("Giriş Başarısız", "E-posta veya şifre hatalı.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { token, user } = await authService.googleLogin();
      login(token, user);
    } catch (error) {
      Alert.alert(
        "Google Giriş Başarısız",
        "Google ile giriş yapılırken bir hata oluştu."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-surface-50 to-surface-100 justify-center p-6">
      <View className="items-center mb-12">
        <View className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-3xl shadow-strong mb-6">
          <Ionicons name="briefcase" size={48} color="white" />
        </View>
        <Text className="text-5xl font-bold text-surface-900 mb-2 tracking-tight">
          Daily Mate
        </Text>
        <Text className="text-xl text-surface-600 font-medium">
          Hesabınıza giriş yapın
        </Text>
      </View>

      <View className="bg-white rounded-3xl p-8 shadow-medium border border-surface-100">
        <Input
          placeholder="E-posta adresinizi girin"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          icon="mail-outline"
        />
        <Input
          placeholder="Şifrenizi girin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoComplete="password"
          icon="lock-closed-outline"
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
        <Button
          title="Giriş Yap"
          onPress={handleLogin}
          isLoading={isLoading}
          size="large"
          icon="log-in-outline"
        />

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-surface-200"></View>
          <Text className="mx-4 text-surface-500 font-medium">veya</Text>
          <View className="flex-1 h-px bg-surface-200"></View>
        </View>

        <TouchableOpacity
          onPress={handleGoogleLogin}
          disabled={isLoading}
          className="flex-row items-center justify-center bg-white border-2 border-surface-200 p-4 rounded-2xl shadow-sm active:scale-95"
        >
          <View className="w-6 h-6 mr-3">
            <Ionicons name="logo-google" size={24} color="#DB4437" />
          </View>
          <Text className="text-surface-700 font-semibold text-base">
            Google ile Giriş Yap
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="mt-8 p-4"
      >
        <Text className="text-center text-surface-600 text-base">
          Hesabın yok mu?{" "}
          <Text className="font-bold text-primary-600">Kayıt Ol</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
