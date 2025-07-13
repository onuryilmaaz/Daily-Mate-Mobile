import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

interface LoadingSpinnerProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner = ({
  size = "large",
  color = "#3b82f6",
  text,
  fullScreen = false,
}: LoadingSpinnerProps) => {
  const containerClasses = fullScreen
    ? "flex-1 justify-center items-center bg-gray-50"
    : "justify-center items-center py-8";

  return (
    <View className={containerClasses}>
      <View className="items-center">
        <ActivityIndicator size={size} color={color} />
        {text && (
          <Text className="text-gray-600 mt-4 text-center font-medium">
            {text}
          </Text>
        )}
      </View>
    </View>
  );
};

export default LoadingSpinner;
