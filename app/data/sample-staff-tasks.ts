export interface StaffTask {
  id: string;
  batchId: string;
  batchName: string;
  productCode: string;
  stage: string;
  targetQuantity: number;
  completedQuantity: number;
  deadline: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "assigned" | "in_progress" | "completed" | "overdue";
  assignedAt: string;
  completedAt?: string;
  notes?: string;
  qualityScore?: number; // 0-100
  earnings: {
    baseRate: number; // per item
    bonus: number;
    total: number;
  };
}

export const sampleStaffTasks: StaffTask[] = [
  {
    id: "T001",
    batchId: "B001",
    batchName: "Lô mũ bóng chày N001",
    productCode: "N001",
    stage: "Fabric Cutting",
    targetQuantity: 50,
    completedQuantity: 35,
    deadline: "2024-12-19T18:00:00Z",
    priority: "high",
    status: "in_progress",
    assignedAt: "2024-12-19T08:00:00Z",
    notes: "Cắt vải theo mẫu N001, chú ý độ chính xác",
    qualityScore: 95,
    earnings: {
      baseRate: 5000,
      bonus: 2500,
      total: 175000, // 35 * 5000 + 2500
    },
  },
  {
    id: "T002",
    batchId: "B002",
    batchName: "Lô mũ lưỡi trai N002",
    productCode: "N002",
    stage: "Hat Crown Assembly",
    targetQuantity: 30,
    completedQuantity: 30,
    deadline: "2024-12-19T17:00:00Z",
    priority: "medium",
    status: "completed",
    assignedAt: "2024-12-19T09:15:00Z",
    completedAt: "2024-12-19T16:30:00Z",
    notes: "Lắp ráp mũ theo quy trình chuẩn",
    qualityScore: 98,
    earnings: {
      baseRate: 6000,
      bonus: 5000,
      total: 185000, // 30 * 6000 + 5000
    },
  },
  {
    id: "T003",
    batchId: "B003",
    batchName: "Lô mũ bucket N003",
    productCode: "N003",
    stage: "Printing & Embroidery",
    targetQuantity: 100,
    completedQuantity: 0,
    deadline: "2024-12-19T20:00:00Z",
    priority: "urgent",
    status: "assigned",
    assignedAt: "2024-12-19T10:30:00Z",
    notes: "In logo và thêu theo thiết kế",
    earnings: {
      baseRate: 4000,
      bonus: 0,
      total: 0,
    },
  },
  {
    id: "T004",
    batchId: "B004",
    batchName: "Lô mũ snapback N004",
    productCode: "N004",
    stage: "Final Assembly",
    targetQuantity: 25,
    completedQuantity: 25,
    deadline: "2024-12-18T22:00:00Z",
    priority: "low",
    status: "completed",
    assignedAt: "2024-12-18T14:00:00Z",
    completedAt: "2024-12-18T21:45:00Z",
    notes: "Lắp ráp hoàn chỉnh sản phẩm",
    qualityScore: 92,
    earnings: {
      baseRate: 7000,
      bonus: 2000,
      total: 177000, // 25 * 7000 + 2000
    },
  },
  {
    id: "T005",
    batchId: "B005",
    batchName: "Lô mũ trucker N005",
    productCode: "N005",
    stage: "Packaging",
    targetQuantity: 40,
    completedQuantity: 15,
    deadline: "2024-12-18T23:00:00Z",
    priority: "medium",
    status: "overdue",
    assignedAt: "2024-12-18T16:00:00Z",
    notes: "Đóng gói sản phẩm theo tiêu chuẩn",
    qualityScore: 88,
    earnings: {
      baseRate: 3000,
      bonus: 0,
      total: 45000, // 15 * 3000
    },
  },
];

export const getStaffTaskStats = () => {
  const totalTasks = sampleStaffTasks.length;
  const assignedTasks = sampleStaffTasks.filter((task) => task.status === "assigned").length;
  const inProgressTasks = sampleStaffTasks.filter((task) => task.status === "in_progress").length;
  const completedTasks = sampleStaffTasks.filter((task) => task.status === "completed").length;
  const overdueTasks = sampleStaffTasks.filter((task) => task.status === "overdue").length;

  const totalTargetQuantity = sampleStaffTasks.reduce((sum, task) => sum + task.targetQuantity, 0);
  const totalCompletedQuantity = sampleStaffTasks.reduce((sum, task) => sum + task.completedQuantity, 0);
  const completionRate = totalTargetQuantity > 0 ? (totalCompletedQuantity / totalTargetQuantity) * 100 : 0;

  const totalEarnings = sampleStaffTasks.reduce((sum, task) => sum + task.earnings.total, 0);
  const averageQualityScore = sampleStaffTasks
    .filter((task) => task.qualityScore !== undefined)
    .reduce((sum, task, _, arr) => sum + (task.qualityScore || 0) / arr.length, 0);

  const priorityDistribution = sampleStaffTasks.reduce(
    (acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalTasks,
    assignedTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
    totalTargetQuantity,
    totalCompletedQuantity,
    completionRate,
    totalEarnings,
    averageQualityScore,
    priorityDistribution,
  };
};



