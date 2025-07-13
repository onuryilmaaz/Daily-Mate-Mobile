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
    <View className="flex-1 mx-2 bg-white rounded-3xl p-6 shadow-medium border border-surface-100">
      <View className="flex-row justify-between items-start mb-4">
        <View className="bg-primary-50 p-3 rounded-2xl">
          <Ionicons name={icon} size={24} color="#7c6df2" />
        </View>
        {trend && (
          <View className={`flex-row items-center px-2 py-1 rounded-full ${
            trend.isPositive ? 'bg-success-50' : 'bg-error-50'
          }`}>
            <Ionicons 
              name={trend.isPositive ? "trending-up" : "trending-down"} 
              size={12} 
              color={trend.isPositive ? "#22c55e" : "#ef4444"} 
            />
            <Text className={`text-xs font-semibold ml-1 ${
              trend.isPositive ? 'text-success-600' : 'text-error-600'
            }`}>
              {trend.value}
            </Text>
          </View>
        )}
      </View>
      <Text className="text-surface-600 text-sm font-medium mb-1">{title}</Text>
      <Text className="text-surface-900 text-2xl font-bold tracking-tight">{value}</Text>
    </View>
  );
};

export default StatCard;