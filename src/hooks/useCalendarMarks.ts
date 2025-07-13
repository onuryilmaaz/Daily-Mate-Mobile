import { useMemo } from "react";
import { MarkedDates } from "react-native-calendars/src/types";
import { Workday } from "../types";

export const useCalendarMarks = (workdays: Workday[]): MarkedDates => {
  const markedDates = useMemo(() => {
    const newMarkedDates: MarkedDates = {};

    workdays.forEach((day) => {
      // Tarihi "YYYY-MM-DD" formatına çevir
      const dateString = day.date.split("T")[0];

      newMarkedDates[dateString] = {
        selected: true,
        selectedColor: day.workplaceId.color,
        // İsteğe bağlı olarak metin rengini de değiştirebilirsiniz
        customStyles: {
          container: {
            backgroundColor: day.workplaceId.color,
            borderRadius: 8,
          },
          text: {
            color: "white",
            fontWeight: "bold",
          },
        },
      };
    });

    return newMarkedDates;
  }, [workdays]); // Sadece workdays dizisi değiştiğinde yeniden hesapla

  return markedDates;
};
