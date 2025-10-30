// User management types
import { User } from "../data/sample-users";

export interface UserCreateInput {
  role: "Admin" | "Lead" | "QC" | "Staff" | "Courier";
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  workshopId?: string;
}

export interface UserCreateResponse {
  id: string;
  user: User;
}

export interface UserDeleteInput {
  id: string;
}

export interface StaffPerformance {
  userId: string;
  fullName: string;
  role: string;
  totalIncome: number;
  totalQuantity: number;
  workshopId?: string;
  workshopName?: string;
}

export interface StaffPerformanceFilter {
  workshopId?: string;
  startDate?: string;
  endDate?: string;
}

