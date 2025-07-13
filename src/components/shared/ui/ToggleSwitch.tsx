import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const ToggleSwitch = ({
  isActive,
  onToggle,
  size = "medium",
  disabled = false,
}: ToggleSwitchProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-10 h-6";
      case "large":
        return "w-16 h-9";
      default:
        return "w-14 h-8";
    }
  };

  const getThumbSize = () => {
    switch (size) {
      case "small":
        return "w-5 h-5";
      case "large":
        return "w-8 h-8";
      default:
        return "w-7 h-7";
    }
  };

  return (
    <TouchableOpacity
      onPress={onToggle}
      disabled={disabled}
      className={`${getSizeClasses()} rounded-full p-0.5 transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-success-500 to-success-600 shadow-lg shadow-success-500/30"
          : "bg-surface-300"
      } ${disabled ? "opacity-50" : ""}`}
      activeOpacity={0.8}
    >
      <View
        className={`${getThumbSize()} rounded-full bg-white shadow-medium items-center justify-center ${
          isActive ? "ml-auto" : "ml-0"
        } transition-all duration-300`}
      >
        {isActive && (
          <Ionicons
            name="checkmark"
            size={size === "small" ? 10 : size === "large" ? 16 : 14}
            color="#22c55e"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;