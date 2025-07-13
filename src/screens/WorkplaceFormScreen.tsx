import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { useWorkplaceStore } from "../store/useWorkplaceStore";
import ColorPicker from "react-native-wheel-color-picker";

const WorkplaceFormScreen = ({ navigation, route }: any) => {
  const { workplace } = route.params || {};
  const { addWorkplace, updateWorkplace } = useWorkplaceStore();

  const [name, setName] = useState(workplace?.name || "");
  const [dailyWage, setDailyWage] = useState(
    workplace?.dailyWage?.toString() || ""
  );
  const [color, setColor] = useState(workplace?.color || "#FF0000");

  const handleSubmit = async () => {
    const wageNumber = parseFloat(dailyWage);
    if (!name || isNaN(wageNumber)) {
      Alert.alert("Hata", "Lütfen tüm alanları doğru doldurun.");
      return;
    }

    const data = { name, dailyWage: wageNumber, color };

    try {
      if (workplace) {
        // Güncelleme
        await updateWorkplace(workplace._id, data);
      } else {
        // Ekleme
        await addWorkplace(data);
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("İşlem Başarısız", "Bir hata oluştu.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-6">
      <Text className="text-3xl font-bold text-gray-800 mb-6">
        {workplace ? "İş Yerini Düzenle" : "Yeni İş Yeri Ekle"}
      </Text>
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-4"
        placeholder="İş Yeri Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="bg-white p-4 rounded-lg text-base mb-4"
        placeholder="Günlük Ücret (₺)"
        value={dailyWage}
        onChangeText={setDailyWage}
        keyboardType="numeric"
      />
      <Text className="text-lg text-gray-600 mb-4">Renk Seçin</Text>
      <View className="h-64">
        <ColorPicker color={color} onColorChangeComplete={setColor} />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-teal-500 p-4 rounded-lg items-center mt-8"
      >
        <Text className="text-white text-lg font-bold">Kaydet</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WorkplaceFormScreen;
