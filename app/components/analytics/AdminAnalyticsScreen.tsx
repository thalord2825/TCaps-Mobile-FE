import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateRange } from "../../context/date-range-context";
import { useTheme } from "../../context/theme-context";
import { DashboardStats } from "../charts/DashboardStats";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { DateRangePicker } from "../common/DateRangePicker";
import { FilterBar, FilterCategory } from "../common/FilterBar";
import { SectionCard } from "../common/section-card";
import { ThemeToggle } from "../common/theme-toggle";

export function AdminAnalyticsScreen() {
  const { colors, theme } = useTheme();
  const isDark = theme === "dark";
  const { selectedRange, setSelectedRange } = useDateRange();

  // Filter categories for analytics
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
      id: "factory",
      label: "Nhà máy",
      options: [
        { id: "all_factories", label: "Tất cả", value: "all" },
        { id: "factory_a", label: "Nhà máy A", value: "factory_a" },
        { id: "factory_b", label: "Nhà máy B", value: "factory_b" },
        { id: "factory_c", label: "Nhà máy C", value: "factory_c" },
      ],
      multiSelect: true,
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

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
          Phân tích tổng quan
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
            title="Trạng thái lô hàng"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>24 lô • 12 đang sản xuất • 8 hoàn thành</Text>
            }
          >
            <DashboardStats role="admin" showCharts={true} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Xu hướng sản xuất"
            defaultExpanded={true}
            previewContent={<Text style={{ color: colors.textLow, fontSize: 12 }}>+15% so với tuần trước</Text>}
          >
            <DashboardStats role="admin" showCharts={true} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Hiệu suất nhà máy"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Nhà máy A: 92% • Nhà máy B: 88%</Text>
            }
          >
            <DashboardStats role="admin" showCharts={true} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Sử dụng nguyên liệu"
            defaultExpanded={true}
            previewContent={<Text style={{ color: colors.textLow, fontSize: 12 }}>Vải: 45% • Chỉ: 30% • Keo: 25%</Text>}
          >
            <DashboardStats role="admin" showCharts={true} />
          </CollapsibleSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
