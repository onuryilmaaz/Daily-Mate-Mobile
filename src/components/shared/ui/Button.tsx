import React from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ButtonProps {
  onPress: () => void;
  title: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "danger";
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
        return "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25";
      case "secondary":
        return "bg-gray-500 shadow-lg shadow-gray-500/25";
      case "outline":
        return "bg-transparent border-2 border-blue-500";
      case "danger":
        return "bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/25";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-4 py-2";
      case "large":
        return "px-6 py-4";
      default:
        return "px-5 py-3";
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
        return "text-blue-500";
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
          <ActivityIndicator color={variant === "outline" ? "#3b82f6" : "white"} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={size === "small" ? 16 : size === "large" ? 20 : 18} 
                color={variant === "outline" ? "#3b82f6" : "white"} 
                style={{ marginRight: 8 }}
              />
            )}
            <Text className={`font-semibold ${getTextSize()} ${getTextColor()}`}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
