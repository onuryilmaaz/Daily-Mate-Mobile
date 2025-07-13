import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { authService } from "../api/authService";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/shared/ui/Input";
import Button from "../components/shared/ui/Button";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }
    setIsLoading(true);
    try {
      await authService.register({ name, surname, email, password });
      Alert.alert(
        "Kayıt Başarılı",
        "Hesabınız oluşturuldu. Lütfen giriş yapın.",
        [{ text: "Tamam", onPress: () => navigation.navigate("Login") }]
      );
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Bir hata oluştu.";
      Alert.alert("Kayıt Başarısız", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-br from-surface-50 to-surface-100 justify-center p-6">
      <View className="items-center mb-12">
        <View className="bg-gradient-to-br from-primary-500 to-primary-600 p-6 rounded-3xl shadow-strong mb-6">
          <Ionicons name="person-add" size={48} color="white" />
        </View>
        <Text className="text-5xl font-bold text-surface-900 mb-2 tracking-tight">
          Daily Mate
        </Text>
        <Text className="text-xl text-surface-600 font-medium">
          Hesabınızı oluşturun
        </Text>
      </View>

      <View className="bg-white rounded-3xl p-8 shadow-medium border border-surface-100">
        <Input
          placeholder="Adınızı girin"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="given-name"
          icon="person-outline"
        />
        <Input
          placeholder="Soyadınızı girin"
          value={surname}
          onChangeText={setSurname}
          autoCapitalize="words"
          autoComplete="family-name"
          icon="person-outline"
        />
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
          placeholder="Güçlü bir şifre oluşturun"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoComplete="new-password"
          icon="lock-closed-outline"
          rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
          onRightIconPress={() => setShowPassword(!showPassword)}
        />
        <Button
          title="Kayıt Ol"
          onPress={handleRegister}
          isLoading={isLoading}
          size="large"
          icon="person-add-outline"
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-8 p-4"
      >
        <Text className="text-center text-surface-600 text-base">
          Zaten hesabın var mı?{" "}
          <Text className="font-bold text-primary-600">Giriş Yap</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
