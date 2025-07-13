import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { useWorkdayStore } from "../../store/useWorkdayStore";
import { calculateCompanyStats } from "../../utils/statsCalculator";
import { Ionicons } from "@expo/vector-icons";
import ChartItem from "../shared/ChartItem";

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
    <View className="mt-8 bg-white rounded-3xl shadow-medium p-6 border border-surface-100">
      <Text className="text-2xl font-bold text-surface-900 mb-6">
        İstatistikler
      </Text>

      <View className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-6 rounded-3xl mb-6 shadow-strong">
        <View className="flex-row items-center mb-2">
          <View className="bg-white/20 p-2 rounded-xl mr-3">
            <Ionicons name="wallet-outline" size={24} color="white" />
          </View>
          <Text className="text-white/90 text-base font-semibold">Toplam Kazanç</Text>
        </View>
        <Text className="text-white text-4xl font-bold tracking-tight">
          {totalEarnings.toLocaleString("tr-TR")} ₺
        </Text>
        <Text className="text-white/80 text-sm mt-1">Bu ay toplam kazancınız</Text>
      </View>

      <Text className="font-bold text-surface-700 mb-4 text-lg">
        Firmalar Bazında Detay
      </Text>
      <FlatList
        data={companyStats}
        renderItem={({ item }) => <ChartItem item={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View className="items-center py-8">
            <View className="bg-surface-50 p-4 rounded-2xl mb-4">
              <Ionicons name="bar-chart-outline" size={32} color="#9aa8b6" />
            </View>
            <Text className="text-center text-surface-500 font-medium">
              Gösterilecek veri bulunamadı.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Statistics;