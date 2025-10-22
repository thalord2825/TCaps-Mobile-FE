export interface ProfileData {
  id: string;
  name: string;
  role: "Staff" | "QC" | "Lead" | "Admin" | "Courier";
  employeeId: string;
  avatarUri?: string;
  email: string;
  phone: string;
  factory: string; // For Staff/QC
  assignedFactories?: string[]; // For Lead
  joinDate: string;
  contractType: string;
  hourlyRate?: number;
  pieceRate?: number;

  // Stats
  totalProduction?: number;
  totalEarnings?: number;
  qualityScore?: number;
  qcPassRate?: number;
  totalInspections?: number;
  batchesManaged?: number;
  teamSize?: number;

  // Settings
  notificationEnabled: boolean;
  language: "vi" | "en";
  theme: "light" | "dark" | "auto";
}

export interface EarningsRecord {
  date: string;
  quantity: number;
  rate: number;
  amount: number;
  status: "pending" | "paid";
  batchId: string;
  stage: string;
  sessionNumber?: number; // For multiple sessions per day (ca 1, ca 2, etc.)
}

export interface PerformanceData {
  date: string;
  value: number;
  label: string;
}

// Sample data for all 4 roles
export const sampleStaffProfile: ProfileData = {
  id: "staff_001",
  name: "Nguyễn Văn Minh",
  role: "Staff",
  employeeId: "NV001",
  avatarUri: undefined,
  email: "minh.nguyen@tcaps.com",
  phone: "0901234567",
  factory: "Xưởng Cắt Vải",
  joinDate: "2023-01-15",
  contractType: "Hợp đồng lao động",
  pieceRate: 2500, // VND per piece
  totalProduction: 1247,
  totalEarnings: 3117500, // VND
  qualityScore: 92,
  notificationEnabled: true,
  language: "vi",
  theme: "auto",
};

export const sampleQCProfile: ProfileData = {
  id: "qc_001",
  name: "Trần Thị Hoa",
  role: "QC",
  employeeId: "QC001",
  avatarUri: undefined,
  email: "hoa.tran@tcaps.com",
  phone: "0907654321",
  factory: "Xưởng Kiểm Tra Chất Lượng",
  joinDate: "2022-08-20",
  contractType: "Hợp đồng lao động",
  hourlyRate: 45000, // VND per hour
  qcPassRate: 96,
  totalInspections: 2847,
  totalEarnings: 5400000, // VND
  notificationEnabled: true,
  language: "vi",
  theme: "auto",
};

export const sampleLeadProfile: ProfileData = {
  id: "lead_001",
  name: "Lê Văn Đức",
  role: "Lead",
  employeeId: "LD001",
  avatarUri: undefined,
  email: "duc.le@tcaps.com",
  phone: "0909876543",
  factory: "Xưởng Chính",
  assignedFactories: ["Xưởng Cắt Vải", "Xưởng May", "Xưởng Hoàn Thiện", "Xưởng Kiểm Tra"],
  joinDate: "2021-03-10",
  contractType: "Hợp đồng quản lý",
  hourlyRate: 75000, // VND per hour
  batchesManaged: 156,
  teamSize: 24,
  totalEarnings: 12000000, // VND
  notificationEnabled: true,
  language: "vi",
  theme: "auto",
};

export const sampleAdminProfile: ProfileData = {
  id: "admin_001",
  name: "Phạm Thị Lan",
  role: "Admin",
  employeeId: "AD001",
  avatarUri: undefined,
  email: "lan.pham@tcaps.com",
  phone: "0905555555",
  factory: "Trụ sở chính",
  joinDate: "2020-01-01",
  contractType: "Hợp đồng quản lý cấp cao",
  hourlyRate: 120000, // VND per hour
  notificationEnabled: true,
  language: "vi",
  theme: "auto",
};

export const sampleCourierProfile: ProfileData = {
  id: "courier_001",
  name: "Hoàng Văn Giao",
  role: "Courier",
  employeeId: "CO001",
  avatarUri: undefined,
  email: "giao.hoang@tcaps.com",
  phone: "0901234571",
  factory: "Kho vận chuyển",
  joinDate: "2024-05-20",
  contractType: "Hợp đồng lao động",
  hourlyRate: 45000, // VND per hour
  totalProduction: 78,
  totalEarnings: 4200000,
  qualityScore: 95,
  notificationEnabled: true,
  language: "vi",
  theme: "auto",
};

// Sample earnings data for Staff and QC
export const sampleStaffEarnings: EarningsRecord[] = [
  {
    date: "2025-01-15",
    quantity: 45,
    rate: 2500,
    amount: 112500,
    status: "paid",
    batchId: "B001",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-14",
    quantity: 52,
    rate: 2500,
    amount: 130000,
    status: "paid",
    batchId: "B002",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-13",
    quantity: 38,
    rate: 2500,
    amount: 95000,
    status: "pending",
    batchId: "B003",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-12",
    quantity: 41,
    rate: 2500,
    amount: 102500,
    status: "paid",
    batchId: "B004",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-11",
    quantity: 47,
    rate: 2500,
    amount: 117500,
    status: "paid",
    batchId: "B005",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-10",
    quantity: 43,
    rate: 2500,
    amount: 107500,
    status: "paid",
    batchId: "B006",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-09",
    quantity: 39,
    rate: 2500,
    amount: 97500,
    status: "paid",
    batchId: "B007",
    stage: "Cắt vải",
  },
  {
    date: "2025-01-08",
    quantity: 48,
    rate: 2500,
    amount: 120000,
    status: "paid",
    batchId: "B008",
    stage: "Cắt vải",
  },
];

export const sampleQCEarnings: EarningsRecord[] = [
  {
    date: "2025-01-15",
    quantity: 8,
    rate: 45000,
    amount: 360000,
    status: "paid",
    batchId: "B001",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-14",
    quantity: 7,
    rate: 45000,
    amount: 315000,
    status: "paid",
    batchId: "B002",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-13",
    quantity: 9,
    rate: 45000,
    amount: 405000,
    status: "pending",
    batchId: "B003",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-12",
    quantity: 6,
    rate: 45000,
    amount: 270000,
    status: "paid",
    batchId: "B004",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-11",
    quantity: 8,
    rate: 45000,
    amount: 360000,
    status: "paid",
    batchId: "B005",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-10",
    quantity: 7,
    rate: 45000,
    amount: 315000,
    status: "paid",
    batchId: "B006",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-09",
    quantity: 6,
    rate: 45000,
    amount: 270000,
    status: "paid",
    batchId: "B007",
    stage: "Kiểm tra chất lượng",
  },
  {
    date: "2025-01-08",
    quantity: 8,
    rate: 45000,
    amount: 360000,
    status: "paid",
    batchId: "B008",
    stage: "Kiểm tra chất lượng",
  },
];

export const sampleCourierEarnings: EarningsRecord[] = [
  {
    date: "2025-01-15",
    quantity: 3,
    rate: 50000,
    amount: 150000,
    status: "paid",
    batchId: "B001",
    stage: "Giao hàng",
  },
  {
    date: "2025-01-14",
    quantity: 2,
    rate: 50000,
    amount: 100000,
    status: "paid",
    batchId: "B002",
    stage: "Giao hàng",
  },
  {
    date: "2025-01-13",
    quantity: 4,
    rate: 50000,
    amount: 200000,
    status: "pending",
    batchId: "B003",
    stage: "Giao hàng",
  },
  {
    date: "2025-01-12",
    quantity: 1,
    rate: 50000,
    amount: 50000,
    status: "paid",
    batchId: "B004",
    stage: "Giao hàng",
  },
];

// Sample performance data for charts
export const sampleStaffPerformance: PerformanceData[] = [
  { date: "2025-01-09", value: 42, label: "Sản phẩm" },
  { date: "2025-01-10", value: 38, label: "Sản phẩm" },
  { date: "2025-01-11", value: 47, label: "Sản phẩm" },
  { date: "2025-01-12", value: 41, label: "Sản phẩm" },
  { date: "2025-01-13", value: 38, label: "Sản phẩm" },
  { date: "2025-01-14", value: 52, label: "Sản phẩm" },
  { date: "2025-01-15", value: 45, label: "Sản phẩm" },
];

export const sampleQCPerformance: PerformanceData[] = [
  { date: "2025-01-09", value: 7, label: "Kiểm tra" },
  { date: "2025-01-10", value: 6, label: "Kiểm tra" },
  { date: "2025-01-11", value: 8, label: "Kiểm tra" },
  { date: "2025-01-12", value: 6, label: "Kiểm tra" },
  { date: "2025-01-13", value: 9, label: "Kiểm tra" },
  { date: "2025-01-14", value: 7, label: "Kiểm tra" },
  { date: "2025-01-15", value: 8, label: "Kiểm tra" },
];

export const sampleLeadPerformance: PerformanceData[] = [
  { date: "2025-01-09", value: 12, label: "Lô hoàn thành" },
  { date: "2025-01-10", value: 8, label: "Lô hoàn thành" },
  { date: "2025-01-11", value: 15, label: "Lô hoàn thành" },
  { date: "2025-01-12", value: 11, label: "Lô hoàn thành" },
  { date: "2025-01-13", value: 9, label: "Lô hoàn thành" },
  { date: "2025-01-14", value: 13, label: "Lô hoàn thành" },
  { date: "2025-01-15", value: 10, label: "Lô hoàn thành" },
];

export const sampleAdminPerformance: PerformanceData[] = [
  { date: "2025-01-09", value: 45, label: "Người dùng hoạt động" },
  { date: "2025-01-10", value: 42, label: "Người dùng hoạt động" },
  { date: "2025-01-11", value: 48, label: "Người dùng hoạt động" },
  { date: "2025-01-12", value: 44, label: "Người dùng hoạt động" },
  { date: "2025-01-13", value: 46, label: "Người dùng hoạt động" },
  { date: "2025-01-14", value: 49, label: "Người dùng hoạt động" },
  { date: "2025-01-15", value: 47, label: "Người dùng hoạt động" },
];

export const sampleCourierPerformance: PerformanceData[] = [
  { date: "2025-01-09", value: 2, label: "Đơn giao" },
  { date: "2025-01-10", value: 3, label: "Đơn giao" },
  { date: "2025-01-11", value: 1, label: "Đơn giao" },
  { date: "2025-01-12", value: 4, label: "Đơn giao" },
  { date: "2025-01-13", value: 2, label: "Đơn giao" },
  { date: "2025-01-14", value: 3, label: "Đơn giao" },
  { date: "2025-01-15", value: 2, label: "Đơn giao" },
];

// Helper function to get profile data by role
export function getProfileByRole(role: "Staff" | "QC" | "Lead" | "Admin" | "Courier"): ProfileData {
  switch (role) {
    case "Staff":
      return sampleStaffProfile;
    case "QC":
      return sampleQCProfile;
    case "Lead":
      return sampleLeadProfile;
    case "Admin":
      return sampleAdminProfile;
    case "Courier":
      return sampleCourierProfile;
    default:
      return sampleStaffProfile;
  }
}

// Helper function to get earnings by role
export function getEarningsByRole(role: "Staff" | "QC" | "Lead" | "Admin" | "Courier"): EarningsRecord[] {
  switch (role) {
    case "Staff":
      return sampleStaffEarnings;
    case "QC":
      return sampleQCEarnings;
    case "Courier":
      return sampleCourierEarnings;
    default:
      return [];
  }
}

// Helper function to get performance data by role
export function getPerformanceByRole(role: "Staff" | "QC" | "Lead" | "Admin" | "Courier"): PerformanceData[] {
  switch (role) {
    case "Staff":
      return sampleStaffPerformance;
    case "QC":
      return sampleQCPerformance;
    case "Lead":
      return sampleLeadPerformance;
    case "Admin":
      return sampleAdminPerformance;
    case "Courier":
      return sampleCourierPerformance;
    default:
      return [];
  }
}

// Helper function to group earnings by date
export function groupEarningsByDate(earnings: EarningsRecord[]): Record<string, EarningsRecord[]> {
  return earnings.reduce(
    (acc, record) => {
      if (!acc[record.date]) acc[record.date] = [];
      acc[record.date].push(record);
      return acc;
    },
    {} as Record<string, EarningsRecord[]>
  );
}
