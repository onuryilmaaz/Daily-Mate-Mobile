import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import Header from "../components/shared/Header";
import { useWorkplaceStore } from "../store/useWorkplaceStore";
import { useWorkdayStore } from "../store/useWorkdayStore";
import StatCard from "../components/dashboard/StatCard";
import MainCalendar from "../components/dashboard/MainCalendar";
import Statistics from "../components/dashboard/Statistics";
import WorkplaceCard from "../components/shared/WorkplaceCard";
import { useNavigation } from "@react-navigation/native";
import { MainStackNavigationProp } from "../navigation/MainStack";
import { Ionicons } from "@expo/vector-icons";
import LoadingSpinner from "../components/shared/ui/LoadingSpinner";
import EmptyState from "../components/shared/ui/EmptyState";
import { useToast } from "../components/shared/ui/ToastProvider";

const WorkplaceListHeader = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  return (
    <View className="flex-row justify-between items-center mb-6 mt-6">
      <View>
        <Text className="text-2xl font-bold text-gray-800">İş Yerleri</Text>
        <Text className="text-gray-600 text-base mt-1 font-medium">
          İş yerlerinizi yönetin ve takip edin
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("WorkplaceForm", {})}
        className="bg-blue-600 flex-row items-center px-5 py-4 rounded-xl"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text className="text-white font-bold ml-2">Yeni Ekle</Text>
      </TouchableOpacity>
    </View>
  );
};

const DashboardScreen = () => {
  const {
    workplaces,
    fetchWorkplaces,
    deleteWorkplace,
    toggleWorkplace,
    isLoading: workplacesLoading,
  } = useWorkplaceStore();
  const {
    workdays,
    fetchWorkdays,
    isLoading: workdaysLoading,
  } = useWorkdayStore();
  const navigation = useNavigation<MainStackNavigationProp>();
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("DashboardScreen: Veriler yükleniyor...");
        await Promise.all([fetchWorkplaces(), fetchWorkdays()]);
        console.log("DashboardScreen: Veriler başarıyla yüklendi");
      } catch (err) {
        console.error("DashboardScreen: Veri yükleme hatası:", err);
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      }
    };

    loadData();
  }, [fetchWorkplaces, fetchWorkdays]);

  useEffect(() => {
    console.log("Workplaces güncellendi:", workplaces.length);
    console.log("Workdays güncellendi:", workdays.length);
  }, [workplaces.length, workdays.length]);

  const handleDelete = async (id: string, name: string) => {
    Alert.alert(
      "İş Yeri Sil",
      `${name} iş yerini silmek istediğinizden emin misiniz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteWorkplace(id);
              showToast("İş yeri başarıyla silindi.", "success");
            } catch (err) {
              showToast("İş yeri silinirken bir hata oluştu.", "error");
            }
          },
        },
      ]
    );
  };

  const handleToggle = async (
    id: string,
    name: string,
    currentStatus: boolean
  ) => {
    try {
      await toggleWorkplace(id);
      showToast(`${name} iş yerinin durumu başarıyla değiştirildi.`, "success");
    } catch (error) {
      showToast(`${name} iş yerinin durumu değiştirilemedi.`, "error");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([fetchWorkplaces(), fetchWorkdays()]);
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    return (
      <>
        <Header />
        <View className="flex-1 justify-center items-center p-6">
          <View className="bg-red-50 p-4 rounded-xl mb-4">
            <Ionicons name="alert-circle" size={32} color="#ef4444" />
          </View>
          <Text className="text-red-600 text-xl font-bold mb-2">
            Hata Oluştu
          </Text>
          <Text className="text-gray-700 text-center font-medium">{error}</Text>
        </View>
      </>
    );
  }

  const ListHeader = () => (
    <View className="px-6 pt-6 pb-0">
      <View className="flex-row justify-between">
        <StatCard
          title="Bu Ay Toplam Kazanç"
          value={`${workdays.reduce(
            (total, day) => total + day.wageOnThatDay,
            0
          )}`}
          icon="cash-outline"
          trend={{ value: "+12%", isPositive: true }}
        />
        <StatCard
          title="Çalışılan Gün Sayısı"
          value={`${workdays.length}`}
          icon="calendar-outline"
          trend={{ value: "+3", isPositive: true }}
        />
      </View>
      <View className="mb-6">
        <MainCalendar />
      </View>
    </View>
  );

  return (
    <>
      <Header />
      {(workplacesLoading || workdaysLoading) && (
        <LoadingSpinner text="Veriler yükleniyor..." fullScreen={true} />
      )}
      <FlatList
        data={workplaces}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <View className="px-6"></View>}
        ListHeaderComponent={<ListHeader />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </>
  );
};

export default DashboardScreen;
