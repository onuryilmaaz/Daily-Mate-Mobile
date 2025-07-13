import React from "react";
import { View, Text } from "react-native";

interface BadgeProps {
  text: string;
  variant?: "success" | "warning" | "error" | "info" | "default";
  size?: "small" | "medium" | "large";
}

const Badge = ({ text, variant = "default", size = "medium" }: BadgeProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "warning":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-2 py-1 text-xs";
      case "large":
        return "px-4 py-2 text-base";
      default:
        return "px-3 py-1.5 text-sm";
    }
  };

  return (
    <View
      className={`rounded-full border ${getVariantClasses()} ${getSizeClasses()} items-center justify-center`}
    >
      <Text className={`font-medium ${getVariantClasses().split(" ")[1]}`}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
