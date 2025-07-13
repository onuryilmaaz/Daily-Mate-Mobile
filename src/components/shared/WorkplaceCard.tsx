import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Workplace } from "../../types";
import ToggleSwitch from "./ui/ToggleSwitch";
import Badge from "./ui/Badge";
import { Ionicons } from "@expo/vector-icons";

interface WorkplaceCardProps {
  workplace: Workplace;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}

const WorkplaceCard = ({
  workplace,
  onEdit,
  onDelete,
  onToggle,
}: WorkplaceCardProps) => {
  return (
    <View className="bg-white rounded-2xl mb-4 shadow-soft border border-gray-200 overflow-hidden">
      {/* Header with color accent */}
      <View
        style={{ backgroundColor: workplace.isActive ? "#22c55e" : "#ef4444" }}
        className="h-2 w-full"
      />
      <View className="p-5">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-1">
            <View className="flex-row items-center mb-1">
              <Text className="text-lg font-bold text-gray-900 mr-2">
                {workplace.name}
              </Text>
              <Badge
                text={workplace.isActive ? "Aktif" : "Pasif"}
                variant={workplace.isActive ? "success" : "default"}
                size="small"
              />
            </View>
            <View className="flex-row items-center">
              <Ionicons name="cash-outline" size={16} color="#64748b" />
              <Text className="text-gray-700 ml-1 font-medium">
                {workplace.dailyWage.toLocaleString("tr-TR")} ₺ / günlük
              </Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-xs text-gray-500 mb-1">Durum</Text>
            <ToggleSwitch
              isActive={workplace.isActive}
              onToggle={onToggle}
              size="medium"
            />
          </View>
        </View>
        <View className="flex-row justify-end space-x-2 mt-2">
          <TouchableOpacity
            onPress={onEdit}
            className="bg-blue-50 p-3 rounded-xl border border-blue-200"
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={18} color="#2563eb" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            className="bg-red-50 p-3 rounded-xl border border-red-200"
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={18} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkplaceCard;
