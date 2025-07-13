import { Workday, Workplace } from "../types";

interface CompanyStat {
  id: string;
  name: string;
  color: string;
  totalEarning: number;
  dayCount: number;
  percentage: number;
}

export const calculateCompanyStats = (workdays: Workday[]): CompanyStat[] => {
  if (!workdays || workdays.length === 0) {
    return [];
  }

  // 1. Firmalara göre kazançları ve gün sayılarını topla
  const statsByCompanyId = workdays.reduce((acc, workday) => {
    const workplace = workday.workplaceId;
    if (!workplace) return acc;

    if (!acc[workplace._id]) {
      acc[workplace._id] = {
        name: workplace.name,
        color: workplace.color,
        totalEarning: 0,
        dayCount: 0,
      };
    }

    acc[workplace._id].totalEarning += workday.wageOnThatDay;
    acc[workplace._id].dayCount += 1;

    return acc;
  }, {} as any);

  // 2. Toplam kazancı hesapla
  const grandTotalEarning = Object.values(statsByCompanyId).reduce(
    (sum: number, company: any) => sum + company.totalEarning,
    0
  );

  // 3. Yüzdelik payları hesapla ve sonucu bir diziye dönüştür
  const finalStats: CompanyStat[] = Object.keys(statsByCompanyId).map((id) => {
    const company = statsByCompanyId[id];
    const percentage =
      grandTotalEarning > 0
        ? parseFloat(
            ((company.totalEarning / grandTotalEarning) * 100).toFixed(1)
          )
        : 0;

    return {
      id,
      name: company.name,
      color: company.color,
      totalEarning: company.totalEarning,
      dayCount: company.dayCount,
      percentage,
    };
  });

  // En çok kazandıran firmaya göre sırala
  return finalStats.sort((a, b) => b.totalEarning - a.totalEarning);
};
