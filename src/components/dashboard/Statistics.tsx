import React, { useMemo } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { useWorkdayStore } from "../../store/useWorkdayStore";
import { calculateCompanyStats } from "../../utils/statsCalculator";
import { Ionicons } from "@expo/vector-icons";
import ChartItem from "../shared/ChartItem";
import Header from "../shared/Header";
import EmptyState from "../shared/ui/EmptyState";

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Header />
      <View className="flex-1 mt-8 bg-white rounded-t-3xl shadow-medium p-6 border border-surface-100">
        <Text className="text-2xl font-bold text-surface-900 mb-6">
          İstatistikler
        </Text>

        <View className="bg-purple-600 p-6 rounded-3xl mb-6 shadow-strong">
          <View className="flex-row items-center mb-2">
            <View className="bg-white/20 p-2 rounded-xl mr-3">
              <Ionicons name="wallet-outline" size={24} color="white" />
            </View>
            <Text className="text-white/90 text-base font-semibold">
              Toplam Kazanç
            </Text>
          </View>
          <Text className="text-white text-4xl font-bold tracking-tight">
            {totalEarnings.toLocaleString("tr-TR")} ₺
          </Text>
          <Text className="text-white/80 text-sm mt-1">
            Bu ay toplam kazancınız
          </Text>
        </View>

        <Text className="font-bold text-surface-700 mb-4 text-lg">
          Firmalar Bazında Detay
        </Text>
        <View className="flex-1">
          <FlatList
            data={companyStats}
            renderItem={({ item }) => (
              <View style={{ height: 140, marginBottom: 12 }}>
                <ChartItem item={item} />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={
              <EmptyState
                icon="bar-chart-outline"
                title="Gösterilecek veri bulunamadı."
                description="Gösterilecek veri bulunamadı. Lütfen iş günü ekleyin."
              />
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Statistics;
