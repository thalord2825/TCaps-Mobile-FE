export interface WorkTask {
  id: string;
  batchId: string;
  batchName: string;
  stage: string;
  stageNumber: number;
  description: string;
  assignedTo: string;
  status: "pending" | "in_progress" | "completed" | "on_hold" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  quantity: {
    required: number;
    completed: number;
    remaining: number;
  };
  deadline: string;
  estimatedHours: number;
  actualHours?: number;
  quality: {
    passRate: number;
    defects: number;
    notes?: string;
  };
  materials: {
    name: string;
    required: number;
    available: number;
    unit: string;
  }[];
  instructions: string[];
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export const sampleWorkTasks: WorkTask[] = [
  {
    id: "1",
    batchId: "B001",
    batchName: "Lô mũ bóng chày N001",
    stage: "Cắt vải",
    stageNumber: 3,
    description: "Cắt vải theo mẫu thiết kế cho 50 chiếc mũ",
    assignedTo: "PHAM THI STAFF",
    status: "in_progress",
    priority: "high",
    quantity: {
      required: 50,
      completed: 25,
      remaining: 25,
    },
    deadline: "2024-12-20T17:00:00Z",
    estimatedHours: 4,
    actualHours: 2.5,
    quality: {
      passRate: 96,
      defects: 1,
      notes: "1 sản phẩm bị cắt lệch",
    },
    materials: [
      { name: "Vải cotton", required: 10, available: 15, unit: "mét" },
      { name: "Keo dán", required: 2, available: 5, unit: "chai" },
    ],
    instructions: [
      "Kiểm tra chất lượng vải trước khi cắt",
      "Sử dụng máy cắt chuyên dụng",
      "Đảm bảo độ chính xác ±2mm",
      "Kiểm tra từng sản phẩm sau khi cắt",
    ],
    createdAt: "2024-12-19T08:00:00Z",
    updatedAt: "2024-12-19T10:30:00Z",
  },
  {
    id: "2",
    batchId: "B001",
    batchName: "Lô mũ bóng chày N001",
    stage: "Dán vải",
    stageNumber: 4,
    description: "Dán các phần vải đã cắt theo quy trình",
    assignedTo: "VU THI STAFF2",
    status: "pending",
    priority: "medium",
    quantity: {
      required: 50,
      completed: 0,
      remaining: 50,
    },
    deadline: "2024-12-21T17:00:00Z",
    estimatedHours: 3,
    quality: {
      passRate: 0,
      defects: 0,
    },
    materials: [
      { name: "Keo dán chuyên dụng", required: 3, available: 8, unit: "chai" },
      { name: "Băng keo", required: 5, available: 12, unit: "cuộn" },
    ],
    instructions: [
      "Chờ hoàn thành giai đoạn cắt vải",
      "Sử dụng keo dán chuyên dụng",
      "Đảm bảo độ bền dán",
      "Kiểm tra chất lượng sau khi dán",
    ],
    createdAt: "2024-12-19T08:00:00Z",
    updatedAt: "2024-12-19T08:00:00Z",
  },
  {
    id: "3",
    batchId: "B002",
    batchName: "Lô mũ lưỡi trai N002",
    stage: "In logo",
    stageNumber: 6,
    description: "In logo công ty lên mũ",
    assignedTo: "PHAM THI STAFF",
    status: "completed",
    priority: "medium",
    quantity: {
      required: 30,
      completed: 30,
      remaining: 0,
    },
    deadline: "2024-12-18T17:00:00Z",
    estimatedHours: 2,
    actualHours: 1.8,
    quality: {
      passRate: 100,
      defects: 0,
      notes: "Hoàn thành đúng hạn, chất lượng tốt",
    },
    materials: [
      { name: "Mực in", required: 1, available: 3, unit: "chai" },
      { name: "Giấy in", required: 2, available: 5, unit: "tờ" },
    ],
    instructions: [
      "Kiểm tra máy in trước khi sử dụng",
      "Sử dụng mực in chuyên dụng",
      "Đảm bảo độ rõ nét của logo",
      "Kiểm tra từng sản phẩm sau khi in",
    ],
    createdAt: "2024-12-18T09:00:00Z",
    updatedAt: "2024-12-18T16:30:00Z",
    completedAt: "2024-12-18T16:30:00Z",
  },
  {
    id: "4",
    batchId: "B003",
    batchName: "Lô mũ bucket N003",
    stage: "May viền",
    stageNumber: 8,
    description: "May viền cho 100 chiếc mũ bucket",
    assignedTo: "VU THI STAFF2",
    status: "on_hold",
    priority: "low",
    quantity: {
      required: 100,
      completed: 15,
      remaining: 85,
    },
    deadline: "2024-12-22T17:00:00Z",
    estimatedHours: 6,
    actualHours: 1.2,
    quality: {
      passRate: 93,
      defects: 1,
      notes: "Tạm dừng do thiếu chỉ may",
    },
    materials: [
      { name: "Chỉ may", required: 10, available: 2, unit: "cuộn" },
      { name: "Kim may", required: 5, available: 8, unit: "cái" },
    ],
    instructions: [
      "Sử dụng chỉ may chất lượng cao",
      "Đảm bảo đường may chắc chắn",
      "Kiểm tra độ đều của viền",
      "Hoàn thiện từng sản phẩm",
    ],
    createdAt: "2024-12-19T07:00:00Z",
    updatedAt: "2024-12-19T11:00:00Z",
  },
  {
    id: "5",
    batchId: "B004",
    batchName: "Lô mũ snapback N004",
    stage: "Lắp khóa",
    stageNumber: 9,
    description: "Lắp khóa snapback cho 25 chiếc mũ",
    assignedTo: "PHAM THI STAFF",
    status: "cancelled",
    priority: "urgent",
    quantity: {
      required: 25,
      completed: 0,
      remaining: 25,
    },
    deadline: "2024-12-19T12:00:00Z",
    estimatedHours: 2,
    quality: {
      passRate: 0,
      defects: 0,
      notes: "Hủy do thiếu linh kiện khóa",
    },
    materials: [
      { name: "Khóa snapback", required: 25, available: 0, unit: "cái" },
      { name: "Vít", required: 50, available: 100, unit: "cái" },
    ],
    instructions: [
      "Kiểm tra chất lượng khóa trước khi lắp",
      "Sử dụng dụng cụ chuyên dụng",
      "Đảm bảo độ chắc chắn",
      "Kiểm tra hoạt động của khóa",
    ],
    createdAt: "2024-12-19T06:00:00Z",
    updatedAt: "2024-12-19T10:00:00Z",
  },
];

export const getWorkTaskStats = () => {
  const totalTasks = sampleWorkTasks.length;
  const pendingTasks = sampleWorkTasks.filter((t) => t.status === "pending").length;
  const inProgressTasks = sampleWorkTasks.filter((t) => t.status === "in_progress").length;
  const completedTasks = sampleWorkTasks.filter((t) => t.status === "completed").length;
  const onHoldTasks = sampleWorkTasks.filter((t) => t.status === "on_hold").length;
  const cancelledTasks = sampleWorkTasks.filter((t) => t.status === "cancelled").length;

  const priorityDistribution = sampleWorkTasks.reduce(
    (acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalRequired = sampleWorkTasks.reduce((sum, task) => sum + task.quantity.required, 0);
  const totalCompleted = sampleWorkTasks.reduce((sum, task) => sum + task.quantity.completed, 0);
  const completionRate = totalRequired > 0 ? (totalCompleted / totalRequired) * 100 : 0;

  const averageQuality =
    sampleWorkTasks.filter((task) => task.quality.passRate > 0).reduce((sum, task) => sum + task.quality.passRate, 0) /
      sampleWorkTasks.filter((task) => task.quality.passRate > 0).length || 0;

  return {
    totalTasks,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    onHoldTasks,
    cancelledTasks,
    priorityDistribution,
    totalRequired,
    totalCompleted,
    completionRate,
    averageQuality,
  };
};




