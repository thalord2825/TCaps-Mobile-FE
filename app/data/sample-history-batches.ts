export interface StageDetail {
  stageNumber: number;
  stageName: string;
  factory: string;
  quantity: number;
  startDate: string;
  endDate: string;
  duration: number; // hours
  qcStatus: "Pass" | "Fail" | "Pending";
  staffAssigned: string[];
  cost: number;
  notes?: string;
}

export interface HistoryBatchItem {
  id: string;
  productCode: string;
  totalQty: number;
  completionDate: string;
  startDate: string;
  status: "Completed" | "Cancelled" | "Returned";
  totalCost: number;
  stages: StageDetail[];
}

// 17 Production Stages for Hat Manufacturing
const productionStages = [
  { name: "Mua vải + nguyên liệu", factory: "Kho nguyên liệu" },
  { name: "Cắt laser (nếu có)", factory: "Xưởng Cắt Laser" },
  { name: "Cắt vải có keo", factory: "Xưởng Cắt Vải" },
  { name: "Dán vải", factory: "Xưởng Dán Vải" },
  { name: "Cắt vải thành bộ hoàn chỉnh", factory: "Xưởng Cắt Vải" },
  { name: "In + thêu", factory: "Xưởng In Thêu" },
  { name: "Làm vành nón", factory: "Xưởng May Vành" },
  { name: "Làm chóp nón", factory: "Xưởng May Chóp" },
  { name: "Gắn nút bấm vào đuôi (nếu có)", factory: "Xưởng Đính Nút" },
  { name: "Cắm thanh chống + may vắt sổ", factory: "Xưởng May Vắt Sổ" },
  { name: "Cắm nón + cắm băng", factory: "Xưởng Lắp Ráp" },
  { name: "Ủi chóp nón", factory: "Xưởng Ủi" },
  { name: "May dây kéo đuôi nón (nếu có)", factory: "Xưởng May Dây Kéo" },
  { name: "May nhãn", factory: "Xưởng May Nhãn" },
  { name: "Cắt chỉ thừa + cắm nhãn tag", factory: "Xưởng Hoàn Thiện" },
  { name: "Ủi nón", factory: "Xưởng Ủi" },
  { name: "Gấp thanh chống + đóng gói", factory: "Xưởng Đóng Gói" },
];

function generateStagesForBatch(batchId: string, totalQty: number, startDate: string): StageDetail[] {
  const stages: StageDetail[] = [];
  let currentDate = new Date(startDate);

  productionStages.forEach((stage, index) => {
    const stageStart = new Date(currentDate);
    const duration = Math.floor(Math.random() * 8) + 4; // 4-12 hours
    const stageEnd = new Date(stageStart.getTime() + duration * 60 * 60 * 1000);

    stages.push({
      stageNumber: index + 1,
      stageName: stage.name,
      factory: stage.factory,
      quantity: totalQty,
      startDate: stageStart.toISOString().split("T")[0],
      endDate: stageEnd.toISOString().split("T")[0],
      duration: duration,
      qcStatus: Math.random() > 0.1 ? "Pass" : "Fail", // 90% pass rate
      staffAssigned: [`Staff-${Math.floor(Math.random() * 5) + 1}`, `Staff-${Math.floor(Math.random() * 5) + 1}`],
      cost: Math.floor(Math.random() * 50000) + 10000, // 10k-60k VND per stage
      notes: Math.random() > 0.7 ? "Cần kiểm tra chất lượng" : undefined,
    });

    currentDate = stageEnd;
  });

  return stages;
}

export const sampleHistoryBatches: HistoryBatchItem[] = [
  {
    id: "H-001",
    productCode: "N001",
    totalQty: 1000,
    completionDate: "2024-12-15",
    startDate: "2024-12-01",
    status: "Completed",
    totalCost: 2500000,
    stages: generateStagesForBatch("H-001", 1000, "2024-10-10"),
  },
  {
    id: "H-002",
    productCode: "N114",
    totalQty: 700,
    completionDate: "2024-12-12",
    startDate: "2024-11-28",
    status: "Completed",
    totalCost: 1800000,
    stages: generateStagesForBatch("H-002", 700, "2024-10-08"),
  },
  {
    id: "H-003",
    productCode: "N210",
    totalQty: 500,
    completionDate: "2024-12-10",
    startDate: "2024-11-25",
    status: "Completed",
    totalCost: 1200000,
    stages: generateStagesForBatch("H-003", 500, "2024-10-05"),
  },
  {
    id: "H-004",
    productCode: "N330",
    totalQty: 300,
    completionDate: "2024-12-08",
    startDate: "2024-11-22",
    status: "Cancelled",
    totalCost: 800000,
    stages: generateStagesForBatch("H-004", 300, "2024-10-03"),
  },
  {
    id: "H-005",
    productCode: "N442",
    totalQty: 250,
    completionDate: "2024-12-05",
    startDate: "2024-11-20",
    status: "Completed",
    totalCost: 650000,
    stages: generateStagesForBatch("H-005", 250, "2024-10-01"),
  },
  {
    id: "H-006",
    productCode: "N512",
    totalQty: 200,
    completionDate: "2024-10-08",
    startDate: "2024-09-28",
    status: "Returned",
    totalCost: 550000,
    stages: generateStagesForBatch("H-006", 200, "2024-09-28"),
  },
  {
    id: "H-007",
    productCode: "N001",
    totalQty: 800,
    completionDate: "2024-10-07",
    startDate: "2024-09-25",
    status: "Completed",
    totalCost: 2000000,
    stages: generateStagesForBatch("H-007", 800, "2024-09-25"),
  },
  {
    id: "H-008",
    productCode: "N114",
    totalQty: 600,
    completionDate: "2024-10-05",
    startDate: "2024-09-22",
    status: "Completed",
    totalCost: 1500000,
    stages: generateStagesForBatch("H-008", 600, "2024-09-22"),
  },
  {
    id: "H-009",
    productCode: "N210",
    totalQty: 400,
    completionDate: "2024-10-03",
    startDate: "2024-09-20",
    status: "Completed",
    totalCost: 1000000,
    stages: generateStagesForBatch("H-009", 400, "2024-09-20"),
  },
  {
    id: "H-010",
    productCode: "N330",
    totalQty: 350,
    completionDate: "2024-10-01",
    startDate: "2024-09-18",
    status: "Completed",
    totalCost: 900000,
    stages: generateStagesForBatch("H-010", 350, "2024-09-18"),
  },
];

export const productCodes = ["N001", "N114", "N210", "N330", "N442", "N512", "N601", "N702", "N803", "N904"];

export const factories = [
  "Kho nguyên liệu",
  "Xưởng Cắt Laser",
  "Xưởng Cắt Vải",
  "Xưởng Dán Vải",
  "Xưởng In Thêu",
  "Xưởng May Vành",
  "Xưởng May Chóp",
  "Xưởng Đính Nút",
  "Xưởng May Vắt Sổ",
  "Xưởng Lắp Ráp",
  "Xưởng Ủi",
  "Xưởng May Dây Kéo",
  "Xưởng May Nhãn",
  "Xưởng Hoàn Thiện",
  "Xưởng Đóng Gói",
];

export const sortOptions = [
  { label: "Mới nhất", value: "date-desc" },
  { label: "Cũ nhất", value: "date-asc" },
  { label: "Số lượng cao nhất", value: "quantity-desc" },
  { label: "Số lượng thấp nhất", value: "quantity-asc" },
  { label: "Thời gian nhanh nhất", value: "duration-asc" },
  { label: "Thời gian chậm nhất", value: "duration-desc" },
  { label: "Giá trị cao nhất", value: "cost-desc" },
  { label: "Giá trị thấp nhất", value: "cost-asc" },
];
