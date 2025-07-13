// Kullanıcı modelini tanımlar
export interface User {
  _id: string;
  name: string;
  surname: string;
  email: string;
}

// İş Yeri modelini tanımlar
export interface Workplace {
  _id: string;
  userId: string;
  name: string;
  dailyWage: number;
  color: string;
  isActive: boolean;
}

// Çalışma Günü modelini tanımlar (populate edilmiş workplaceId ile)
export interface Workday {
  _id: string;
  userId: string;
  workplaceId: Workplace;
  date: string; // ISO string formatında: "2025-07-12T00:00:00.000Z"
  wageOnThatDay: number;
}
