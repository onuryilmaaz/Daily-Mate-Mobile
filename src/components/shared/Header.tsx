import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../../store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="bg-blue-600 pt-16 pb-8 px-6">
      <View className="flex-row justify-between items-center">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <View className="bg-white bg-opacity-20 p-2 rounded-xl mr-3">
              <Ionicons name="briefcase" size={24} color="white" />
            </View>
            <Text className="text-white text-3xl font-bold">
              Daily Mate
            </Text>
          </View>
          <Text className="text-blue-100 text-lg font-medium">
            Hoşgeldiniz, {user?.name}
          </Text>
          <Text className="text-blue-200 text-sm mt-1">
            Çalışma takibinizi yönetin
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          className="flex-row items-center bg-white bg-opacity-20 px-4 py-3 rounded-xl"
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white ml-2 font-semibold">Çıkış</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;