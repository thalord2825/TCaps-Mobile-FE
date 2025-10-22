export interface User {
  id: string;
  name: string;
  role: "Admin" | "Lead" | "QC" | "Staff" | "Courier";
  email: string;
  phone: string;
  avatarUri?: string;
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
  performance: {
    rating: number;
    completedTasks: number;
    totalEarnings: number;
    qualityScore: number;
  };
  factory?: string;
  department?: string;
}

export const sampleUsers: User[] = [
  {
    id: "1",
    name: "NGUYEN VAN ADMIN",
    role: "Admin",
    email: "admin@tcaps.com",
    phone: "0901234567",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-12-19T10:30:00Z",
    performance: {
      rating: 5.0,
      completedTasks: 0,
      totalEarnings: 0,
      qualityScore: 100,
    },
    department: "Quản lý",
  },
  {
    id: "2",
    name: "TRAN THI LEAD",
    role: "Lead",
    email: "lead@tcaps.com",
    phone: "0901234568",
    status: "active",
    joinDate: "2024-02-01",
    lastActive: "2024-12-19T09:45:00Z",
    performance: {
      rating: 4.8,
      completedTasks: 156,
      totalEarnings: 12500000,
      qualityScore: 96,
    },
    factory: "Nhà máy A",
    department: "Sản xuất",
  },
  {
    id: "3",
    name: "LE VAN QC",
    role: "QC",
    email: "qc@tcaps.com",
    phone: "0901234569",
    status: "active",
    joinDate: "2024-03-10",
    lastActive: "2024-12-19T11:15:00Z",
    performance: {
      rating: 4.9,
      completedTasks: 89,
      totalEarnings: 8500000,
      qualityScore: 98,
    },
    factory: "Nhà máy A",
    department: "Kiểm soát chất lượng",
  },
  {
    id: "4",
    name: "PHAM THI STAFF",
    role: "Staff",
    email: "staff@tcaps.com",
    phone: "0901234570",
    status: "active",
    joinDate: "2024-04-05",
    lastActive: "2024-12-19T08:20:00Z",
    performance: {
      rating: 4.6,
      completedTasks: 234,
      totalEarnings: 6800000,
      qualityScore: 92,
    },
    factory: "Nhà máy A",
    department: "Sản xuất",
  },
  {
    id: "5",
    name: "HOANG VAN COURIER",
    role: "Courier",
    email: "courier@tcaps.com",
    phone: "0901234571",
    status: "active",
    joinDate: "2024-05-20",
    lastActive: "2024-12-19T12:00:00Z",
    performance: {
      rating: 4.7,
      completedTasks: 78,
      totalEarnings: 4200000,
      qualityScore: 95,
    },
    factory: "Kho vận chuyển",
    department: "Giao hàng",
  },
  {
    id: "6",
    name: "VU THI STAFF2",
    role: "Staff",
    email: "staff2@tcaps.com",
    phone: "0901234572",
    status: "active",
    joinDate: "2024-06-15",
    lastActive: "2024-12-19T07:30:00Z",
    performance: {
      rating: 4.3,
      completedTasks: 189,
      totalEarnings: 5200000,
      qualityScore: 88,
    },
    factory: "Nhà máy B",
    department: "Sản xuất",
  },
  {
    id: "7",
    name: "DO VAN QC2",
    role: "QC",
    email: "qc2@tcaps.com",
    phone: "0901234573",
    status: "inactive",
    joinDate: "2024-01-20",
    lastActive: "2024-12-15T16:45:00Z",
    performance: {
      rating: 4.1,
      completedTasks: 67,
      totalEarnings: 3200000,
      qualityScore: 85,
    },
    factory: "Nhà máy B",
    department: "Kiểm soát chất lượng",
  },
  {
    id: "8",
    name: "NGUYEN THI PENDING",
    role: "Staff",
    email: "pending@tcaps.com",
    phone: "0901234574",
    status: "pending",
    joinDate: "2024-12-18",
    lastActive: "2024-12-18T14:20:00Z",
    performance: {
      rating: 0,
      completedTasks: 0,
      totalEarnings: 0,
      qualityScore: 0,
    },
    factory: "Nhà máy A",
    department: "Sản xuất",
  },
];

export const getUserStats = () => {
  const totalUsers = sampleUsers.length;
  const activeUsers = sampleUsers.filter((user) => user.status === "active").length;
  const inactiveUsers = sampleUsers.filter((user) => user.status === "inactive").length;
  const pendingUsers = sampleUsers.filter((user) => user.status === "pending").length;

  const roleDistribution = sampleUsers.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    pendingUsers,
    roleDistribution,
  };
};

