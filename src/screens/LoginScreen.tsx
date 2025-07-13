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
    <SafeAreaView className="flex-1 bg-gradient-to-br from-surface-50 to-surface-100 justify-center p-6">
      <View className="items-center mb-12">
        <View className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-3xl shadow-strong mb-6">
          <Ionicons name="briefcase" size={48} color="white" />
        </View>
        <Text className="text-5xl font-bold text-surface-900 mb-2 tracking-tight">
          Daily Mate
        </Text>
        <Text className="text-xl text-surface-600 font-medium">Hesabınıza giriş yapın</Text>
      </View>
      
      <View className="bg-white rounded-3xl p-8 shadow-medium border border-surface-100">
        <Input
          placeholder="E-posta adresiniz"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          icon="mail-outline"
        />
        <Input
          placeholder="Şifreniz"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          icon="lock-closed-outline"
        />
        <Button 
          title="Giriş Yap" 
          onPress={handleLogin} 
          isLoading={isLoading}
          size="large"
          icon="log-in-outline"
        />
      </View>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        className="mt-8 p-4"
      >
        <Text className="text-center text-surface-600 text-base">
          Hesabın yok mu? <Text className="font-bold text-primary-600">Kayıt Ol</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;