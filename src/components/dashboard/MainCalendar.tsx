import React from "react";
import { View, Alert, AlertButton } from "react-native"; // AlertButton'ı import et
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

    // Dizinin tipini burada açıkça belirtiyoruz
    const alertButtons: AlertButton[] = workplaces.map((wp) => ({
      text: wp.name,
      onPress: () => addWorkday({ date: day.dateString, workplaceId: wp._id }),
    }));

    // Artık bu satır hata vermeyecek
    alertButtons.push({ text: "İptal", style: "cancel" });

    Alert.alert(
      `${day.dateString} için iş yeri seçin`,
      "O gün hangi iş yerinde çalıştınız?",
      alertButtons
    );
  };

  return (
    <View className="mt-6 bg-white rounded-xl shadow-sm p-2">
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          todayTextColor: "#14b8a6",
          dayTextColor: "#2d4150",
          arrowColor: "#14b8a6",
          monthTextColor: "#14b8a6",
          textDayFontWeight: "300",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "300",
        }}
      />
    </View>
  );
};

export default MainCalendar;
