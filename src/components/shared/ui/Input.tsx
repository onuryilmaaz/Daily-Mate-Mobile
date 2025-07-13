import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps extends TextInputProps {
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  style?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  icon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  return (
    <View className="relative mb-4">
      <View className="flex-row items-center bg-surface-50 border border-surface-200 rounded-2xl px-4 min-h-[56px] focus-within:border-primary-500 focus-within:bg-white">
        {icon && (
          <View className="mr-3">
            <Ionicons name={icon as any} size={20} color="#6B7280" />
          </View>
        )}
        <TextInput
          className="flex-1 text-surface-900 text-base font-medium"
          placeholderTextColor="#9CA3AF"
          textAlignVertical="center"
          style={[
            {
              height: 56,
              lineHeight: 20,
              textAlignVertical: "center",
              paddingTop: 0,
              paddingBottom: 0,
            },
            style,
          ]}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            className="p-2 ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name={rightIcon as any} size={20} color="#6B7280" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
