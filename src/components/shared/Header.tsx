import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="bg-gradient-to-r from-blue-600 to-blue-700 pt-12 pb-6 px-6 shadow-xl">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <Text className="text-white text-3xl font-bold mb-1">Daily Mate</Text>
          <Text className="text-blue-100 text-base">
            Hoşgeldiniz, {user?.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/30"
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={18} color="white" />
          <Text className="text-white ml-2 font-semibold text-sm">Çıkış</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
