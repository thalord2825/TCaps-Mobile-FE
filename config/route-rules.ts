/**
 * TCaps Mobile - Role-Based Routing Configuration
 *
 * This file defines the routing rules and permissions for different user roles
 * in the TCaps Mobile hat production management system.
 */

export type UserRole = "Admin" | "Lead" | "QC" | "Staff";

export interface TabConfig {
  name: string;
  title: string;
  icon: string;
  allowedRoles: UserRole[];
  requiresAuth: boolean;
}

export interface ScreenConfig {
  path: string;
  title: string;
  allowedRoles: UserRole[];
  requiresAuth: boolean;
  parentTab?: string;
}

export interface RoleConfig {
  role: UserRole;
  displayName: string;
  description: string;
  allowedTabs: string[];
  allowedScreens: string[];
  hierarchy: number; // Higher number = more permissions
}

// Role hierarchy: Admin (4) > Lead (3) > QC (2) > Staff (1)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  Admin: 4,
  Lead: 3,
  QC: 2,
  Staff: 1,
};

// Tab configurations for the bottom navigation
export const TAB_CONFIGS: Record<string, TabConfig> = {
  home: {
    name: "index",
    title: "Trang chủ",
    icon: "home",
    allowedRoles: ["Admin", "Lead", "QC", "Staff"],
    requiresAuth: true,
  },
  history: {
    name: "history",
    title: "Lịch sử",
    icon: "history",
    allowedRoles: ["Admin", "Lead", "QC", "Staff"],
    requiresAuth: true,
  },
  inventory: {
    name: "inventory",
    title: "Kho nguyên liệu",
    icon: "cubes",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
  request: {
    name: "request",
    title: "Yêu cầu",
    icon: "paper-plane",
    allowedRoles: ["Admin", "Lead", "QC"],
    requiresAuth: true,
  },
  quality: {
    name: "quality",
    title: "Kiểm tra chất lượng",
    icon: "check-circle",
    allowedRoles: ["Admin", "Lead", "QC"],
    requiresAuth: true,
  },
  profile: {
    name: "profile",
    title: "Hồ sơ",
    icon: "user",
    allowedRoles: ["Admin", "Lead", "QC", "Staff"],
    requiresAuth: true,
  },
  workManage: {
    name: "work-manage",
    title: "Quản lý công việc",
    icon: "briefcase",
    allowedRoles: ["Staff"],
    requiresAuth: true,
  },
};

// Screen configurations for direct navigation
export const SCREEN_CONFIGS: Record<string, ScreenConfig> = {
  // Batch screens
  "batch.detail": {
    path: "/batch/[id]",
    title: "Chi tiết lô hàng",
    allowedRoles: ["Admin", "Lead", "QC", "Staff"],
    requiresAuth: true,
  },
  "batch.create": {
    path: "/batch/create",
    title: "Tạo lô hàng mới",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },

  // Quality check screens
  "quality.check": {
    path: "/quality-check/[batchId]",
    title: "Kiểm tra chất lượng",
    allowedRoles: ["Admin", "Lead", "QC"],
    requiresAuth: true,
  },

  // Material screens
  "material.detail": {
    path: "/material/[id]",
    title: "Chi tiết nguyên liệu",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
  "material.add": {
    path: "/material/add",
    title: "Thêm nguyên liệu",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
  supplier: {
    path: "/supplier",
    title: "Nhà cung cấp",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },

  // Request screens
  "request.detail": {
    path: "/request/[id]",
    title: "Chi tiết yêu cầu",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
  "request.create": {
    path: "/request/create",
    title: "Tạo yêu cầu mới",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
  "request.distribution": {
    path: "/request/[id]/distribution",
    title: "Phân phối vật liệu",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },

  // Performance screens
  performance: {
    path: "/performance",
    title: "Báo cáo hiệu suất",
    allowedRoles: ["Admin", "Lead"],
    requiresAuth: true,
  },
};

// Role configurations
export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  Admin: {
    role: "Admin",
    displayName: "Quản trị viên",
    description: "Full system access with all permissions",
    allowedTabs: ["home", "history", "inventory", "request", "quality", "profile"],
    allowedScreens: Object.keys(SCREEN_CONFIGS),
    hierarchy: 4,
  },
  Lead: {
    role: "Lead",
    displayName: "Trưởng nhóm",
    description: "Multi-factory management with team oversight",
    allowedTabs: ["home", "history", "inventory", "request", "quality", "profile"],
    allowedScreens: Object.keys(SCREEN_CONFIGS).filter(
      (screen) => !screen.includes("create") || screen.includes("batch.create")
    ),
    hierarchy: 3,
  },
  QC: {
    role: "QC",
    displayName: "Kiểm soát chất lượng",
    description: "Quality control and inspection management",
    allowedTabs: ["home", "history", "request", "quality", "profile"],
    allowedScreens: ["batch.detail", "quality.check"],
    hierarchy: 2,
  },
  Staff: {
    role: "Staff",
    displayName: "Nhân viên",
    description: "Production worker with limited access",
    allowedTabs: ["home", "workManage", "profile"],
    allowedScreens: ["batch.detail", "quality.check"],
    hierarchy: 1,
  },
};

// Helper functions for role-based access control
export function canAccessTab(role: UserRole, tabName: string): boolean {
  const tabConfig = TAB_CONFIGS[tabName];
  if (!tabConfig) return false;
  return tabConfig.allowedRoles.includes(role);
}

export function canAccessScreen(role: UserRole, screenKey: string): boolean {
  const screenConfig = SCREEN_CONFIGS[screenKey];
  if (!screenConfig) return false;
  return screenConfig.allowedRoles.includes(role);
}

export function getAllowedTabs(role: UserRole): string[] {
  const roleConfig = ROLE_CONFIGS[role];
  return roleConfig?.allowedTabs || [];
}

export function getAllowedScreens(role: UserRole): string[] {
  const roleConfig = ROLE_CONFIGS[role];
  return roleConfig?.allowedScreens || [];
}

export function hasHigherOrEqualRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function getRoleDisplayName(role: UserRole): string {
  return ROLE_CONFIGS[role]?.displayName || role;
}

export function getRoleDescription(role: UserRole): string {
  return ROLE_CONFIGS[role]?.description || "";
}

// Navigation helpers
export function getDefaultTabForRole(role: UserRole): string {
  const allowedTabs = getAllowedTabs(role);
  return allowedTabs[0] || "home";
}

export function getTabIcon(tabName: string): string {
  return TAB_CONFIGS[tabName]?.icon || "circle";
}

export function getTabTitle(tabName: string): string {
  return TAB_CONFIGS[tabName]?.title || tabName;
}

// Validation helpers
export function validateRole(role: string): role is UserRole {
  return Object.keys(ROLE_CONFIGS).includes(role);
}

export function validateTabName(tabName: string): boolean {
  return Object.keys(TAB_CONFIGS).includes(tabName);
}

export function validateScreenKey(screenKey: string): boolean {
  return Object.keys(SCREEN_CONFIGS).includes(screenKey);
}
