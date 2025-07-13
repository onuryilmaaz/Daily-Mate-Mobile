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

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center p-6">
      <View className="items-center mb-10">
        <Ionicons name="briefcase" size={64} color="#14b8a6" />
        <Text className="text-4xl font-bold text-teal-600 mt-2">
          Daily Mate
        </Text>
        <Text className="text-lg text-gray-500">Hesabınıza giriş yapın</Text>
      </View>
      <Input
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="mt-2" />
      <Button title="Giriş Yap" onPress={handleLogin} isLoading={isLoading} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="mt-6"
      >
        <Text className="text-center text-teal-600">
          Hesabın yok mu? <Text className="font-bold">Kayıt Ol</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
