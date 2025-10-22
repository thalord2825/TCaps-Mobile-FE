import { createContext, ReactNode, useContext, useState } from "react";
import {
  canAccessScreen,
  canAccessTab,
  getAllowedTabs,
  getRoleDescription,
  getRoleDisplayName,
  UserRole,
} from "../../config/route-rules";
import {
  canAccessFeature,
  canPerformAction,
  getAccessibleFeatures,
  getAvailableActions,
  guardRoute,
} from "../../utils/route-guards";

export interface UserInfo {
  name: string;
  role: UserRole;
  avatarUri?: string;
  unreadCount?: number;
}

const UserContext = createContext<UserInfo | undefined>(undefined);
const UserActionsContext = createContext<
  | {
      setRole: (role: UserRole) => void;
    }
  | undefined
>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  // State-based role management for testing
  const [currentRole, setCurrentRole] = useState<UserRole>("Admin");

  const value: UserInfo = {
    name: "NGUYEN TRUNG HIEU",
    role: currentRole,
    unreadCount: 9,
  };

  const actionsValue = {
    setRole: setCurrentRole,
  };

  return (
    <UserContext.Provider value={value}>
      <UserActionsContext.Provider value={actionsValue}>{children}</UserActionsContext.Provider>
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

export function useUserActions() {
  const ctx = useContext(UserActionsContext);
  if (!ctx) throw new Error("useUserActions must be used within UserProvider");
  return ctx;
}

// Enhanced user context with routing helpers
export function useUserRouting() {
  const user = useUser();

  return {
    ...user,
    // Role information
    roleDisplayName: getRoleDisplayName(user.role),
    roleDescription: getRoleDescription(user.role),

    // Access control
    hasAccess: (resource: string) => {
      const result = guardRoute(user.role, resource);
      return result.hasAccess;
    },

    canAccessTab: (tabName: string) => canAccessTab(user.role, tabName),
    canAccessScreen: (screenKey: string) => canAccessScreen(user.role, screenKey),

    // Navigation helpers
    getAllowedTabs: () => getAllowedTabs(user.role),

    // Permission helpers
    canPerformAction: (action: string) => canPerformAction(user.role, action),
    getAvailableActions: () => getAvailableActions(user.role),
    canAccessFeature: (feature: string) => canAccessFeature(user.role, feature),
    getAccessibleFeatures: () => getAccessibleFeatures(user.role),

    // Guard helpers
    guardRoute: (resource: string, options?: any) => guardRoute(user.role, resource, options),
  };
}

export default UserContext;
