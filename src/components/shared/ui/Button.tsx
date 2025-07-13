import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  size?: "small" | "medium" | "large";
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
}

const Button = ({
  onPress,
  title,
  isLoading = false,
  variant = "primary",
  size = "medium",
  icon,
  disabled = false,
}: ButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-600";
      case "secondary":
        return "bg-gray-500";
      case "outline":
        return "bg-transparent border-2 border-blue-600";
      case "danger":
        return "bg-red-600";
      case "success":
        return "bg-green-600";
      default:
        return "bg-blue-600";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-4 py-3";
      case "large":
        return "px-8 py-5";
      default:
        return "px-6 py-4";
    }
  };

  const getTextSize = () => {
    switch (size) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "outline":
        return "text-blue-600";
      default:
        return "text-white";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      className={`rounded-xl items-center justify-center ${getVariantClasses()} ${getSizeClasses()} ${
        disabled ? "opacity-50" : ""
      }`}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        {isLoading ? (
          <ActivityIndicator color={variant === "outline" ? "#2563eb" : "white"} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={size === "small" ? 16 : size === "large" ? 20 : 18} 
                color={variant === "outline" ? "#2563eb" : "white"} 
                style={{ marginRight: 8 }}
              />
            )}
            <Text className={`font-bold ${getTextSize()} ${getTextColor()}`}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;