import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Workplace {
  _id: string;
  name: string;
  color?: string;
  dailyWage?: number;
}

interface WorkdayModalProps {
  visible: boolean;
  workplaces: Workplace[];
  selectedWorkplaceId?: string;
  onSelect: (workplaceId: string) => void;
  onConfirm: () => void;
  onDelete?: () => void;
  onClose: () => void;
  showDelete?: boolean;
  dateLabel: string;
}

const WorkdayModal = ({
  visible,
  workplaces,
  selectedWorkplaceId,
  onSelect,
  onConfirm,
  onDelete,
  onClose,
  showDelete = false,
  dateLabel,
}: WorkdayModalProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedWorkplace = workplaces.find(
    (wp) => wp._id === selectedWorkplaceId
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6">
          <Text className="text-lg font-bold text-center mb-2">
            {dateLabel}
          </Text>
          <Text className="text-base text-center mb-4 text-gray-700">
            O gün hangi iş yerinde çalıştınız?
          </Text>

          {/* Dropdown */}
          <TouchableOpacity
            className="border border-gray-300 rounded-xl px-4 py-3 flex-row items-center justify-between mb-4"
            onPress={() => setDropdownOpen((v) => !v)}
            activeOpacity={0.8}
          >
            <Text
              className={`text-base ${selectedWorkplace ? "text-gray-900" : "text-gray-400"}`}
            >
              {selectedWorkplace ? selectedWorkplace.name : "İş yeri seçiniz"}
            </Text>
            <Ionicons
              name={dropdownOpen ? "chevron-up" : "chevron-down"}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
          {dropdownOpen && (
            <ScrollView className="max-h-48 mb-4 bg-gray-50 rounded-xl border border-gray-200">
              {workplaces.map((wp) => (
                <TouchableOpacity
                  key={wp._id}
                  className={`flex-row items-center px-4 py-3 ${selectedWorkplaceId === wp._id ? "bg-blue-50" : ""}`}
                  onPress={() => {
                    onSelect(wp._id);
                    setDropdownOpen(false);
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: wp.color || "#3B82F6" }}
                  />
                  <Text className="text-base text-gray-900 flex-1">
                    {wp.name}
                  </Text>
                  {typeof wp.dailyWage === "number" && (
                    <Text className="text-xs text-gray-500 ml-2">
                      Günlük: {wp.dailyWage.toLocaleString()} ₺
                    </Text>
                  )}
                  {selectedWorkplaceId === wp._id && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#2563eb"
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {/* Actions */}
          <View className="flex-row justify-between mt-2">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-gray-200 mr-2 items-center"
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text className="text-gray-700 font-semibold">İptal</Text>
            </TouchableOpacity>
            {showDelete && (
              <TouchableOpacity
                className="flex-1 py-3 rounded-xl bg-red-500 mx-2 items-center"
                onPress={onDelete}
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold">Sil</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl bg-blue-600 ml-2 items-center"
              onPress={onConfirm}
              activeOpacity={0.8}
              disabled={!selectedWorkplaceId}
              style={{ opacity: selectedWorkplaceId ? 1 : 0.5 }}
            >
              <Text className="text-white font-semibold">Onayla</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default WorkdayModal;
