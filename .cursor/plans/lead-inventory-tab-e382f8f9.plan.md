<!-- e382f8f9-9770-475d-bd90-45b5c72de1a4 fbab7c84-c3da-416d-8899-2110afa69d9a -->
# Lead Inventory Tab Implementation

## Overview

Build an Inventory tab following the Airbnb home screen's visual design pattern with dark/light theme support, featuring material cards, stock alerts, add/edit functionality, and comprehensive filtering/sorting.

## Design Specifications

### Layout Structure (Cleaner Product List Design)

- **SafeAreaView** with FlatList for optimal scrolling performance
- **Header Section**: 
  - Left: Menu icon (hamburger)
  - Center: "Products" title
  - Right: QR/Scan icon
- **Search Bar**: Full-width search input with icon
- **Filter Row**: Category and Sub-category dropdowns (inline, side-by-side)
- **Material Cards**: Clean vertical list with horizontal layout
- **Floating Action Button**: Bottom-right positioned "+" button to add new materials

### Material Card Design (Horizontal Layout)

Each material card displays in a horizontal row:

**Left Side (Image Section):**

- Small product image (60x60px rounded)

**Center Section (Details):**

- **Material Name** (e.g., "NESTLÉ NIDO 1+ Mil...") - bold, truncated
- **Category Badge** below name (small gray text: "Category: Milk")
- **Metadata Row** (small gray text):
  - ID: 099873
  - Stock Level: 15
  - Exp. Date: 08/26

**Right Side (Price & Actions):**

- **Price** (large, bold: "$89.00")
- **Status Badge** (green "Active" or red "Inactive")
- **Three-dot menu** for actions (Edit, Delete, History)

**Card Styling:**

- White/card background
- Subtle shadow/border
- 16px padding
- 12px gap between cards
- No thick borders, clean separation

### Stock Alert Visual Indicators

- **Red badge + border**: Stock < 50% of minimum threshold
- **Yellow badge**: Stock between 50%-100% of minimum threshold
- **Green badge**: Stock > minimum threshold
- **Gray badge**: Out of stock (quantity = 0)

### Filtering & Sorting Section

- **Filter Dropdown**: By category (All, Fabric, Thread, Glue, Labels, Buttons, Zippers)
- **Sort Dropdown**: By Name A-Z, Quantity Low-High, Quantity High-Low, Date Recent-Old
- Positioned below stats overview, above material list

### Add/Edit Material Modal

Bottom sheet modal with form fields:

- Material Name (text input)
- Category (dropdown: Cotton fabric, Polyester fabric, Nylon thread, Embroidery thread, Industrial glue, Fabric labels, Snap buttons, Zippers)
- Quantity (number input)
- Unit (dropdown: mét, kg, cuộn, cái, hộp)
- Cost per Unit (number input in VNĐ)
- Supplier Name (text input)
- Minimum Stock Threshold (number input)
- Save/Cancel buttons

## Files to Create/Modify

### 1. Update `app/(tabs)/inventory.tsx`

Replace placeholder with full implementation following `airbnb-home.tsx` structure

### 2. Create `app/data/sample-materials.ts`

Interface and sample data:

```typescript
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
```

### 3. Create `app/components/inventory/InventoryMaterialCard.tsx`

Material card component with all fields, stock alert logic, and history button

### 4. Create `app/components/inventory/InventoryStatsCard.tsx`

Stats overview component showing 4 metric cards (reuse pattern from airbnb-home dashboard metrics)

### 5. Create `app/components/inventory/InventoryFilterSort.tsx`

Filter and sort controls component with dropdowns

### 6. Create `app/components/inventory/AddMaterialModal.tsx`

Bottom sheet modal with form for adding/editing materials (using react-native-modal or similar)

### 7. Create `app/components/inventory/FloatingAddButton.tsx`

Reusable floating action button positioned at bottom-right

## Color Scheme (Following existing Colors.ts pattern)

- Primary accent: `#FF5A5F` (Airbnb red)
- Low stock alert: `#ef4444` (red)
- Adequate stock: `#10b981` (green)
- Warning stock: `#f59e0b` (amber)
- Out of stock: `#6b7280` (gray)
- Dark mode card: `#1B1D21`
- Light mode card: `#EAEAEA`

## Sample Material Categories

- Vải Cotton (Cotton fabric)
- Vải Polyester (Polyester fabric)
- Chỉ Nylon (Nylon thread)
- Chỉ Thêu (Embroidery thread)
- Keo Công Nghiệp (Industrial glue)
- Nhãn Vải (Fabric labels)
- Nút Bấm (Snap buttons)
- Dây Kéo (Zippers)

## Implementation Notes

- Use `useColorScheme()` for dark/light theme support
- Implement state management for filter/sort selections
- Add haptic feedback on button presses (Expo Haptics)
- Ensure offline capability considerations (data persistence)
- Follow safe area management with `SafeAreaView`
- Use consistent spacing: `gap: isDark ? 12 : 16` pattern from airbnb-home
- Match border radius: cards use `18`, buttons use `12`, badges use `999` (pill shape)

### To-dos

- [ ] Create sample materials data model and sample data file
- [ ] Build InventoryMaterialCard component with all fields and stock alert logic
- [ ] Build InventoryStatsCard component showing inventory metrics
- [ ] Build InventoryFilterSort component with dropdown controls
- [ ] Build FloatingAddButton component
- [ ] Build AddMaterialModal component with form fields
- [ ] Implement main inventory.tsx screen with all components integrated