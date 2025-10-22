import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { HistoryBatchItem } from "../../data/sample-history-batches";
import { SectionCard } from "../common/section-card";

export interface HistoryStatsCardProps {
  batches: HistoryBatchItem[];
}

export function HistoryStatsCard({ batches }: HistoryStatsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  // Handle empty data gracefully
  const hasData = batches && batches.length > 0;

  // Calculate stats with fallbacks
  const totalBatches = batches?.length || 0;
  const completedBatches = hasData ? batches.filter((b) => b.status === "Completed").length : 0;
  const totalQuantity = hasData ? batches.reduce((sum, b) => sum + (b.totalQty || 0), 0) : 0;
  const totalCost = hasData ? batches.reduce((sum, b) => sum + (b.totalCost || 0), 0) : 0;

  // Calculate average completion time
  const avgCompletionTime = hasData
    ? batches.reduce((sum, b) => {
        const start = new Date(b.startDate);
        const end = new Date(b.completionDate);
        return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24); // days
      }, 0) / batches.length
    : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount);
  };

  const formatDuration = (days: number) => {
    if (days < 1) return "< 1 ngày";
    if (days < 7) return `${Math.round(days)} ngày`;
    const weeks = Math.floor(days / 7);
    const remainingDays = Math.round(days % 7);
    return remainingDays > 0 ? `${weeks} tuần ${remainingDays} ngày` : `${weeks} tuần`;
  };

  const stats = [
    {
      label: "Lô hoàn thành",
      value: completedBatches.toString(),
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Tổng sản lượng",
      value: totalQuantity.toLocaleString(),
      icon: "cube",
      color: isDark ? colors.textHigh : colors.textHigh,
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Thời gian TB",
      value: formatDuration(avgCompletionTime),
      icon: "clock-o",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Tổng giá trị",
      value: formatCurrency(totalCost),
      icon: "money",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
        {/* Enhanced Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isDark ? "#1e40af" : "#3b82f6",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isDark ? "#1e40af" : "#3b82f6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <FontAwesome name="chart-bar" size={20} color="#FFFFFF" />
            </View>
            <View>
              <Text
                style={{
                  color: isDark ? "#fff" : colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 2,
                }}
              >
                Thống kê lịch sử
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                Tổng quan hiệu suất sản xuất
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: hasData
                ? isDark
                  ? "#059669"
                  : "#10b981"
                : isDark
                  ? colors.surfaceVariant
                  : colors.surfaceVariant,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: hasData ? 0 : 1,
              borderColor: hasData ? "transparent" : colors.border,
              shadowColor: hasData ? (isDark ? "#059669" : "#10b981") : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: hasData ? "#FFFFFF" : colors.textMedium,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {totalBatches} lô
            </Text>
          </View>
        </View>

        {hasData ? (
          <View style={{ gap: 12 }}>
            {/* Main Stats Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {stats.slice(0, 2).map((stat, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                    shadowColor: isDark ? "#000" : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: stat.color,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <FontAwesome name={stat.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {stat.label}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: isDark ? "#fff" : colors.textHigh,
                      fontSize: 18,
                      fontWeight: "700",
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>

            {/* Secondary Stats Row */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {stats.slice(2, 4).map((stat, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                    borderRadius: 12,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: isDark ? "#374151" : "#e2e8f0",
                    shadowColor: isDark ? "#000" : "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: stat.color,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12,
                      }}
                    >
                      <FontAwesome name={stat.icon as any} size={16} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {stat.label}
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: isDark ? "#fff" : colors.textHigh,
                      fontSize: 18,
                      fontWeight: "700",
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View
            style={{
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderRadius: 20,
              padding: 32,
              alignItems: "center",
              gap: 16,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e2e8f0",
              borderStyle: "dashed",
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: isDark ? "#374151" : "#e2e8f0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="chart-line" size={28} color={colors.textMedium} />
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Chưa có dữ liệu lịch sử
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Thống kê sẽ hiển thị khi có lô hàng hoàn thành
              </Text>
            </View>
          </View>
        )}
      </View>
    </SectionCard>
  );
}

export default HistoryStatsCard;
