import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDateRange } from "../../context/date-range-context";
import { useTheme } from "../../context/theme-context";
import {
  generateDeliveryStatusDistribution,
  generateDeliveryTrend,
  generateDistanceCovered,
} from "../../data/chart-data-generators";
import { getDeliveryStats } from "../../data/sample-deliveries";
import { BarChart } from "../charts/BarChart";
import { DonutChart } from "../charts/DonutChart";
import { LineChart } from "../charts/LineChart";
import { CollapsibleSection } from "../common/CollapsibleSection";
import { DateRangePicker } from "../common/DateRangePicker";
import { SectionCard } from "../common/section-card";
import { ThemeToggle } from "../common/theme-toggle";

export function CourierAnalyticsScreen() {
  const { colors, theme } = useTheme();
  const isDark = theme === "dark";
  const { selectedRange, setSelectedRange } = useDateRange();

  // Get delivery stats
  const deliveryStats = getDeliveryStats();

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
          Báo cáo giao hàng
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
            title="Xu hướng giao hàng tuần"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Thành công: 15 đơn • Thất bại: 2 đơn • Trả về: 1 đơn
              </Text>
            }
          >
            <View style={{ gap: 8 }}>
              <LineChart
                data={generateDeliveryTrend().delivered}
                title="Đã giao thành công"
                height={150}
                color={colors.success}
              />
              <LineChart
                data={generateDeliveryTrend().failed}
                title="Giao thất bại"
                height={150}
                color={colors.error}
              />
              <LineChart data={generateDeliveryTrend().returned} title="Trả về" height={150} color={colors.warning} />
            </View>
          </CollapsibleSection>

          <CollapsibleSection
            title="Phân bố trạng thái giao hàng"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Đã giao: 75% • Đang giao: 15% • Chờ giao: 10%</Text>
            }
          >
            <DonutChart
              data={generateDeliveryStatusDistribution()}
              title="Phân bố trạng thái giao hàng"
              height={200}
              centerText="100%"
            />
          </CollapsibleSection>

          <CollapsibleSection
            title="Quãng đường hàng ngày"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>Hôm nay: 45km • Trung bình: 38km/ngày</Text>
            }
          >
            <BarChart
              data={generateDistanceCovered()}
              title="Quãng đường hàng ngày (km)"
              height={180}
              color={colors.accent}
            />
          </CollapsibleSection>

          {/* Today's Summary */}
          <CollapsibleSection
            title="Tóm tắt hôm nay"
            defaultExpanded={true}
            previewContent={
              <Text style={{ color: colors.textLow, fontSize: 12 }}>
                Quãng đường: {deliveryStats.totalDistance}km • Thành công:{" "}
                {Math.round((deliveryStats.deliveredDeliveries / deliveryStats.totalDeliveries) * 100)}%
              </Text>
            }
          >
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng quãng đường</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>{deliveryStats.totalDistance} km</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng sản phẩm giao</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>{deliveryStats.totalItems} sản phẩm</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tỷ lệ thành công</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {deliveryStats.totalDeliveries > 0
                    ? Math.round((deliveryStats.deliveredDeliveries / deliveryStats.totalDeliveries) * 100)
                    : 0}
                  %
                </Text>
              </View>
            </View>
          </CollapsibleSection>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
