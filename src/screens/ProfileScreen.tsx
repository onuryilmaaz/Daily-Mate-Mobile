import React from "react";
import { View, Text } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import Button from "../components/shared/ui/Button";

const ProfileScreen = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="flex-1 justify-center items-center bg-gray-50 px-6">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Profil</Text>
      <Text className="text-lg text-gray-700 mb-8">{user?.name}</Text>
      <Button
        title="Çıkış Yap"
        onPress={logout}
        variant="danger"
        size="large"
        icon="log-out-outline"
      />
    </View>
  );
};

export default ProfileScreen;
