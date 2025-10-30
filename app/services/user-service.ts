import { sampleUsers } from "../data/sample-users";
import { ApiResponse } from "../types/api-response.types";
import {
  StaffPerformance,
  StaffPerformanceFilter,
  UserCreateInput,
  UserCreateResponse,
  UserDeleteInput,
} from "../types/user.types";

// Helper to generate ID
function generateId(): string {
  return (sampleUsers.length + 1).toString();
}

// Mock API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  async createUser(input: UserCreateInput): Promise<ApiResponse<UserCreateResponse>> {
    await delay(600);

    // Validate password match
    if (input.password !== input.passwordConfirm) {
      return {
        success: false,
        error: "Passwords do not match",
      };
    }

    // Check if email already exists
    const existingUser = sampleUsers.find((u) => u.email === input.email);
    if (existingUser) {
      return {
        success: false,
        error: "Email already exists",
      };
    }

    const userId = generateId();
    const newUser = {
      id: userId,
      name: input.fullName.toUpperCase(),
      role: input.role,
      email: input.email,
      phone: input.phone,
      status: "active" as const,
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString(),
      performance: {
        rating: 0,
        completedTasks: 0,
        totalEarnings: 0,
        qualityScore: 0,
      },
      factory: input.workshopId,
    };

    return {
      success: true,
      data: {
        id: userId,
        user: newUser as any,
      },
      message: "User created successfully",
    };
  },

  async deleteUser(input: UserDeleteInput): Promise<ApiResponse<void>> {
    await delay(500);
    const user = sampleUsers.find((u) => u.id === input.id);

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      message: "User deleted successfully",
    };
  },

  async getStaffPerformance(filter?: StaffPerformanceFilter): Promise<ApiResponse<StaffPerformance[]>> {
    await delay(500);
    let staff = sampleUsers.filter((u) => u.role === "Staff");

    if (filter?.workshopId) {
      staff = staff.filter((s) => s.factory === filter.workshopId);
    }

    const performance: StaffPerformance[] = staff.map((user) => ({
      userId: user.id,
      fullName: user.name,
      role: user.role,
      totalIncome: user.performance.totalEarnings,
      totalQuantity: user.performance.completedTasks,
      workshopId: user.factory,
      workshopName: user.factory,
    }));

    return {
      success: true,
      data: performance,
    };
  },
};

