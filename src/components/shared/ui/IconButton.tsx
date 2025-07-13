import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps extends TouchableOpacityProps {
  iconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

const IconButton = ({
  iconName,
  size = 20,
  color = "white",
  ...props
}: IconButtonProps) => {
  return (
    <TouchableOpacity className="p-2" {...props}>
      <Ionicons name={iconName} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;
