export interface MaterialItem {
  materialId: string;
  materialName: string;
  requestedQty: number;
  approvedQty: number;
  unit: string;
  currentStock: number;
  unitPrice: number;
}

export interface CorrectionDetails {
  issueDescription: string;
  images: string[];
  affectedStage: string;
  severity: "low" | "medium" | "high";
}

export interface QualityIssue {
  defectType: string;
  severity: "low" | "medium" | "high" | "critical";
  affectedQuantity: number;
  qcNotes: string;
  standardViolation: string;
}

export interface RequestItem {
  id: string;
  type: "material" | "correction" | "quality" | "urgent";
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "denied";
  requestedBy: {
    name: string;
    id: string;
    avatar: string;
  };
  factory: string;
  batchId?: string;
  createdDate: string;
  dueDate: string;
  respondedDate?: string;
  materials?: MaterialItem[];
  correctionDetails?: CorrectionDetails;
  qualityIssue?: QualityIssue;
  notes: string;
  responseNotes?: string;
  attachments: string[];
}

// Sample data generation
const factories = [
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
  "Kho nguyên liệu",
  "Xưởng Cắt Laser",
];

const staffNames = [
  "Nguyễn Văn An",
  "Trần Thị Bình",
  "Lê Văn Cường",
  "Phạm Thị Dung",
  "Hoàng Văn Em",
  "Vũ Thị Phương",
  "Đặng Văn Giang",
  "Bùi Thị Hoa",
  "Phan Văn Ích",
  "Dương Thị Kim",
  "Ngô Văn Long",
  "Đinh Thị Mai",
];

const materialTypes = [
  { id: "V001", name: "Vải cotton", unit: "mét", price: 25000 },
  { id: "V002", name: "Vải polyester", unit: "mét", price: 18000 },
  { id: "V003", name: "Vải denim", unit: "mét", price: 35000 },
  { id: "C001", name: "Chỉ may", unit: "cuộn", price: 5000 },
  { id: "C002", name: "Chỉ thêu", unit: "cuộn", price: 8000 },
  { id: "K001", name: "Keo dán", unit: "chai", price: 15000 },
  { id: "K002", name: "Keo nóng", unit: "thanh", price: 12000 },
  { id: "N001", name: "Nút bấm", unit: "cái", price: 2000 },
  { id: "N002", name: "Nút cài", unit: "cái", price: 3000 },
  { id: "P001", name: "Phụ kiện kim loại", unit: "bộ", price: 25000 },
  { id: "P002", name: "Dây kéo", unit: "cái", price: 8000 },
  { id: "P003", name: "Nhãn tag", unit: "cái", price: 1000 },
];

const batchIds = ["H-001", "H-002", "H-003", "H-004", "H-005", "H-006", "H-007", "H-008"];

function generateRandomDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

function generateRandomTime(hoursAgo: number): string {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date.toISOString();
}

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateMaterialRequest(): RequestItem {
  const materialsCount = Math.floor(Math.random() * 6) + 1; // 1-6 materials
  const materials: MaterialItem[] = [];

  for (let i = 0; i < materialsCount; i++) {
    const material = getRandomElement(materialTypes);
    const requestedQty = Math.floor(Math.random() * 100) + 20; // Increased quantities
    const currentStock = Math.floor(Math.random() * 500) + 100; // More realistic stock levels
    const approvedQty = Math.random() > 0.2 ? requestedQty : Math.floor(requestedQty * 0.7);

    materials.push({
      materialId: material.id,
      materialName: material.name,
      requestedQty,
      approvedQty,
      unit: material.unit,
      currentStock,
      unitPrice: material.price,
    });
  }

  const createdDate = generateRandomTime(Math.floor(Math.random() * 72)); // Last 72 hours
  const dueDate = generateRandomDate(Math.floor(Math.random() * 10)); // Next 10 days
  const isNew = new Date(createdDate).getTime() > Date.now() - 60 * 60 * 1000; // < 1 hour
  const isUrgent = Math.random() > 0.8; // 20% chance of urgent

  return {
    id: `R-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`,
    type: "material",
    priority: isNew || isUrgent ? "urgent" : getRandomElement(["low", "medium", "high"]),
    status: getRandomElement(["pending", "approved", "denied"]),
    requestedBy: {
      name: getRandomElement(staffNames),
      id: `S${Math.floor(Math.random() * 999) + 1}`,
      avatar: getRandomElement(staffNames).charAt(0),
    },
    factory: getRandomElement(factories),
    batchId: Math.random() > 0.2 ? getRandomElement(batchIds) : undefined,
    createdDate,
    dueDate,
    respondedDate: Math.random() > 0.3 ? generateRandomTime(Math.floor(Math.random() * 48)) : undefined,
    materials,
    notes: getRandomElement([
      "Cần gấp cho lô sản xuất",
      "Vật liệu chuẩn bị hết",
      "Cần bổ sung nguyên liệu cho dây chuyền",
      "Thiếu vật liệu cho đơn hàng khách",
      "Cần thay thế vật liệu bị lỗi",
      "Chuẩn bị cho lô sản xuất mới",
    ]),
    responseNotes:
      Math.random() > 0.5
        ? getRandomElement([
            "Đã phân phối đầy đủ",
            "Đang xử lý yêu cầu",
            "Cần xác nhận thêm từ kho",
            "Đã gửi yêu cầu mua hàng",
          ])
        : undefined,
    attachments: Math.random() > 0.7 ? ["material_photo.jpg", "invoice.pdf"] : [],
  };
}

function generateCorrectionRequest(): RequestItem {
  const createdDate = generateRandomTime(Math.floor(Math.random() * 72)); // Last 72 hours
  const dueDate = generateRandomDate(Math.floor(Math.random() * 5)); // Next 5 days

  return {
    id: `R-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`,
    type: "correction",
    priority: getRandomElement(["medium", "high", "urgent"]),
    status: getRandomElement(["pending", "approved", "denied"]),
    requestedBy: {
      name: getRandomElement(staffNames),
      id: `S${Math.floor(Math.random() * 999) + 1}`,
      avatar: getRandomElement(staffNames).charAt(0),
    },
    factory: getRandomElement(factories),
    batchId: getRandomElement(batchIds),
    createdDate,
    dueDate,
    respondedDate: Math.random() > 0.5 ? generateRandomTime(Math.floor(Math.random() * 48)) : undefined,
    correctionDetails: {
      issueDescription: getRandomElement([
        "Đường may không đều, cần may lại",
        "Kích thước không đúng chuẩn",
        "Màu sắc không đúng với mẫu",
        "Chất lượng vải có vấn đề",
        "Lỗi trong quá trình cắt",
      ]),
      images: Math.random() > 0.5 ? ["defect1.jpg", "defect2.jpg"] : [],
      affectedStage: getRandomElement(["Cắt vải", "May vành", "May chóp", "Lắp ráp", "Ủi"]),
      severity: getRandomElement(["low", "medium", "high"]),
    },
    notes: "Cần kiểm tra và sửa chữa ngay",
    responseNotes: Math.random() > 0.6 ? "Đã xác nhận lỗi, yêu cầu làm lại" : undefined,
    attachments: ["correction1.jpg", "correction2.jpg"],
  };
}

function generateQualityRequest(): RequestItem {
  const createdDate = generateRandomTime(Math.floor(Math.random() * 96)); // Last 96 hours
  const dueDate = generateRandomDate(Math.floor(Math.random() * 3)); // Next 3 days

  return {
    id: `R-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`,
    type: "quality",
    priority: getRandomElement(["medium", "high", "urgent"]),
    status: getRandomElement(["pending", "approved", "denied"]),
    requestedBy: {
      name: getRandomElement(staffNames),
      id: `S${Math.floor(Math.random() * 999) + 1}`,
      avatar: getRandomElement(staffNames).charAt(0),
    },
    factory: getRandomElement(factories),
    batchId: getRandomElement(batchIds),
    createdDate,
    dueDate,
    respondedDate: Math.random() > 0.4 ? generateRandomTime(Math.floor(Math.random() * 72)) : undefined,
    qualityIssue: {
      defectType: getRandomElement([
        "Lỗi đường may",
        "Màu sắc không đúng",
        "Kích thước sai",
        "Chất lượng vải kém",
        "Thiếu phụ kiện",
      ]),
      severity: getRandomElement(["low", "medium", "high", "critical"]),
      affectedQuantity: Math.floor(Math.random() * 100) + 10,
      qcNotes: "Không đạt tiêu chuẩn chất lượng",
      standardViolation: "TCVN 1234-2020",
    },
    notes: "Cần kiểm tra lại toàn bộ lô hàng",
    responseNotes: Math.random() > 0.5 ? "Đã kiểm tra, chấp nhận" : undefined,
    attachments: ["quality1.jpg"],
  };
}

function generateUrgentRequest(): RequestItem {
  const createdDate = generateRandomTime(Math.floor(Math.random() * 12)); // Last 12 hours
  const dueDate = generateRandomDate(1); // Tomorrow

  return {
    id: `R-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, "0")}`,
    type: "urgent",
    priority: "urgent",
    status: getRandomElement(["pending", "approved"]),
    requestedBy: {
      name: getRandomElement(staffNames),
      id: `S${Math.floor(Math.random() * 999) + 1}`,
      avatar: getRandomElement(staffNames).charAt(0),
    },
    factory: getRandomElement(factories),
    batchId: getRandomElement(batchIds),
    createdDate,
    dueDate,
    respondedDate: Math.random() > 0.3 ? generateRandomTime(Math.floor(Math.random() * 6)) : undefined,
    notes: getRandomElement([
      "Máy cắt bị hỏng, cần sửa chữa ngay",
      "Hết nguyên liệu, cần bổ sung gấp",
      "Có vấn đề về chất lượng, dừng sản xuất",
      "Cần hỗ trợ kỹ thuật khẩn cấp",
    ]),
    responseNotes: Math.random() > 0.4 ? "Đã xử lý khẩn cấp" : undefined,
    attachments: [],
  };
}

// Generate sample requests
export const sampleRequests: RequestItem[] = [
  // 60% material requests (15 requests)
  ...Array.from({ length: 15 }, generateMaterialRequest),
  // 20% correction requests (5 requests)
  ...Array.from({ length: 5 }, generateCorrectionRequest),
  // 15% quality requests (4 requests)
  ...Array.from({ length: 4 }, generateQualityRequest),
  // 5% urgent requests (1 request)
  ...Array.from({ length: 1 }, generateUrgentRequest),
];

// Export constants for filters
export const requestTypes = [
  { label: "Tất cả", value: "all", icon: "list" },
  { label: "Vật liệu", value: "material", icon: "cube" },
  { label: "Sửa chữa", value: "correction", icon: "wrench" },
  { label: "Chất lượng", value: "quality", icon: "shield" },
  { label: "Khẩn cấp", value: "urgent", icon: "bell" },
];

export const statusOptions = [
  { label: "Tất cả", value: "all", color: "#6b7280" },
  { label: "Chờ duyệt", value: "pending", color: "#f59e0b" },
  { label: "Đã duyệt", value: "approved", color: "#10b981" },
  { label: "Từ chối", value: "denied", color: "#ef4444" },
];

export const priorityOptions = [
  { label: "Tất cả", value: "all", color: "#6b7280" },
  { label: "Khẩn cấp", value: "urgent", color: "#ef4444" },
  { label: "Cao", value: "high", color: "#f59e0b" },
  { label: "Trung bình", value: "medium", color: "#3b82f6" },
  { label: "Thấp", value: "low", color: "#10b981" },
];

export const sortOptions = [
  { label: "Ngày tạo (mới nhất)", value: "date-desc" },
  { label: "Ngày tạo (cũ nhất)", value: "date-asc" },
  { label: "Ưu tiên (cao nhất)", value: "priority-desc" },
  { label: "Ưu tiên (thấp nhất)", value: "priority-asc" },
  { label: "Hạn xử lý (gần nhất)", value: "due-desc" },
  { label: "Hạn xử lý (xa nhất)", value: "due-asc" },
  { label: "Xưởng (A-Z)", value: "factory-asc" },
  { label: "Xưởng (Z-A)", value: "factory-desc" },
];

export const materialCategories = [
  { label: "Tất cả", value: "all" },
  { label: "Vải", value: "fabric" },
  { label: "Chỉ", value: "thread" },
  { label: "Keo", value: "glue" },
  { label: "Phụ kiện", value: "accessories" },
];

export { factories };
