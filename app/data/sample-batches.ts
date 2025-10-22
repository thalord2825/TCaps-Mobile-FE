export interface BatchItem {
  id: string;
  productCode: string;
  factory: string;
  stage: string;
  doneQty: number;
  totalQty: number;
  status: "InProgress" | "QCPending" | "Completed";
}

export const sampleBatches: BatchItem[] = [
  {
    id: "B-001",
    productCode: "N001",
    factory: "Xưởng Cắt Vải",
    stage: "Cắt vải",
    doneQty: 320,
    totalQty: 1000,
    status: "InProgress",
  },
  {
    id: "B-002",
    productCode: "N114",
    factory: "Xưởng Thêu",
    stage: "Thêu logo",
    doneQty: 700,
    totalQty: 700,
    status: "Completed",
  },
  {
    id: "B-003",
    productCode: "N210",
    factory: "Xưởng In",
    stage: "In lụa",
    doneQty: 150,
    totalQty: 500,
    status: "InProgress",
  },
  {
    id: "B-004",
    productCode: "N330",
    factory: "Xưởng May Vành",
    stage: "May vành",
    doneQty: 80,
    totalQty: 300,
    status: "QCPending",
  },
  {
    id: "B-005",
    productCode: "N442",
    factory: "Xưởng Đính Nút",
    stage: "Gắn nút",
    doneQty: 50,
    totalQty: 250,
    status: "InProgress",
  },
  {
    id: "B-006",
    productCode: "N512",
    factory: "Xưởng Ủi",
    stage: "Ủi và đóng gói",
    doneQty: 40,
    totalQty: 200,
    status: "InProgress",
  },
];








