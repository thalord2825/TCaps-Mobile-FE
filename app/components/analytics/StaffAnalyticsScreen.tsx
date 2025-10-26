import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateRange } from "../../context/date-range-context";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { getStaffTaskStats } from "../../data/sample-staff-tasks";
import { DashboardStats } from "../charts/DashboardStats";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { DateRangePicker } from "../common/DateRangePicker";
import { SectionCard } from "../common/section-card";
import { ThemeToggle } from "../common/theme-toggle";

export function StaffAnalyticsScreen() {
  const { theme, colors } = useTheme();
  const { selectedRange, setSelectedRange } = useDateRange();
  const user = useUser();
  const isDark = theme === "dark";

  // Get staff task stats
  const taskStats = getStaffTaskStats();

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
          Hiệu suất cá nhân
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
          {/* Analytics Sections */}
          <CollapsibleSection
            title="Biểu đồ hiệu suất"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Thu nhập: {Math.round(taskStats.totalEarnings / 1000)}K • Hoàn thành:{" "}
                {taskStats.completionRate.toFixed(1)}%
              </Text>
            }
          >
            <DashboardStats role="staff" showCharts={true} />
          </CollapsibleSection>

          {/* Personal Performance Summary */}
          <CollapsibleSection
            title="Hiệu suất cá nhân"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Hoàn thành: {taskStats.completionRate.toFixed(1)}% • Thu nhập:{" "}
                {Math.round(taskStats.totalEarnings / 1000)}K
              </Text>
            }
          >
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tỷ lệ hoàn thành</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {taskStats.completionRate.toFixed(1)}%
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Điểm chất lượng TB</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>
                  {taskStats.averageQualityScore.toFixed(1)}/100
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng thu nhập hôm nay</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {taskStats.totalEarnings.toLocaleString("vi-VN")} VNĐ
                </Text>
              </View>
            </View>
          </CollapsibleSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
