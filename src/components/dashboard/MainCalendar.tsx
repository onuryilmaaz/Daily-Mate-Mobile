import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useWorkdayStore } from "../../store/useWorkdayStore";
import { useWorkplaceStore } from "../../store/useWorkplaceStore";
import { useCalendarMarks } from "../../hooks/useCalendarMarks";
import WorkdayModal from "../shared/ui/WorkdayModal";

type AlertButtonVariant = "primary" | "secondary" | "danger" | "cancel";

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
  const { workdays, addWorkday, removeWorkday } = useWorkdayStore();
  const { workplaces } = useWorkplaceStore();
  const markedDates = useCalendarMarks(workdays);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedWorkplaceId, setSelectedWorkplaceId] = useState<
    string | undefined
  >(undefined);
  const [showDelete, setShowDelete] = useState(false);

  // Seçili gün için workday var mı?
  const getWorkdayForDate = (date: string) =>
    workdays.find((wd) => wd.date.slice(0, 10) === date.slice(0, 10));

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    const workday = getWorkdayForDate(day.dateString);
    setSelectedWorkplaceId(workday?.workplaceId?._id);
    setShowDelete(!!workday);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (!selectedWorkplaceId) return;
    const workday = getWorkdayForDate(selectedDate);
    if (workday) {
      // Güncellensin
      removeWorkday(workday._id);
      addWorkday({ date: selectedDate, workplaceId: selectedWorkplaceId });
    } else {
      addWorkday({ date: selectedDate, workplaceId: selectedWorkplaceId });
    }
    setModalVisible(false);
  };

  const handleDelete = () => {
    const workday = getWorkdayForDate(selectedDate);
    if (workday) {
      removeWorkday(workday._id);
    }
    setModalVisible(false);
  };

  return (
    <View className="mt-8 bg-white rounded-3xl shadow-medium p-4 border border-surface-100">
      <Calendar
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "9aa8b6",
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
      <WorkdayModal
        visible={modalVisible}
        workplaces={workplaces}
        selectedWorkplaceId={selectedWorkplaceId}
        onSelect={setSelectedWorkplaceId}
        onConfirm={handleConfirm}
        onDelete={showDelete ? handleDelete : undefined}
        onClose={() => setModalVisible(false)}
        showDelete={showDelete}
        dateLabel={selectedDate}
      />
    </View>
  );
};

export default MainCalendar;
