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
        return "border-2 border-surface-200 bg-transparent";
      case "filled":
        return "bg-surface-50 border-0";
      default:
        return "border border-surface-200 bg-white";
    }
  };

  return (
    <View className="mb-5">
      {label && (
        <Text className="text-surface-700 font-semibold mb-3 text-base">{label}</Text>
      )}

      <View
        className={`flex-row items-center rounded-2xl px-4 py-4 ${getVariantClasses()} ${
          error ? "border-error-500" : ""
        }`}
      >
        {icon && (
          <View className="bg-surface-50 p-2 rounded-xl mr-3">
            <Ionicons
              name={icon}
              size={20}
              color={error ? "#ef4444" : "#7c6df2"}
            />
          </View>
        )}

        <TextInput
          className={`flex-1 text-surface-900 text-base font-medium ${props.multiline ? "min-h-[80px]" : ""}`}
          placeholderTextColor="#9aa8b6"
          {...props}
        />
      </View>

      {error && (
        <Text className="text-error-500 text-sm mt-2 ml-2 font-medium">{error}</Text>
      )}
    </View>
  );
};

export default Input;