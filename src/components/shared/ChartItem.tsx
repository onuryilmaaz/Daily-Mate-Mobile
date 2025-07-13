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
    <View className="flex-row items-center mb-4">
      <View
        style={{ backgroundColor: item.color }}
        className="w-3 h-3 rounded-full mr-3"
      />
      <View className="flex-1">
        {/* HATA BURADAYDI: div -> View olarak değiştirildi */}
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-700 font-semibold">{item.name}</Text>
          <Text className="text-gray-800 font-bold">
            {item.totalEarning.toLocaleString("tr-TR")} ₺
          </Text>
        </View>
        {/* HATA BURADAYDI: div -> View olarak değiştirildi */}
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-gray-500 text-xs">{item.dayCount} gün</Text>
          <Text className="text-teal-600 text-xs font-semibold">
            {item.percentage}% pay
          </Text>
        </View>
        <View className="w-full bg-gray-200 rounded-full h-1 mt-1">
          <View
            style={{
              width: `${item.percentage}%`,
              backgroundColor: item.color,
            }}
            className="h-1 rounded-full"
          />
        </View>
      </View>
    </View>
  );
};

export default ChartItem;
