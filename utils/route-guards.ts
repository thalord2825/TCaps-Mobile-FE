/**
 * TCaps Mobile - Route Guards and Permission Utilities
 *
 * This file provides utilities for checking user permissions and route access
 * in the TCaps Mobile hat production management system.
 */

import { canAccessScreen, canAccessTab, hasHigherOrEqualRole, UserRole } from "../config/route-rules";

export interface PermissionCheck {
  hasAccess: boolean;
  reason?: string;
  redirectTo?: string;
}

export interface RouteGuardOptions {
  requireAuth?: boolean;
  requiredRole?: UserRole;
  requiredPermissions?: string[];
  fallbackRoute?: string;
}

/**
 * Check if a user can access a specific tab
 */
export function checkTabAccess(role: UserRole, tabName: string): PermissionCheck {
  if (!role) {
    return {
      hasAccess: false,
      reason: "User not authenticated",
      redirectTo: "/login",
    };
  }

  const hasAccess = canAccessTab(role, tabName);

  if (!hasAccess) {
    return {
      hasAccess: false,
      reason: `Role '${role}' does not have access to tab '${tabName}'`,
      redirectTo: getDefaultTabForRole(role),
    };
  }

  return { hasAccess: true };
}

/**
 * Check if a user can access a specific screen
 */
export function checkScreenAccess(role: UserRole, screenKey: string): PermissionCheck {
  if (!role) {
    return {
      hasAccess: false,
      reason: "User not authenticated",
      redirectTo: "/login",
    };
  }

  const hasAccess = canAccessScreen(role, screenKey);

  if (!hasAccess) {
    return {
      hasAccess: false,
      reason: `Role '${role}' does not have access to screen '${screenKey}'`,
      redirectTo: getDefaultTabForRole(role),
    };
  }

  return { hasAccess: true };
}

/**
 * Check if a user has the required role or higher
 */
export function checkRoleAccess(userRole: UserRole, requiredRole: UserRole): PermissionCheck {
  if (!userRole) {
    return {
      hasAccess: false,
      reason: "User not authenticated",
      redirectTo: "/login",
    };
  }

  const hasAccess = hasHigherOrEqualRole(userRole, requiredRole);

  if (!hasAccess) {
    return {
      hasAccess: false,
      reason: `User role '${userRole}' is insufficient. Required: '${requiredRole}' or higher`,
      redirectTo: getDefaultTabForRole(userRole),
    };
  }

  return { hasAccess: true };
}

/**
 * Check if a user has specific permissions
 */
export function checkPermissionAccess(role: UserRole, permissions: string[]): PermissionCheck {
  if (!role) {
    return {
      hasAccess: false,
      reason: "User not authenticated",
      redirectTo: "/login",
    };
  }

  // Map permissions to role capabilities
  const rolePermissions = getRolePermissions(role);
  const hasAllPermissions = permissions.every((permission) => rolePermissions.includes(permission));

  if (!hasAllPermissions) {
    const missingPermissions = permissions.filter((p) => !rolePermissions.includes(p));
    return {
      hasAccess: false,
      reason: `Missing permissions: ${missingPermissions.join(", ")}`,
      redirectTo: getDefaultTabForRole(role),
    };
  }

  return { hasAccess: true };
}

/**
 * Comprehensive route guard that checks multiple conditions
 */
export function guardRoute(role: UserRole, resource: string, options: RouteGuardOptions = {}): PermissionCheck {
  const { requireAuth = true, requiredRole, requiredPermissions = [], fallbackRoute } = options;

  // Check authentication
  if (requireAuth && !role) {
    return {
      hasAccess: false,
      reason: "Authentication required",
      redirectTo: "/login",
    };
  }

  // Check role requirement
  if (requiredRole) {
    const roleCheck = checkRoleAccess(role, requiredRole);
    if (!roleCheck.hasAccess) {
      return {
        ...roleCheck,
        redirectTo: fallbackRoute || roleCheck.redirectTo,
      };
    }
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const permissionCheck = checkPermissionAccess(role, requiredPermissions);
    if (!permissionCheck.hasAccess) {
      return {
        ...permissionCheck,
        redirectTo: fallbackRoute || permissionCheck.redirectTo,
      };
    }
  }

  // Check tab/screen access
  const isTab = !resource.includes(".");
  if (isTab) {
    return checkTabAccess(role, resource);
  } else {
    return checkScreenAccess(role, resource);
  }
}

/**
 * Get permissions available to a specific role
 */
export function getRolePermissions(role: UserRole): string[] {
  const basePermissions = ["view_profile", "edit_profile"];

  const rolePermissions: Record<UserRole, string[]> = {
    Staff: [...basePermissions, "view_batches", "view_history", "submit_production", "request_materials"],
    QC: [
      ...basePermissions,
      "view_batches",
      "view_history",
      "quality_inspection",
      "approve_batches",
      "reject_batches",
      "view_quality_reports",
    ],
    Lead: [
      ...basePermissions,
      "view_batches",
      "view_history",
      "manage_inventory",
      "manage_requests",
      "approve_requests",
      "distribute_materials",
      "view_team_performance",
      "create_batches",
    ],
    Admin: [
      ...basePermissions,
      "view_batches",
      "view_history",
      "manage_inventory",
      "manage_requests",
      "manage_users",
      "system_settings",
      "view_analytics",
      "create_batches",
      "delete_batches",
      "manage_roles",
    ],
  };

  return rolePermissions[role] || [];
}

/**
 * Get the default tab for a role when access is denied
 */
export function getDefaultTabForRole(role: UserRole): string {
  const defaultTabs: Record<UserRole, string> = {
    Staff: "home",
    QC: "home",
    Lead: "home",
    Admin: "home",
  };

  return defaultTabs[role] || "home";
}

/**
 * Check if a user can perform a specific action
 */
export function canPerformAction(role: UserRole, action: string): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(action);
}

/**
 * Get all available actions for a role
 */
export function getAvailableActions(role: UserRole): string[] {
  return getRolePermissions(role);
}

/**
 * Check if a user can access a specific feature
 */
export function canAccessFeature(role: UserRole, feature: string): boolean {
  const featurePermissions: Record<string, string[]> = {
    batch_management: ["create_batches", "view_batches"],
    inventory_management: ["manage_inventory"],
    request_management: ["manage_requests"],
    quality_control: ["quality_inspection"],
    user_management: ["manage_users"],
    analytics: ["view_analytics"],
  };

  const requiredPermissions = featurePermissions[feature] || [];
  const userPermissions = getRolePermissions(role);

  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}

/**
 * Get accessible features for a role
 */
export function getAccessibleFeatures(role: UserRole): string[] {
  const allFeatures = [
    "batch_management",
    "inventory_management",
    "request_management",
    "quality_control",
    "user_management",
    "analytics",
  ];

  return allFeatures.filter((feature) => canAccessFeature(role, feature));
}

/**
 * Validate route parameters based on role
 */
export function validateRouteParams(role: UserRole, route: string, params: Record<string, any>): PermissionCheck {
  // Check if user can access the route
  const routeCheck = guardRoute(role, route);
  if (!routeCheck.hasAccess) {
    return routeCheck;
  }

  // Additional parameter validation can be added here
  // For example, checking if user can access specific batch IDs, etc.

  return { hasAccess: true };
}

/**
 * Get navigation options for a role
 */
export function getNavigationOptions(role: UserRole) {
  return {
    allowedTabs: getRolePermissions(role).filter(
      (permission) => permission.startsWith("view_") || permission === "edit_profile"
    ),
    defaultTab: getDefaultTabForRole(role),
    canNavigate: (tab: string) => canAccessTab(role, tab),
  };
}
