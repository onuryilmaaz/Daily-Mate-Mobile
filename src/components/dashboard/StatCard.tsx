import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  return (
    <View className="flex-1 mx-2 bg-white rounded-xl p-6 border border-gray-200">
      <View className="flex-row justify-between items-start mb-4">
        <View className="bg-blue-50 p-3 rounded-xl">
          <Ionicons name={icon} size={24} color="#2563eb" />
        </View>
        {trend && (
          <View className={`flex-row items-center px-2 py-1 rounded-full ${
            trend.isPositive ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <Ionicons 
              name={trend.isPositive ? "trending-up" : "trending-down"} 
              size={12} 
              color={trend.isPositive ? "#22c55e" : "#ef4444"} 
            />
            <Text className={`text-xs font-semibold ml-1 ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-gray-600 text-sm font-medium mb-1">{title}</Text>
      <Text className="text-gray-800 text-2xl font-bold">{value}</Text>
    </View>
  );
};

export default StatCard;