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
    <View className="bg-white rounded-3xl mb-4 shadow-medium border border-surface-100 overflow-hidden">
      {/* Header with gradient accent */}
      <View 
        style={{ 
          background: workplace.isActive 
            ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' 
            : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        }}
        className="h-1 w-full"
      />
      <View className="p-6">
        <View className="flex-row justify-between items-start mb-4">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <View 
                style={{ backgroundColor: workplace.color }}
                className="w-4 h-4 rounded-full mr-3"
              />
              <Text className="text-xl font-bold text-surface-900 mr-3">
                {workplace.name}
              </Text>
              <Badge
                text={workplace.isActive ? "Aktif" : "Pasif"}
                variant={workplace.isActive ? "success" : "default"}
                size="small"
              />
            </View>
            <View className="flex-row items-center">
              <View className="bg-surface-50 p-2 rounded-xl mr-2">
                <Ionicons name="cash-outline" size={16} color="#7c6df2" />
              </View>
              <Text className="text-surface-700 font-semibold">
                {workplace.dailyWage.toLocaleString("tr-TR")} ₺
              </Text>
              <Text className="text-surface-500 ml-1">/ günlük</Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-xs text-surface-500 mb-2 font-medium">Durum</Text>
            <ToggleSwitch
              isActive={workplace.isActive}
              onToggle={onToggle}
              size="medium"
            />
          </View>
        </View>
        
        <View className="flex-row justify-end space-x-3 mt-4 pt-4 border-t border-surface-100">
          <TouchableOpacity
            onPress={onEdit}
            className="bg-primary-50 px-4 py-3 rounded-2xl border border-primary-100 flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="pencil" size={16} color="#7c6df2" />
            <Text className="text-primary-600 font-semibold ml-2 text-sm">Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onDelete}
            className="bg-error-50 px-4 py-3 rounded-2xl border border-error-100 flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="trash" size={16} color="#ef4444" />
            <Text className="text-error-600 font-semibold ml-2 text-sm">Sil</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WorkplaceCard;