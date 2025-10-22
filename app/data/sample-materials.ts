export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  minThreshold: number;
  lastUpdated: string;
}

export const sampleMaterials: MaterialItem[] = [
  {
    id: "M-001",
    name: "Vải Cotton Trắng",
    category: "Vải Cotton",
    quantity: 250,
    unit: "mét",
    costPerUnit: 45000,
    supplier: "Công ty TNHH Vải Việt",
    minThreshold: 100,
    lastUpdated: "15/10/2024",
  },
  {
    id: "M-002",
    name: "Vải Polyester Đen",
    category: "Vải Polyester",
    quantity: 180,
    unit: "mét",
    costPerUnit: 38000,
    supplier: "Công ty TNHH Vải Việt",
    minThreshold: 150,
    lastUpdated: "14/10/2024",
  },
  {
    id: "M-003",
    name: "Chỉ Nylon Trắng",
    category: "Chỉ Nylon",
    quantity: 45,
    unit: "cuộn",
    costPerUnit: 12000,
    supplier: "Công ty CP Chỉ May",
    minThreshold: 50,
    lastUpdated: "16/10/2024",
  },
  {
    id: "M-004",
    name: "Chỉ Thêu Đỏ",
    category: "Chỉ Thêu",
    quantity: 0,
    unit: "cuộn",
    costPerUnit: 25000,
    supplier: "Công ty CP Chỉ May",
    minThreshold: 20,
    lastUpdated: "10/10/2024",
  },
  {
    id: "M-005",
    name: "Keo Công Nghiệp",
    category: "Keo Công Nghiệp",
    quantity: 8,
    unit: "kg",
    costPerUnit: 85000,
    supplier: "Công ty TNHH Hóa Chất",
    minThreshold: 15,
    lastUpdated: "13/10/2024",
  },
  {
    id: "M-006",
    name: "Nhãn Vải TCaps",
    category: "Nhãn Vải",
    quantity: 1200,
    unit: "cái",
    costPerUnit: 500,
    supplier: "Công ty TNHH In Ấn",
    minThreshold: 500,
    lastUpdated: "16/10/2024",
  },
  {
    id: "M-007",
    name: "Nút Bấm Nhựa",
    category: "Nút Bấm",
    quantity: 3000,
    unit: "cái",
    costPerUnit: 150,
    supplier: "Công ty TNHH Phụ Liệu",
    minThreshold: 1000,
    lastUpdated: "15/10/2024",
  },
  {
    id: "M-008",
    name: "Dây Kéo 20cm",
    category: "Dây Kéo",
    quantity: 25,
    unit: "cái",
    costPerUnit: 8000,
    supplier: "Công ty TNHH Phụ Liệu",
    minThreshold: 50,
    lastUpdated: "12/10/2024",
  },
  {
    id: "M-009",
    name: "Vải Cotton Xanh",
    category: "Vải Cotton",
    quantity: 320,
    unit: "mét",
    costPerUnit: 45000,
    supplier: "Công ty TNHH Vải Việt",
    minThreshold: 100,
    lastUpdated: "16/10/2024",
  },
  {
    id: "M-010",
    name: "Chỉ Nylon Đen",
    category: "Chỉ Nylon",
    quantity: 12,
    unit: "cuộn",
    costPerUnit: 12000,
    supplier: "Công ty CP Chỉ May",
    minThreshold: 50,
    lastUpdated: "11/10/2024",
  },
];

export const materialCategories = [
  "Tất cả",
  "Vải Cotton",
  "Vải Polyester",
  "Chỉ Nylon",
  "Chỉ Thêu",
  "Keo Công Nghiệp",
  "Nhãn Vải",
  "Nút Bấm",
  "Dây Kéo",
];

export const sortOptions = [
  { label: "Tên A-Z", value: "name-asc" },
  { label: "Tên Z-A", value: "name-desc" },
  { label: "Số lượng ít nhất", value: "quantity-asc" },
  { label: "Số lượng nhiều nhất", value: "quantity-desc" },
  { label: "Ngày gần nhất", value: "date-desc" },
  { label: "Ngày cũ nhất", value: "date-asc" },
];

