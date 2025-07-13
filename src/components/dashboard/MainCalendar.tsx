import React from "react";
import { View, Alert, AlertButton } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useWorkdayStore } from "../../store/useWorkdayStore";
import { useWorkplaceStore } from "../../store/useWorkplaceStore";
import { useCalendarMarks } from "../../hooks/useCalendarMarks";

LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: [
    "Oca",
    "Şub",
    "Mar",
    "Nis",
    "May",
    "Haz",
    "Tem",
    "Ağu",
    "Eyl",
    "Eki",
    "Kas",
    "Ara",
  ],
  dayNames: [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
  ],
  dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  today: "Bugün",
};
LocaleConfig.defaultLocale = "tr";

const MainCalendar = () => {
  const { workdays, addWorkday } = useWorkdayStore();
  const { workplaces } = useWorkplaceStore();
  const markedDates = useCalendarMarks(workdays);

  const handleDayPress = (day: any) => {
    if (workplaces.length === 0) {
      Alert.alert("Hata", "Lütfen önce bir iş yeri ekleyin.");
      return;
    }

    const alertButtons: AlertButton[] = workplaces.map((wp) => ({
      text: wp.name,
      onPress: () => addWorkday({ date: day.dateString, workplaceId: wp._id }),
    }));

    alertButtons.push({ text: "İptal", style: "cancel" });

    Alert.alert(
      `${day.dateString} için iş yeri seçin`,
      "O gün hangi iş yerinde çalıştınız?",
      alertButtons
    );
  };

  return (
    <View className="mt-8 bg-white rounded-3xl shadow-medium p-4 border border-surface-100">
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#9aa8b6",
          todayTextColor: "#7c6df2",
          dayTextColor: "#495057",
          arrowColor: "#7c6df2",
          monthTextColor: "#495057",
          textDayFontWeight: "500",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "600",
          textMonthFontSize: 18,
          textDayFontSize: 16,
          textDayHeaderFontSize: 14,
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default MainCalendar;