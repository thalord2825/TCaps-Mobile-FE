<!-- e77b1530-7439-4b2e-b340-ce32bd9d8500 248214af-085f-4fee-ac65-54f5f2bca9c8 -->
# Homescreen Improvements for All Roles

## Admin Homescreen Enhancements

### Add Production Performance Dashboard

**File:** `app/components/home/AdminHomeContent.tsx`

Add new section after "Tổng quan" with real-time factory comparison:

- Factory comparison chart showing output rate and quality score
- Visual bar chart comparing 5 factories (Xưởng Cắt Vải, Xưởng Thêu, Xưởng In, etc.)
- Display metrics: Batches completed today, Average quality %, Efficiency rate
- Color-coded performance indicators (green/yellow/red)

### Add Financial Overview Section

**File:** `app/components/home/AdminHomeContent.tsx`

Create "Tổng quan tài chính" section with:

- Today's production cost vs revenue projection (with percentage comparison)
- Material cost trends (up/down arrow with percentage)
- Display in compact 2-column grid format
- Use Vietnamese currency formatting (VNĐ)

### Add Strategic Quick Actions

**File:** `app/components/home/AdminHomeContent.tsx`

Update quick actions to include:

- "Tạo mã sản phẩm" - One-click access to create new product codes
- "Quản lý ưu tiên" - Batch priority management interface
- "Công suất nhà máy" - Factory capacity utilization view
- "Xuất báo cáo" - Export daily/weekly reports
- Style as cards with icons, consistent with existing design

## Lead Homescreen Enhancements

### Add Pull-to-Refresh for Batch Updates

**File:** `app/components/home/LeadHomeContent.tsx`

Implement pull-to-refresh:

- Wrap ScrollView with RefreshControl
- Add loading state management
- Simulate data refresh (update timestamp, status changes)
- Show toast notification on refresh complete

### Add Upcoming Deadlines Summary Section

**File:** `app/components/home/LeadHomeContent.tsx`

Create "Hạn chót sắp tới (24h)" section above batch cards:

- List batches with deadlines in next 24 hours
- Show countdown timer (e.g., "còn 3 giờ")
- Color-coded urgency (red for <6h, yellow for 6-12h, blue for 12-24h)
- Display batch ID, stage, and factory
- Limit to 3 most urgent, with "+X more" indicator

### Add Recent Activity Timeline

**File:** `app/components/home/LeadHomeContent.tsx`

Add collapsible "Hoạt động gần đây" section:

- Show last 5 significant events (batch transfers, QC completions, material requests)
- Display with timeline dots and connecting lines
- Format: timestamp, action icon, description, actor name
- Relative time format (e.g., "5 phút trước", "2 giờ trước")

## QC Homescreen Enhancements

### Add "Start Inspection" Action Button to Cards

**File:** `app/components/home/QCHomeContent.tsx`

Update pending inspection cards:

- Add prominent "Bắt đầu kiểm tra" button (green, full-width)
- Position below existing card content
- Navigate to QC inspection screen with batch ID
- Add loading state on button press
- Consider quick-start modal as alternative

### Add Recent Activity Section

**File:** `app/components/home/QCHomeContent.tsx`

Create "Hoạt động QC gần đây" section:

- Show last 3-5 completed inspections
- Display: Batch ID, result (Pass/Fail), timestamp, inspector notes preview
- Color-coded by result (green for Pass, red for Fail)
- Clickable to view full inspection details

## Staff Homescreen Enhancements

### Add "Next Task in Queue" Preview

**File:** `app/components/home/StaffHomeContent.tsx`

After current tasks section, add "Công việc tiếp theo":

- Show preview of next 1-2 tasks in queue
- Display in lighter/faded card style to differentiate from current tasks
- Include: Batch name, stage, estimated start time, target quantity
- "Chuẩn bị" button to view task details early

### Add Recent Activity Timeline

**File:** `app/components/home/StaffHomeContent.tsx`

Add "Lịch sử công việc" section:

- Show last 3 completed tasks
- Display: Task name, completion time, quantity achieved, earnings
- Show quality score for each completed task
- Total at bottom: "Hôm nay đã hoàn thành X việc, kiếm được Y VNĐ"

## Courier Homescreen Enhancements

### Add Quick Action Buttons to Delivery Cards

**File:** `app/components/home/CourierHomeContent.tsx`

Update active delivery cards with action button row:

- "Điều hướng" button - Opens Google Maps with destination (external link)
- "Cập nhật" button - Shows status update modal (Arrived/Delivered/Issue)
- Place buttons at bottom of each delivery card
- Use icon + text for clarity
- Style consistently with primary/secondary button patterns

### Add Recent Activity Timeline

**File:** `app/components/home/CourierHomeContent.tsx`

Add "Lịch sử giao hàng hôm nay" after Tóm tắt:

- Show last 3-5 completed deliveries
- Display: Delivery ID, destination (truncated), completion time, status
- Success/failure indicator with color coding
- Include delivery distance and duration
- Expandable to show full delivery history

## Implementation Notes

### Common Patterns to Reuse

**Pull-to-Refresh:**

```typescript
const [refreshing, setRefreshing] = useState(false);
const onRefresh = useCallback(() => {
  setRefreshing(true);
  setTimeout(() => setRefreshing(false), 1000);
}, []);
```

**Recent Activity Timeline Item:**

```typescript
<View style={{ flexDirection: "row", gap: 8 }}>
  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
  <View style={{ flex: 1 }}>
    <Text style={{ fontSize: 12, color: colors.textHigh }}>{description}</Text>
    <Text style={{ fontSize: 10, color: colors.textLow }}>{relativeTime}</Text>
  </View>
</View>
```

**Action Button Pattern:**

```typescript
<Pressable
  onPress={action}
  style={{
    backgroundColor: colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  }}
>
  <FontAwesome name={icon} size={14} color="#FFFFFF" />
  <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>{label}</Text>
</Pressable>
```

### Data Sources

Use existing sample data files:

- `app/data/sample-batches.ts` - For batch information
- `app/data/sample-qc-inspections.ts` - For QC activities
- `app/data/sample-staff-tasks.ts` - For staff tasks
- `app/data/sample-deliveries.ts` - For courier deliveries

Add utility functions for:

- Relative time formatting (`formatRelativeTime()`)
- Currency formatting (`formatCurrency()`)
- Countdown timer calculation (`getTimeRemaining()`)

### Styling Consistency

- Use existing `SectionCard` wrapper for new sections
- Maintain 8px gap between sections
- Use theme colors from `useTheme()` hook
- Follow existing dark mode patterns
- Keep font sizes consistent (16px titles, 12-14px content, 10px secondary)

## Files to Modify

1. `app/components/home/AdminHomeContent.tsx` - Add production dashboard, financial overview, strategic actions
2. `app/components/home/LeadHomeContent.tsx` - Add pull-to-refresh, deadline summary, activity timeline
3. `app/components/home/QCHomeContent.tsx` - Add start inspection buttons, activity section
4. `app/components/home/StaffHomeContent.tsx` - Add next task preview, activity timeline
5. `app/components/home/CourierHomeContent.tsx` - Add action buttons to cards, activity timeline