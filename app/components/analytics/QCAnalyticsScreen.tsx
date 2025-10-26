import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateRange } from "../../context/date-range-context";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import {
  generateDefectTypesFrequency,
  generateInspectionTrend,
  generateQualityStatusBreakdown,
} from "../../data/chart-data-generators";
import { BarChart } from "../charts/BarChart";
import { LineChart } from "../charts/LineChart";
import { PieChart } from "../charts/PieChart";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { DateRangePicker } from "../common/DateRangePicker";
import { SectionCard } from "../common/section-card";
import { ThemeToggle } from "../common/theme-toggle";

export function QCAnalyticsScreen() {
  const { theme, colors } = useTheme();
  const { selectedRange, setSelectedRange } = useDateRange();
  const user = useUser();
  const isDark = theme === "dark";

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
          Báo cáo chất lượng
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
            title="Phân bố trạng thái chất lượng"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Đạt: 78% • Không đạt: 15% • Chờ kiểm tra: 7%</Text>
            }
          >
            <PieChart data={generateQualityStatusBreakdown()} title="Phân bố trạng thái chất lượng" height={200} />
          </CollapsibleSection>

          <CollapsibleSection
            title="Xu hướng kiểm tra hàng ngày"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Đạt chuẩn: 15 lô • Không đạt: 3 lô</Text>
            }
          >
            <View style={{ gap: 8 }}>
              <LineChart
                data={generateInspectionTrend().pass}
                title="Lô đạt chuẩn"
                height={150}
                color={colors.success}
              />
              <LineChart data={generateInspectionTrend().fail} title="Lô không đạt" height={150} color={colors.error} />
            </View>
          </CollapsibleSection>

          <CollapsibleSection
            title="Tần suất các loại lỗi"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Lỗi đường may: 45% • Lỗi màu sắc: 30% • Lỗi kích thước: 25%
              </Text>
            }
          >
            <BarChart
              data={generateDefectTypesFrequency()}
              title="Tần suất các loại lỗi"
              height={180}
              color={colors.error}
            />
          </CollapsibleSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
