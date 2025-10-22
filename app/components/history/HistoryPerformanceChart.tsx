import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { HistoryBatchItem } from "../../data/sample-history-batches";
import { SectionCard } from "../common/section-card";

export interface HistoryPerformanceChartProps {
  batches: HistoryBatchItem[];
}

export function HistoryPerformanceChart({ batches }: HistoryPerformanceChartProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  // Calculate performance metrics
  const totalBatches = batches.length;
  const completedBatches = batches.filter((b) => b.status === "Completed").length;
  const completionRate = totalBatches > 0 ? Math.round((completedBatches / totalBatches) * 100) : 0;

  // Calculate average duration
  const avgDuration =
    batches.length > 0
      ? batches.reduce((sum, b) => {
          const start = new Date(b.startDate);
          const end = new Date(b.completionDate);
          return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        }, 0) / batches.length
      : 0;

  // Calculate quality score (based on QC pass rate)
  const totalStages = batches.reduce((sum, b) => sum + b.stages.length, 0);
  const passedStages = batches.reduce((sum, b) => sum + b.stages.filter((s) => s.qcStatus === "Pass").length, 0);
  const qualityScore = totalStages > 0 ? Math.round((passedStages / totalStages) * 100) : 0;

  // Factory performance ranking
  const factoryStats = batches.reduce(
    (acc, batch) => {
      batch.stages.forEach((stage) => {
        if (!acc[stage.factory]) {
          acc[stage.factory] = { total: 0, passed: 0 };
        }
        acc[stage.factory].total++;
        if (stage.qcStatus === "Pass") {
          acc[stage.factory].passed++;
        }
      });
      return acc;
    },
    {} as Record<string, { total: number; passed: number }>
  );

  const topFactories = Object.entries(factoryStats)
    .map(([factory, stats]) => ({
      factory: factory.replace("Xưởng ", "").replace("Kho ", ""),
      rate: Math.round((stats.passed / stats.total) * 100),
      total: stats.total,
    }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 3);

  const getPerformanceColor = (rate: number) => {
    if (rate >= 90) return isDark ? "#4ade80" : "#16a34a";
    if (rate >= 70) return isDark ? "#fbbf24" : "#d97706";
    return isDark ? "#f87171" : "#dc2626";
  };

  return (
    <SectionCard>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="line-chart" size={16} color={isDark ? colors.textHigh : colors.textHigh} />
            </View>
            <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
              Phân tích hiệu suất
            </Text>
          </View>
        </View>

        {/* Performance Metrics */}
        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: getPerformanceColor(completionRate),
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: getPerformanceColor(completionRate), fontSize: 24, fontWeight: "800" }}>
              {completionRate}%
            </Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Tỷ lệ hoàn thành
            </Text>
          </View>

          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: getPerformanceColor(qualityScore),
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: getPerformanceColor(qualityScore), fontSize: 24, fontWeight: "800" }}>
              {qualityScore}%
            </Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Chất lượng QC
            </Text>
          </View>
        </View>

        {/* Average Duration */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.accent + "30",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Text style={{ color: colors.accent, fontSize: 20, fontWeight: "800" }}>
            {avgDuration < 1 ? "< 1 ngày" : `${Math.round(avgDuration)} ngày`}
          </Text>
          <Text
            style={{
              color: isDark ? colors.textLow : colors.textMedium,
              fontSize: 12,
              textAlign: "center",
              fontWeight: "400",
            }}
          >
            Thời gian trung bình
          </Text>
        </View>

        {/* Top Performing Factories */}
        {topFactories.length > 0 && (
          <View>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 14,
                fontWeight: "700",
                marginBottom: 8,
              }}
            >
              Xưởng hiệu suất cao nhất
            </Text>
            <View style={{ gap: 6 }}>
              {topFactories.map((factory, index) => (
                <View
                  key={factory.factory}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    borderRadius: 8,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        backgroundColor: getPerformanceColor(factory.rate),
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "700" }}>{index + 1}</Text>
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 13,
                        fontWeight: "600",
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {factory.factory}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end", minWidth: 60 }}>
                    <Text
                      style={{
                        color: getPerformanceColor(factory.rate),
                        fontSize: 13,
                        fontWeight: "700",
                      }}
                    >
                      {factory.rate}%
                    </Text>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                      }}
                    >
                      {factory.total} giai đoạn
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </SectionCard>
  );
}

export default HistoryPerformanceChart;
