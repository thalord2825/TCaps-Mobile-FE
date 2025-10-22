import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { PerformanceData } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface ProfilePerformanceChartProps {
  performanceData: PerformanceData[];
  role: "Staff" | "QC" | "Lead" | "Admin";
}

export function ProfilePerformanceChart({ performanceData, role }: ProfilePerformanceChartProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "90d">("7d");

  const getPerformanceColor = (value: number, maxValue: number) => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return isDark ? "#4ade80" : "#16a34a";
    if (percentage >= 60) return isDark ? "#fbbf24" : "#d97706";
    return isDark ? "#f87171" : "#dc2626";
  };

  const getChartTitle = () => {
    switch (role) {
      case "Staff":
        return "Hiệu suất sản xuất";
      case "QC":
        return "Hiệu suất kiểm tra";
      case "Lead":
        return "Hiệu suất quản lý";
      case "Admin":
        return "Hoạt động hệ thống";
      default:
        return "Hiệu suất";
    }
  };

  const getChartSubtitle = () => {
    switch (role) {
      case "Staff":
        return "Số lượng sản phẩm hoàn thành";
      case "QC":
        return "Số lượng kiểm tra thực hiện";
      case "Lead":
        return "Số lô hàng hoàn thành";
      case "Admin":
        return "Số người dùng hoạt động";
      default:
        return "Hiệu suất làm việc";
    }
  };

  const getAverageValue = () => {
    if (performanceData.length === 0) return 0;
    const sum = performanceData.reduce((acc, item) => acc + item.value, 0);
    return Math.round(sum / performanceData.length);
  };

  const getMaxValue = () => {
    if (performanceData.length === 0) return 1;
    return Math.max(...performanceData.map((item) => item.value));
  };

  const getTrend = () => {
    if (performanceData.length < 2) return "stable";
    const first = performanceData[0].value;
    const last = performanceData[performanceData.length - 1].value;
    const diff = last - first;
    if (diff > 0) return "up";
    if (diff < 0) return "down";
    return "stable";
  };

  const getTrendIcon = () => {
    const trend = getTrend();
    switch (trend) {
      case "up":
        return "arrow-up";
      case "down":
        return "arrow-down";
      default:
        return "minus";
    }
  };

  const getTrendColor = () => {
    const trend = getTrend();
    switch (trend) {
      case "up":
        return isDark ? "#4ade80" : "#16a34a";
      case "down":
        return isDark ? "#f87171" : "#dc2626";
      default:
        return colors.textMedium;
    }
  };

  const maxValue = getMaxValue();
  const averageValue = getAverageValue();

  return (
    <SectionCard>
      <View style={{ gap: 16 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="line-chart" size={16} color={isDark ? colors.textHigh : colors.accent} />
            </View>
            <View>
              <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
                {getChartTitle()}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                {getChartSubtitle()}
              </Text>
            </View>
          </View>

          {/* Trend Indicator */}
          <View style={{ alignItems: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <FontAwesome name={getTrendIcon() as any} size={12} color={getTrendColor()} />
              <Text
                style={{
                  color: getTrendColor(),
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {getTrend() === "up" ? "Tăng" : getTrend() === "down" ? "Giảm" : "Ổn định"}
              </Text>
            </View>
          </View>
        </View>

        {/* Date Range Selector */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 4,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          {[
            { key: "7d", label: "7 ngày" },
            { key: "30d", label: "30 ngày" },
            { key: "90d", label: "90 ngày" },
          ].map((range) => (
            <Pressable
              key={range.key}
              onPress={() => setSelectedRange(range.key as "7d" | "30d" | "90d")}
              style={{
                flex: 1,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: selectedRange === range.key ? colors.accent : "transparent",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: selectedRange === range.key ? "#FFFFFF" : colors.textMedium,
                  fontSize: 12,
                  fontWeight: selectedRange === range.key ? "700" : "600",
                }}
              >
                {range.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Performance Metrics */}
        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: getPerformanceColor(averageValue, maxValue),
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: getPerformanceColor(averageValue, maxValue), fontSize: 24, fontWeight: "800" }}>
              {averageValue}
            </Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Trung bình {performanceData[0]?.label || ""}
            </Text>
          </View>

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
            <Text style={{ color: colors.accent, fontSize: 20, fontWeight: "800" }}>{maxValue}</Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Cao nhất
            </Text>
          </View>
        </View>

        {/* Simple Bar Chart Visualization */}
        {performanceData.length > 0 && (
          <View>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 14,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Biểu đồ 7 ngày gần nhất
            </Text>
            <View style={{ gap: 6 }}>
              {performanceData.slice(-7).map((item, index) => {
                const barWidth = (item.value / maxValue) * 100;
                const barColor = getPerformanceColor(item.value, maxValue);

                return (
                  <View
                    key={index}
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
                      <Text
                        style={{
                          color: colors.textMedium,
                          fontSize: 12,
                          fontWeight: "600",
                          minWidth: 40,
                        }}
                      >
                        {new Date(item.date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" })}
                      </Text>

                      {/* Bar */}
                      <View
                        style={{
                          flex: 1,
                          height: 8,
                          backgroundColor: isDark ? colors.borderVariant : colors.border,
                          borderRadius: 4,
                          overflow: "hidden",
                        }}
                      >
                        <View
                          style={{
                            width: `${barWidth}%`,
                            height: "100%",
                            backgroundColor: barColor,
                            borderRadius: 4,
                          }}
                        />
                      </View>
                    </View>

                    <View style={{ alignItems: "flex-end", minWidth: 40 }}>
                      <Text
                        style={{
                          color: barColor,
                          fontSize: 13,
                          fontWeight: "700",
                        }}
                      >
                        {item.value}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Empty State */}
        {performanceData.length === 0 && (
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              borderRadius: 20,
              padding: 32,
              alignItems: "center",
              gap: 16,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
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
              <FontAwesome name="bar-chart" size={28} color={colors.textMedium} />
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
                Chưa có dữ liệu
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Dữ liệu hiệu suất sẽ hiển thị khi bạn bắt đầu làm việc
              </Text>
            </View>
          </View>
        )}
      </View>
    </SectionCard>
  );
}

export default ProfilePerformanceChart;
