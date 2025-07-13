import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  variant?: "default" | "outlined" | "filled";
}

const Input = ({
  label,
  error,
  icon,
  variant = "default",
  ...props
}: InputProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border-2 border-gray-300 bg-transparent";
      case "filled":
        return "bg-gray-100 border-0";
      default:
        return "border border-gray-300 bg-white";
    }
  };

  const getFocusClasses = () => {
    switch (variant) {
      case "outlined":
        return "border-blue-500";
      case "filled":
        return "bg-gray-200";
      default:
        return "border-blue-500 bg-white";
    }
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-sm">{label}</Text>
      )}

      <View
        className={`flex-row items-center rounded-xl px-4 py-3 ${getVariantClasses()} ${
          error ? "border-red-500" : ""
        }`}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={error ? "#ef4444" : "#6b7280"}
            style={{ marginRight: 12 }}
          />
        )}

        <TextInput
          className={`flex-1 text-gray-900 text-base ${props.multiline ? "min-h-[80px]" : ""}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>

      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};

export default Input;
