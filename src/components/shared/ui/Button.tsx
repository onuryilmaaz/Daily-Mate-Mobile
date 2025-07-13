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
        return "bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25";
      case "secondary":
        return "bg-surface-500 shadow-lg shadow-surface-500/25";
      case "outline":
        return "bg-transparent border-2 border-primary-500";
      case "danger":
        return "bg-gradient-to-r from-error-500 to-error-600 shadow-lg shadow-error-500/25";
      case "success":
        return "bg-gradient-to-r from-success-500 to-success-600 shadow-lg shadow-success-500/25";
      default:
        return "bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-4 py-2.5";
      case "large":
        return "px-8 py-4";
      default:
        return "px-6 py-3.5";
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
        return "text-primary-600";
      default:
        return "text-white";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isLoading || disabled}
      className={`rounded-2xl items-center justify-center ${getVariantClasses()} ${getSizeClasses()} ${
        disabled ? "opacity-50" : ""
      }`}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center">
        {isLoading ? (
          <ActivityIndicator color={variant === "outline" ? "#7c6df2" : "white"} />
        ) : (
          <>
            {icon && (
              <Ionicons 
                name={icon} 
                size={size === "small" ? 16 : size === "large" ? 20 : 18} 
                color={variant === "outline" ? "#7c6df2" : "white"} 
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