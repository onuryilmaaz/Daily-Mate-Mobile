import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  return (
    <View className="flex-1 mx-2 bg-white rounded-2xl p-4 shadow-soft border border-gray-200">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-800 text-base font-semibold">{title}</Text>
        <View className="bg-blue-100 p-2 rounded-xl">
          <Ionicons name={icon} size={20} color="#2563eb" />
        </View>
      </View>
      <Text className="text-2xl font-extrabold text-gray-900">{value}</Text>
    </View>
  );
};

export default StatCard;
