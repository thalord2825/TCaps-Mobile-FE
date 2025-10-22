# TCaps Mobile - Routing Conventions

## Overview

This document defines the routing conventions and role-based access patterns for the TCaps Mobile hat production management system. It establishes consistent patterns for organizing pages, components, and routes based on user roles and system architecture.

## Project Structure Rules

### 1. Pages Organization

Pages are organized by role and feature following a hierarchical structure:

```
app/
├── (tabs)/                    # Main tab navigation
│   ├── _layout.tsx           # Role-based tab configuration
│   ├── index.tsx             # Home tab
│   ├── history.tsx           # History tab
│   ├── inventory.tsx         # Inventory tab (Lead/Admin only)
│   ├── request.tsx           # Request tab (Lead/Admin only)
│   ├── quality.tsx           # Quality tab (QC/Lead/Admin only)
│   ├── profile.tsx           # Profile tab
│   ├── batch/                # Direct batch screens
│   │   ├── [id].tsx         # Batch detail
│   │   └── create.tsx       # Create batch
│   ├── quality-check/        # Quality check screens
│   │   └── [batchId].tsx    # Quality check detail
│   ├── material/            # Material screens
│   │   ├── [id].tsx         # Material detail
│   │   └── add.tsx          # Add material
│   ├── request/             # Request screens
│   │   ├── [id].tsx         # Request detail
│   │   ├── create.tsx       # Create request
│   │   └── [id]/distribution.tsx # Distribution
│   └── supplier.tsx         # Supplier management
├── components/               # Shared components
│   ├── history/
│   │   └── HistoryDashboard.tsx  # Consolidated history components
│   ├── inventory/
│   │   └── InventoryDashboard.tsx # Consolidated inventory components
│   └── common/              # Reusable components
├── context/                 # React contexts
└── config/                  # Configuration files
```

### 2. File Naming Conventions

#### Page Components

- **PascalCase** for all page components: `BatchDetail.tsx`, `MaterialAdd.tsx`
- **Descriptive names** that indicate purpose: `QualityCheck.tsx`, `PerformanceReport.tsx`
- **Consistent suffixes**:
  - `Form` - For form components
  - `List` - For list/table components
  - `Detail` - For detail screens
  - `Create` - For creation screens
  - `Edit` - For editing screens

#### Layout Components

- **Layout components** in `app/(tabs)/`: `_layout.tsx` files
- **Stack layouts** for nested navigation: `(stack-name)/_layout.tsx`
- **UI components** in `app/components/`: `Button.tsx`, `Card.tsx`

### 3. Folder Structure Rules

#### Role-Based Organization

- Each role gets specific tab access defined in `config/route-rules.ts`
- Feature-specific subfolders group related functionality
- Shared components go in `app/components/`
- Stack navigators create nested routes within tabs

#### Nested Route Structure

- Folder structure mirrors URL structure
- Nested folders create nested routes
- Index files (`index.tsx`) define default routes
- Stack layouts handle navigation within tabs

## Role-Based Routing Conventions

### 1. Route Patterns by Role

#### Staff Routes

- **Tabs**: Home, History, Profile
- **Screens**: Batch details, Quality check (view only)
- **Permissions**: View batches, Submit production, Request materials

#### QC Routes

- **Tabs**: Home, History, Quality, Profile
- **Screens**: Quality inspection, Quality reports, Batch details
- **Permissions**: Quality inspection, Approve/reject batches, View quality reports

#### Lead Routes

- **Tabs**: Home, History, Inventory, Request, Quality, Profile
- **Screens**: All screens except admin-specific features
- **Permissions**: Manage inventory, Manage requests, Team oversight, Create batches

#### Admin Routes

- **Tabs**: All tabs + System Management
- **Screens**: All screens with full access
- **Permissions**: Full system access, User management, System settings

### 2. Protected Route Configuration

#### Role-Based Access Control

```typescript
interface ProtectedRouteProps {
  resource: string;
  requiredRole?: UserRole;
  requiredPermissions?: string[];
  fallbackRoute?: string;
}

// Role hierarchy and access patterns
const roleAccess = {
  Admin: ["Admin"], // Admin only
  Lead: ["Lead", "Admin"], // Lead and Admin
  QC: ["QC", "Lead", "Admin"], // QC, Lead, and Admin
  Staff: ["Staff", "Lead", "Admin"], // Staff, Lead, and Admin
};
```

### 3. Navigation Structure

#### Role-Based Navigation

Each role has its own navigation structure:

```typescript
const navigationStructure = {
  Staff: {
    main: ["Home", "History", "Profile"],
    features: ["View Batches", "Submit Production", "Request Materials"],
  },
  QC: {
    main: ["Home", "History", "Quality", "Profile"],
    features: ["Quality Inspection", "Approve Batches", "Quality Reports"],
  },
  Lead: {
    main: ["Home", "History", "Inventory", "Request", "Quality", "Profile"],
    features: ["Manage Inventory", "Manage Requests", "Team Oversight"],
  },
  Admin: {
    main: ["Home", "History", "Inventory", "Request", "Quality", "Profile"],
    features: ["Full System Access", "User Management", "System Settings"],
  },
};
```

## Implementation Guidelines

### 1. Route Definition Standards

#### Consistent Route Structure

```typescript
// Standard route definition pattern
{
  path: "/tab/feature",
  element: <ProtectedRoute resource="tab.feature" />,
  children: [
    { index: true, element: <FeatureList /> },
    { path: "detail/:id", element: <FeatureDetail /> }
  ]
}
```

#### Nested Route Patterns

```typescript
// Nested routes with parameters
{
  path: "feature",
  children: [
    { index: true, element: <FeatureList /> },
    { path: "detail/:id", element: <FeatureDetail /> },
    { path: "create", element: <FeatureForm /> }
  ]
}
```

### 2. Component Organization

#### Page Component Structure

```typescript
// Standard page component pattern
import React from "react";
import { useUserRouting } from "@/context/user-context";

interface PageProps {
  // Define props interface
}

export default function PageComponent({ prop1, prop2 }: PageProps) {
  const { canAccessFeature, hasAccess } = useUserRouting();

  // Component implementation
  return <div className="page-container">{/* Page content */}</div>;
}
```

#### Layout Component Integration

```typescript
// Role-specific layout components
const roleLayouts = {
  Staff: <StaffNavigation />,
  QC: <QCNavigation />,
  Lead: <LeadNavigation />,
  Admin: <AdminNavigation />,
};
```

### 3. URL Structure Standards

#### URL Pattern Conventions

- **Tab routes**: `/(tabs)/tab-name` (e.g., `/(tabs)/home`, `/(tabs)/inventory`)
- **Detail routes**: `/(tabs)/feature/[id]` (e.g., `/(tabs)/batch/123`)
- **Action routes**: `/(tabs)/feature/action` (e.g., `/(tabs)/batch/create`)
- **Nested routes**: `/(tabs)/feature/[id]/subfeature` (e.g., `/(tabs)/request/123/distribution`)

#### Parameter Naming

- Use descriptive parameter names: `[id]`, `[batchId]`, `[requestId]`
- Consistent parameter patterns across similar features
- Validate parameters in route handlers

### 4. Error Handling

#### Route Error Patterns

```typescript
// Error route handling
{ path: "/unauthorized", element: <UnauthorizedScreen /> }
{ path: "*", element: <NotFoundScreen /> }
```

#### Role-Based Error Handling

```typescript
// Role-specific error handling
const handleRoleError = (userRole: string, requiredRole: string[]) => {
  if (!requiredRole.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
};
```

## Maintenance Guidelines

### 1. Adding New Roles

When adding new roles:

1. Update `UserRole` type in `config/route-rules.ts`
2. Add role configuration to `ROLE_CONFIGS`
3. Update tab configurations in `TAB_CONFIGS`
4. Add screen configurations in `SCREEN_CONFIGS`
5. Update navigation structure
6. Test role-based access

### 2. Adding New Features

When adding features to existing roles:

1. Create feature folder under appropriate stack
2. Add route definition to stack layout
3. Update screen configurations
4. Update navigation structure
5. Create necessary components

### 3. Route Validation

#### Automated Route Validation

- Validate route structure against conventions
- Check role-based access permissions
- Ensure consistent URL patterns
- Validate component imports and exports

#### Manual Review Checklist

- [ ] Route follows naming conventions
- [ ] Role permissions are correctly configured
- [ ] Nested routes are properly structured
- [ ] Components are properly imported
- [ ] Navigation structure is updated

## Quick Reference

### Common Route Patterns

```typescript
// Tab navigation
{ path: "/(tabs)/tab-name", element: <TabScreen /> }

// Stack navigation within tab
{ path: "/(tabs)/(stack-name)/feature", element: <FeatureScreen /> }

// Detail routes
{ path: "/(tabs)/(stack-name)/feature/[id]", element: <FeatureDetail /> }

// Form routes
{ path: "/(tabs)/(stack-name)/feature/create", element: <FeatureForm /> }
{ path: "/(tabs)/(stack-name)/feature/edit/[id]", element: <FeatureForm /> }
```

### Role Access Matrix

| Role  | Home | History | Inventory | Request | Quality | Profile |
| ----- | ---- | ------- | --------- | ------- | ------- | ------- |
| Staff | ✓    | ✓       | ✗         | ✗       | ✗       | ✓       |
| QC    | ✓    | ✓       | ✗         | ✗       | ✓       | ✓       |
| Lead  | ✓    | ✓       | ✓         | ✓       | ✓       | ✓       |
| Admin | ✓    | ✓       | ✓         | ✓       | ✓       | ✓       |

### Permission Matrix

| Permission         | Staff | QC  | Lead | Admin |
| ------------------ | ----- | --- | ---- | ----- |
| view_batches       | ✓     | ✓   | ✓    | ✓     |
| create_batches     | ✗     | ✗   | ✓    | ✓     |
| quality_inspection | ✗     | ✓   | ✓    | ✓     |
| manage_inventory   | ✗     | ✗   | ✓    | ✓     |
| manage_requests    | ✗     | ✗   | ✓    | ✓     |
| manage_users       | ✗     | ✗   | ✗    | ✓     |

This convention document should be updated as new roles and features are added to the system.
