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
    <View className="bg-white rounded-xl mb-4 border border-gray-200 overflow-hidden">
      <View className="h-1 w-full" />
      <View className="p-6">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View
                style={{ backgroundColor: workplace.color }}
                className="w-4 h-4 rounded-full mr-3"
              />
              <Text className="text-xl font-bold text-gray-800 mr-3">
                {workplace.name}
              </Text>
              <Badge
                text={workplace.isActive ? "Aktif" : "Pasif"}
                variant={workplace.isActive ? "success" : "default"}
                size="small"
              />
            </View>
            <View className="flex-row items-center">
              <View className="bg-gray-100 p-2 rounded-lg mr-2">
                <Ionicons name="cash-outline" size={16} color="#2563eb" />
              </View>
              <Text className="text-gray-700 font-semibold">
                {workplace.dailyWage.toLocaleString("tr-TR")} ₺
              </Text>
              <Text className="text-gray-500 ml-1">/ günlük</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={onEdit}
            className="bg-blue-50 px-4 py-3 rounded-lg border border-blue-200 flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color="#2563eb" />
            <Text className="text-blue-600 font-semibold ml-2 text-sm">
              Düzenle
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onDelete}
            className="bg-red-50 px-4 py-3 rounded-lg border border-red-200 flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={16} color="#ef4444" />
            <Text className="text-red-600 font-semibold ml-2 text-sm">Sil</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            <Text className="text-xs text-green-500 font-medium mr-2">
              Durum
            </Text>
            <ToggleSwitch
              isActive={workplace.isActive}
              onToggle={onToggle}
              size="medium"
              onColor="#22c55e"
              offColor="#ef4444"
              thumbColor="#fff"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkplaceCard;
