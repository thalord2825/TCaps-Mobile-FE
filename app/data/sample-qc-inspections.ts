export interface QCInspection {
  id: string;
  batchId: string;
  batchName: string;
  productCode: string;
  stage: string;
  quantity: number;
  priority: "low" | "medium" | "high" | "urgent";
  factoryId: string;
  factoryName: string;
  assignedTo: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  createdAt: string;
  dueDate: string;
  notes?: string;
  defects?: {
    type: string;
    description: string;
    severity: "minor" | "major" | "critical";
  }[];
}

export const sampleQCInspections: QCInspection[] = [
  {
    id: "QC001",
    batchId: "B001",
    batchName: "Lô mũ bóng chày N001",
    productCode: "N001",
    stage: "Fabric Cutting",
    quantity: 50,
    priority: "high",
    factoryId: "F001",
    factoryName: "Nhà máy A - Cắt vải",
    assignedTo: "QC Inspector A",
    status: "pending",
    createdAt: "2024-12-19T08:00:00Z",
    dueDate: "2024-12-19T16:00:00Z",
    notes: "Kiểm tra chất lượng vải sau khi cắt",
  },
  {
    id: "QC002",
    batchId: "B002",
    batchName: "Lô mũ lưỡi trai N002",
    productCode: "N002",
    stage: "Hat Crown Assembly",
    quantity: 30,
    priority: "medium",
    factoryId: "F001",
    factoryName: "Nhà máy A - Lắp ráp mũ",
    assignedTo: "QC Inspector A",
    status: "in_progress",
    createdAt: "2024-12-19T09:15:00Z",
    dueDate: "2024-12-19T17:00:00Z",
    notes: "Kiểm tra đường may và độ bền",
  },
  {
    id: "QC003",
    batchId: "B003",
    batchName: "Lô mũ bucket N003",
    productCode: "N003",
    stage: "Final Quality Check",
    quantity: 100,
    priority: "urgent",
    factoryId: "F001",
    factoryName: "Nhà máy A - Kiểm tra cuối",
    assignedTo: "QC Inspector A",
    status: "pending",
    createdAt: "2024-12-19T10:30:00Z",
    dueDate: "2024-12-19T18:00:00Z",
    notes: "Kiểm tra toàn bộ sản phẩm trước khi đóng gói",
    defects: [
      {
        type: "Stitching",
        description: "Đường may không đều",
        severity: "minor",
      },
    ],
  },
  {
    id: "QC004",
    batchId: "B004",
    batchName: "Lô mũ snapback N004",
    productCode: "N004",
    stage: "Printing & Embroidery",
    quantity: 25,
    priority: "low",
    factoryId: "F001",
    factoryName: "Nhà máy A - In và thêu",
    assignedTo: "QC Inspector A",
    status: "completed",
    createdAt: "2024-12-18T14:00:00Z",
    dueDate: "2024-12-18T20:00:00Z",
    notes: "Kiểm tra chất lượng in và thêu",
  },
  {
    id: "QC005",
    batchId: "B005",
    batchName: "Lô mũ trucker N005",
    productCode: "N005",
    stage: "Packaging",
    quantity: 40,
    priority: "medium",
    factoryId: "F001",
    factoryName: "Nhà máy A - Đóng gói",
    assignedTo: "QC Inspector A",
    status: "failed",
    createdAt: "2024-12-18T16:00:00Z",
    dueDate: "2024-12-18T22:00:00Z",
    notes: "Kiểm tra bao bì và nhãn mác",
    defects: [
      {
        type: "Packaging",
        description: "Nhãn mác bị sai",
        severity: "major",
      },
      {
        type: "Quality",
        description: "Sản phẩm có vết bẩn",
        severity: "critical",
      },
    ],
  },
];

export const getQCInspectionStats = (factoryId?: string) => {
  const inspections = factoryId
    ? sampleQCInspections.filter((inspection) => inspection.factoryId === factoryId)
    : sampleQCInspections;

  const totalInspections = inspections.length;
  const pendingInspections = inspections.filter((i) => i.status === "pending").length;
  const inProgressInspections = inspections.filter((i) => i.status === "in_progress").length;
  const completedInspections = inspections.filter((i) => i.status === "completed").length;
  const failedInspections = inspections.filter((i) => i.status === "failed").length;

  const priorityDistribution = inspections.reduce(
    (acc, inspection) => {
      acc[inspection.priority] = (acc[inspection.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalQuantity = inspections.reduce((sum, inspection) => sum + inspection.quantity, 0);
  const averageQuantity = totalQuantity / totalInspections || 0;

  return {
    totalInspections,
    pendingInspections,
    inProgressInspections,
    completedInspections,
    failedInspections,
    priorityDistribution,
    totalQuantity,
    averageQuantity,
  };
};



