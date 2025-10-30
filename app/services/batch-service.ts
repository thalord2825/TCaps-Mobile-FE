import { sampleBatches } from "../data/sample-batches";
import { getProductByCode } from "../data/sample-products";
import { ApiResponse } from "../types/api-response.types";
import { BatchCreateInput, BatchManagementItem, BatchUpdateInput } from "../types/batch.types";

// Helper to generate ID
function generateId(): string {
  return `B-${Date.now().toString().slice(-6)}`;
}

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Convert existing BatchItem to BatchManagementItem
function convertBatchItem(item: any): BatchManagementItem {
  return {
    id: item.id,
    productId: `prod-${item.productCode}`,
    productCode: item.productCode,
    code: item.id,
    quantity: item.totalQty,
    startDate: item.startDate,
    endDate: item.deadline || new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
    status: item.status,
    createdAt: item.startDate,
    updatedAt: new Date().toISOString(),
  };
}

export const batchService = {
  async getAllBatches(): Promise<ApiResponse<BatchManagementItem[]>> {
    await delay(500);
    const batches = sampleBatches.map(convertBatchItem);
    return {
      success: true,
      data: batches,
    };
  },

  async getBatchById(id: string): Promise<ApiResponse<BatchManagementItem>> {
    await delay(400);
    const batch = sampleBatches.find((b) => b.id === id);
    if (!batch) {
      return {
        success: false,
        error: "Batch not found",
      };
    }
    return {
      success: true,
      data: convertBatchItem(batch),
    };
  },

  async createBatch(input: BatchCreateInput): Promise<ApiResponse<string>> {
    await delay(600);

    // Validate product exists
    const product = getProductByCode(input.code);
    if (!product) {
      return {
        success: false,
        error: "Product not found",
      };
    }

    // Validate dates
    if (new Date(input.endDate) <= new Date(input.startDate)) {
      return {
        success: false,
        error: "End date must be after start date",
      };
    }

    const batchId = generateId();
    const newBatch: BatchManagementItem = {
      id: batchId,
      productId: input.productId,
      productCode: input.code,
      code: batchId,
      quantity: input.quantity,
      startDate: input.startDate,
      endDate: input.endDate,
      status: "InProgress",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: batchId,
      message: "Batch created successfully",
    };
  },

  async updateBatch(input: BatchUpdateInput): Promise<ApiResponse<string>> {
    await delay(500);

    const batch = sampleBatches.find((b) => b.id === input.id);
    if (!batch) {
      return {
        success: false,
        error: "Batch not found",
      };
    }

    // Validate dates if both provided
    if (input.startDate && input.endDate) {
      if (new Date(input.endDate) <= new Date(input.startDate)) {
        return {
          success: false,
          error: "End date must be after start date",
        };
      }
    }

    return {
      success: true,
      data: input.id,
      message: "Batch updated successfully",
    };
  },

  async deleteBatch(id: string): Promise<ApiResponse<void>> {
    await delay(500);
    const batch = sampleBatches.find((b) => b.id === id);

    if (!batch) {
      return {
        success: false,
        error: "Batch not found",
      };
    }

    return {
      success: true,
      message: "Batch deleted successfully",
    };
  },

  async getBatchesByProductId(productId: string): Promise<ApiResponse<BatchManagementItem[]>> {
    await delay(400);
    const batches = sampleBatches.filter((b) => b.productCode === productId).map(convertBatchItem);
    return {
      success: true,
      data: batches,
    };
  },
};

