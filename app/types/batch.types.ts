// Batch types for Admin management
export interface BatchManagementItem {
  id: string;
  productId: string;
  productCode: string;
  code: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: "InProgress" | "QCPending" | "Completed";
  createdAt: string;
  updatedAt: string;
}

export interface BatchCreateInput {
  productId: string;
  code: string;
  quantity: number;
  startDate: string;
  endDate: string;
}

export interface BatchUpdateInput {
  id: string;
  quantity?: number;
  startDate?: string;
  endDate?: string;
}

export interface BatchDeleteInput {
  id: string;
}

