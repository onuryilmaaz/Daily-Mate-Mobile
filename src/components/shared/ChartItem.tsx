import React from "react";
import { View, Text } from "react-native";

interface ChartItemProps {
  item: {
    name: string;
    color: string;
    totalEarning: number;
    dayCount: number;
    percentage: number;
  };
}

const ChartItem = ({ item }: ChartItemProps) => {
  return (
    <View
      style={{ height: 120 }} // Örneğin 120, dene ve uygun yüksekliği bul
      className="bg-white rounded-xl mb-4 border border-gray-200 overflow-hidden"
    >
      <View className="bg-white rounded-xl mb-4 border border-gray-200 overflow-hidden">
        <View className="mb-6 p-4 bg-surface-50 rounded-2xl border border-surface-100 overflow-hidden">
          <View className="flex-row items-center mb-3">
            <View
              style={{ backgroundColor: item.color }}
              className="w-4 h-4 rounded-full mr-3 shadow-sm"
            />
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="text-surface-800 font-bold text-lg">
                  {item.name}
                </Text>
                <Text className="text-surface-900 font-bold text-lg">
                  {item.totalEarning.toLocaleString("tr-TR")} ₺
                </Text>
              </View>
              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-surface-500 text-sm font-medium">
                  {item.dayCount} gün çalışıldı
                </Text>
                <Text className="text-primary-600 text-sm font-bold">
                  {item.percentage}% pay
                </Text>
              </View>
            </View>
          </View>

          <View className="w-full bg-surface-200 rounded-full h-2">
            <View
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color,
              }}
              className="h-2 rounded-full shadow-sm"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChartItem;
