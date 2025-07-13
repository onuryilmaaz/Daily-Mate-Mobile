import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) => {
  return (
    <View className="items-center py-16 px-6">
      <View className="bg-gray-100 p-6 rounded-full mb-6">
        <Ionicons name={icon} size={48} color="#9ca3af" />
      </View>

      <Text className="text-gray-700 text-xl font-semibold text-center mb-2">
        {title}
      </Text>

      <Text className="text-gray-500 text-base text-center leading-6">
        {description}
      </Text>

      {actionText && onAction && (
        <View className="mt-6">
          <Text className="text-blue-600 font-medium text-center">
            {actionText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default EmptyState;
