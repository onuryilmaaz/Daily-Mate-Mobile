import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { authService } from "../api/authService";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !surname || !email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }
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
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 justify-center p-6">
      <View className="items-center mb-10">
        <Ionicons name="person-add" size={64} color="#14b8a6" />
        <Text className="text-4xl font-bold text-teal-600 mt-2">
          Hesap Oluştur
        </Text>
      </View>
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-4 border border-gray-200"
        placeholder="Ad"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-4 border border-gray-200"
        placeholder="Soyad"
        value={surname}
        onChangeText={setSurname}
      />
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-4 border border-gray-200"
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-6 border border-gray-200"
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-teal-500 p-4 rounded-lg items-center"
      >
        <Text className="text-white text-lg font-bold">Kayıt Ol</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-6"
      >
        <Text className="text-center text-teal-600">
          Zaten bir hesabın var mı? <Text className="font-bold">Giriş Yap</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
