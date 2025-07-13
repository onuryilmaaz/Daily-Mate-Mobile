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
        return "bg-success-100 text-success-700 border-success-200";
      case "warning":
        return "bg-warning-100 text-warning-700 border-warning-200";
      case "error":
        return "bg-error-100 text-error-700 border-error-200";
      case "info":
        return "bg-primary-100 text-primary-700 border-primary-200";
      default:
        return "bg-surface-100 text-surface-700 border-surface-200";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-2.5 py-1 text-xs";
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
      <Text className={`font-bold ${getVariantClasses().split(" ")[1]}`}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;