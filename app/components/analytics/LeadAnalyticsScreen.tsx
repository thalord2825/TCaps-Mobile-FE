import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateRange } from "../../context/date-range-context";
import { useTheme } from "../../context/theme-context";
import { generateBatchCompletionTrend, generateStageDistribution } from "../../data/chart-data-generators";
import { BarChart } from "../charts/BarChart";
import { LineChart } from "../charts/LineChart";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { DateRangePicker } from "../common/DateRangePicker";
import { FilterBar, FilterCategory } from "../common/FilterBar";
import { SectionCard } from "../common/section-card";
import { ThemeToggle } from "../common/theme-toggle";

export function LeadAnalyticsScreen() {
  const { theme, colors } = useTheme();
  const { selectedRange, setSelectedRange } = useDateRange();
  const isDark = theme === "dark";

  // Factory selector state
  const [selectedFactory, setSelectedFactory] = useState<string>("all");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Available factories
  const factories = [
    { id: "all", name: "Tất cả nhà máy", color: colors.accent },
    { id: "factory_a", name: "Nhà máy A - Cắt vải", color: "#3b82f6" },
    { id: "factory_b", name: "Nhà máy B - Thêu", color: "#10b981" },
    { id: "factory_c", name: "Nhà máy C - In", color: "#f59e0b" },
    { id: "factory_d", name: "Nhà máy D - May vành", color: "#ef4444" },
  ];

  // Filter categories for lead analytics
  const filterCategories: FilterCategory[] = [
    {
      id: "status",
      label: "Trạng thái",
      options: [
        { id: "all", label: "Tất cả", value: "all" },
        { id: "in_progress", label: "Đang sản xuất", value: "in_progress" },
        { id: "completed", label: "Hoàn thành", value: "completed" },
        { id: "pending_qc", label: "Chờ QC", value: "pending_qc" },
      ],
      multiSelect: true,
    },
    {
      id: "priority",
      label: "Ưu tiên",
      options: [
        { id: "all_priority", label: "Tất cả", value: "all" },
        { id: "urgent", label: "Khẩn cấp", value: "urgent", color: "#ef4444" },
        { id: "high", label: "Cao", value: "high", color: "#f59e0b" },
        { id: "medium", label: "Trung bình", value: "medium", color: "#3b82f6" },
        { id: "low", label: "Thấp", value: "low", color: "#10b981" },
      ],
      multiSelect: true,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      {/* Header with Theme Toggle */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.border : colors.borderVariant,
        }}
      >
        <View />
        <Text
          style={{
            color: colors.textHigh,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Báo cáo sản xuất
        </Text>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <ThemeToggle />
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={{ gap: 8 }}>
          {/* Date Range Picker */}
          <SectionCard>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Khoảng thời gian</Text>
              <DateRangePicker selectedRange={selectedRange} onRangeChange={setSelectedRange} compact />
            </View>
          </SectionCard>

          {/* Filter Bar */}
          <FilterBar
            categories={filterCategories}
            selectedFilters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />

          {/* Analytics Sections */}
          <CollapsibleSection
            title="Xu hướng hoàn thành lô hàng"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>+15% so với tuần trước • 24 lô hoàn thành</Text>
            }
          >
            <LineChart
              data={generateBatchCompletionTrend()}
              title="Xu hướng hoàn thành lô hàng (14 ngày)"
              height={180}
              color={colors.accent}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Phân bố lô hàng theo giai đoạn"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Cắt vải: 6 lô • Thêu: 4 lô • In: 3 lô</Text>
            }
          >
            <BarChart
              data={generateStageDistribution()}
              title="Phân bố lô hàng theo giai đoạn"
              height={180}
              color={colors.success}
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="So sánh hiệu suất nhà máy"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Nhà máy A: 92% • Nhà máy B: 88% • Nhà máy C: 85%
              </Text>
            }
          >
            <BarChart
              data={[
                { x: "Nhà máy A", y: 92, label: "Nhà máy A: 92%" },
                { x: "Nhà máy B", y: 88, label: "Nhà máy B: 88%" },
                { x: "Nhà máy C", y: 85, label: "Nhà máy C: 85%" },
                { x: "Nhà máy D", y: 90, label: "Nhà máy D: 90%" },
              ]}
              title="Hiệu suất nhà máy (%)"
              height={180}
              color={colors.accent}
            />
          </CollapsibleSection>

          {/* Actionable Alerts */}
          <CollapsibleSection
            title="Cảnh báo cần xử lý"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>3 cảnh báo khẩn cấp • 2 cảnh báo cao</Text>
            }
          >
            <View style={{ gap: 8 }}>
              <View
                style={{
                  backgroundColor: "#ef4444",
                  padding: 8,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "#dc2626",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
                  🔴 Khẩn cấp: Nhà máy A - Thiếu nguyên liệu vải
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 10, marginTop: 2 }}>Cần bổ sung 50m vải trước 14:00</Text>
              </View>

              <View
                style={{
                  backgroundColor: "#f59e0b",
                  padding: 8,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: "#d97706",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
                  🟡 Cảnh báo: Nhà máy B - Chậm tiến độ 2 giờ
                </Text>
                <Text style={{ color: "#FFFFFF", fontSize: 10, marginTop: 2 }}>
                  Lô #B001 cần hoàn thành trước 16:00
                </Text>
              </View>
            </View>
          </CollapsibleSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
