import { sampleBatches } from "../data/sample-batches";
import { ApiResponse } from "../types/api-response.types";

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface DashboardFilterInput {
  productId: string;
  day?: number;
  month?: number;
}

interface DashboardStats {
  totalBatches: number;
  inProgressBatches: number;
  completedBatches: number;
  qcPendingBatches: number;
}

interface ProcessDetail {
  workshopId: string;
  workshopName: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: string;
}

interface DashboardBatchResult {
  id: string;
  code: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: string;
  progressPercent: number;
  processes: ProcessDetail[];
}

export const dashboardService = {
  async getDashboardData(input: DashboardFilterInput): Promise<
    ApiResponse<{
      stats: DashboardStats;
      batches: DashboardBatchResult[];
    }>
  > {
    await delay(500);

    // Filter batches by product code
    let filteredBatches = sampleBatches.filter((b) => b.productCode === input.productId);

    // Filter by date if provided
    if (input.day && input.month) {
      filteredBatches = filteredBatches.filter((batch) => {
        const batchStart = new Date(batch.startDate);
        const batchEnd = batch.deadline ? new Date(batch.deadline) : null;

        // Check if the provided day and month fall within the batch date range
        const dateMatchesStart = batchStart.getDate() === input.day && batchStart.getMonth() + 1 === input.month;
        const dateMatchesEnd = batchEnd && batchEnd.getDate() === input.day && batchEnd.getMonth() + 1 === input.month;

        if (dateMatchesStart || dateMatchesEnd) return true;

        // Check if the provided date is within the batch date range
        if (batchEnd) {
          const filterDate = new Date(batchStart.getFullYear(), input.month - 1, input.day);
          return filterDate >= batchStart && filterDate <= batchEnd;
        }

        return false;
      });
    }

    // Calculate stats
    const stats: DashboardStats = {
      totalBatches: filteredBatches.length,
      inProgressBatches: filteredBatches.filter((b) => b.status === "InProgress").length,
      completedBatches: filteredBatches.filter((b) => b.status === "Completed").length,
      qcPendingBatches: filteredBatches.filter((b) => b.status === "QCPending").length,
    };

    // Calculate batch results with progress
    const batches: DashboardBatchResult[] = filteredBatches.map((batch) => {
      const totalStages = 17; // Total stages in hat production
      const completedStages = batch.stages.filter((s) => s.qcStatus === "Pass").length;
      const progressPercent = Math.round((completedStages / totalStages) * 100);

      const processes: ProcessDetail[] = batch.stages.map((stage) => ({
        workshopId: stage.factory,
        workshopName: stage.factory,
        quantity: stage.quantity,
        startDate: stage.startDate,
        endDate: stage.endDate,
        status: stage.qcStatus,
      }));

      return {
        id: batch.id,
        code: batch.id,
        quantity: batch.totalQty,
        startDate: batch.startDate,
        endDate: batch.deadline || batch.startDate,
        status: batch.status,
        progressPercent,
        processes,
      };
    });

    return {
      success: true,
      data: {
        stats,
        batches,
      },
    };
  },
};

