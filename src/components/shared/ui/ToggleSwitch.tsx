import React from "react";
import { TouchableOpacity, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ToggleSwitchProps {
  isActive: boolean;
  onToggle: () => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onColor?: string;
  offColor?: string;
  thumbColor?: string;
}

const ToggleSwitch = ({
  isActive,
  onToggle,
  size = "medium",
  disabled = false,
  onColor = "#22c55e", // default yeşil
  offColor = "#ef4444", // default kırmızı
  thumbColor = "#fff", // default beyaz
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
      className={`${getSizeClasses()} rounded-full p-0.5 transition-all duration-300`}
      style={{
        backgroundColor: isActive ? onColor : offColor,
        opacity: disabled ? 0.5 : 1,
      }}
      activeOpacity={0.8}
    >
      <View
        className={`${getThumbSize()} rounded-full shadow-medium items-center justify-center`}
        style={{
          backgroundColor: thumbColor,
          marginLeft: isActive ? "auto" : 0,
        }}
      >
        {isActive && (
          <Ionicons
            name="checkmark"
            size={size === "small" ? 10 : size === "large" ? 16 : 14}
            color={onColor}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ToggleSwitch;
