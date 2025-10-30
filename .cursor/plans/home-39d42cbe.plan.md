<!-- 39d42cbe-146f-4d18-8156-d5d1aee9eb34 2e322253-1f10-45bc-ba09-c2a53f8ea1a3 -->
# Implement “Chức năng khác” Grid

## Scope

Create a dark card section showing a 2xN grid of feature shortcuts that match the reference style: circular icon chips with cyan accents, feature labels underneath, section header with left title and right “Tùy chỉnh” plus a gear icon, and a right-side pager dot + “Xem tất cả →” row. Only two items for now: Factory manage, Staff manage.

## Key Files

- `app/components/features/features-grid.tsx` – section container with header, grid, footer.
- `app/components/features/feature-item.tsx` – individual icon + label chip.
- `app/(tabs)/index.tsx` – render the FeaturesGrid under BatchList.
- `app/data/features.ts` – local feature config list.

## UI Details

- Section card: background `#0E0A16`, radius 14–16, padding 14–16.
- Grid: 3 columns on phones; since we only have two items, center them in the first row.
- Icon chip: 56–60px circle, inner darker circle, cyan stroke/accent, icon in center.
- Labels: two-line max, small mid-contrast text.
- Header: left `Chức năng khác`, right `Tùy chỉnh` with a small gear icon in cyan.
- Footer: pager dot row on left and `Xem tất cả →` link on right, cyan color.

## Data Shape

- `Feature`: `{ id: string; label: string; icon: keyof FontAwesome; onPress?: () => void }`
- Two initial items: Factory manage ("Quản lý xưởng"), Staff manage ("Quản lý nhân sự").

## Accessibility

- `accessibilityRole="button"` on items, labels as `accessibilityLabel`.

## Snippets

`features.ts`:

```ts
export interface Feature { id: string; label: string; icon: string; }
export const features: Feature[] = [
  { id: "factory", label: "Quản lý xưởng", icon: "industry" },
  { id: "staff", label: "Quản lý nhân sự", icon: "users" },
];
```

`feature-item.tsx` (essentials):

```tsx
<View style={{ alignItems: "center", width: "33%", marginBottom: 16 }}>
  <Pressable style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: "#121826", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#1F2937" }}>
    <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: "#0E1622", alignItems: "center", justifyContent: "center" }}>
      <FontAwesome name={icon} color="#a9dfd8" size={18} />
    </View>
  </Pressable>
  <Text style={{ color: "#E5E7EB", fontSize: 12, marginTop: 8, textAlign: "center" }}>{label}</Text>
</View>
```

## Todos

- build-feature-item: Create FeatureItem component with icon chip + label
- add-features-data: Add features.ts with two items
- build-grid: Create FeaturesGrid section with header, 3-col grid, footer
- wire-home-grid: Render FeaturesGrid under BatchList
- a11y-features: Add accessibility labels/roles and hitSlop
- polish-features: Tune spacing/align to match reference

### To-dos

- [ ] Create sample-batches.ts with 5–8 batch items
- [ ] Implement BatchCard UI: code pill, status, info, progress, actions
- [ ] Implement BatchList with FlatList and handlers
- [ ] Render BatchList under WelcomeCard on Home
- [ ] Add accessibility labels/roles for list and buttons
- [ ] Polish spacing, colors, shadows to match WelcomeCard