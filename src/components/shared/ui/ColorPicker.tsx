import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  title?: string;
}

const ColorPicker = ({
  selectedColor,
  onColorSelect,
  title,
}: ColorPickerProps) => {
  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#06B6D4", // Cyan
    "#84CC16", // Lime
    "#F97316", // Orange
    "#6366F1", // Indigo
    "#14B8A6", // Teal
    "#F43F5E", // Rose
  ];

  return (
    <View className="mb-4">
      {title && (
        <Text className="text-gray-700 font-medium mb-3 text-sm">{title}</Text>
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        <View className="flex-row space-x-3">
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              onPress={() => onColorSelect(color)}
              className={`w-12 h-12 rounded-full border-2 items-center justify-center ${
                selectedColor === color ? "border-gray-800" : "border-gray-300"
              }`}
              style={{ backgroundColor: color }}
              activeOpacity={0.8}
            >
              {selectedColor === color && (
                <Ionicons name="checkmark" size={20} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ColorPicker;
