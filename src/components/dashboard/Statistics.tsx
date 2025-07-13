import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { useWorkdayStore } from "../../store/useWorkdayStore";
import { calculateCompanyStats } from "../../utils/statsCalculator";
import { Ionicons } from "@expo/vector-icons";
import ChartItem from "../shared/ChartItem"; // ChartItem bileşenini kullanıyoruz

const Statistics = () => {
  const { workdays } = useWorkdayStore();
  const companyStats = useMemo(
    () => calculateCompanyStats(workdays),
    [workdays]
  );
  const totalEarnings = companyStats.reduce(
    (sum, company) => sum + company.totalEarning,
    0
  );

  return (
    <View className="mt-6 bg-white rounded-xl shadow-sm p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">
        İstatistikler
      </Text>

      <View className="bg-gradient-to-r from-teal-400 to-emerald-500 p-4 rounded-lg mb-4 shadow-md">
        <Text className="text-white text-sm">Toplam Kazanç</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-3xl font-bold">
            {totalEarnings.toLocaleString("tr-TR")} ₺
          </Text>
          <Ionicons name="wallet-outline" size={32} color="white" />
        </View>
      </View>

      <Text className="font-bold text-gray-600 mb-2">
        Firmalar Bazında Detay
      </Text>
      <FlatList
        data={companyStats}
        renderItem={({ item }) => <ChartItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 py-4">
            Gösterilecek veri bulunamadı.
          </Text>
        }
      />
    </View>
  );
};

export default Statistics;
