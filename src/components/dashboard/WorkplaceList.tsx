import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useWorkplaceStore } from "../../store/useWorkplaceStore";
import { useNavigation } from "@react-navigation/native";
import WorkplaceCard from "../shared/WorkplaceCard";
import { Ionicons } from "@expo/vector-icons";
import { MainStackNavigationProp } from "../../navigation/MainStack";
import EmptyState from "../shared/ui/EmptyState";
import { useToast } from "../shared/ui/ToastProvider";

const WorkplaceList = () => {
  const { workplaces, deleteWorkplace, toggleWorkplace } = useWorkplaceStore();
  const navigation = useNavigation<MainStackNavigationProp>();
  const { showToast } = useToast();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      "İş Yerini Sil",
      `'${name}' adlı iş yerini silmek istediğinizden emin misiniz?`,
      [
        { text: "İptal", style: "cancel" },
        {
          text: "Sil",
          style: "destructive",
          onPress: () => deleteWorkplace(id),
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

  return (
    <View className="mt-8">
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-bold text-gray-800">İş Yerleri</Text>
          <Text className="text-gray-600 text-sm mt-1">
            {workplaces?.length || 0} iş yeri bulundu
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("WorkplaceForm", {})}
          className="bg-blue-600 flex-row items-center px-5 py-4 rounded-xl"
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Yeni Ekle</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workplaces}
        renderItem={({ item }) => (
          <WorkplaceCard
            workplace={item}
            onEdit={() =>
              navigation.navigate("WorkplaceForm", { workplace: item })
            }
            onDelete={() => handleDelete(item._id, item.name)}
            onToggle={() => handleToggle(item._id, item.name, item.isActive)}
          />
        )}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <EmptyState
            icon="business-outline"
            title="Henüz iş yeri eklenmemiş"
            description="İlk iş yerinizi ekleyerek çalışma takibinize başlayın. İş yerlerinizi yönetmek ve günlük kazançlarınızı takip etmek için yeni bir iş yeri ekleyin."
            actionText="Yeni iş yeri ekle"
            onAction={() => navigation.navigate("WorkplaceForm", {})}
          />
        }
      />
    </View>
  );
};

export default WorkplaceList;
