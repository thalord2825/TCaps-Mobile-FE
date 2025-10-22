import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Pressable, Text, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { EarningsRecord, PerformanceData } from "../../data/sample-profile";
import { groupEarningsByDate } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface PerformanceEarningsCardProps {
  performanceData: PerformanceData[];
  earnings: EarningsRecord[];
  role: "Staff" | "QC" | "Lead" | "Admin" | "Courier";
}

export function PerformanceEarningsCard({ performanceData, earnings, role }: PerformanceEarningsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [selectedRange, setSelectedRange] = useState<"7d" | "30d" | "90d" | "custom">("7d");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
  };

  // Calculate date range based on selected range
  const getDateRange = () => {
    if (selectedRange === "custom" && customStartDate && customEndDate) {
      return {
        start: customStartDate,
        end: customEndDate,
      };
    }

    const endDate = new Date();
    const startDate = new Date();

    switch (selectedRange) {
      case "7d":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(endDate.getDate() - 90);
        break;
    }

    return {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };
  };

  const dateRange = getDateRange();

  // Filter earnings by date range
  let filteredEarnings = earnings.filter((record) => record.date >= dateRange.start && record.date <= dateRange.end);

  // If no earnings in the selected range, show all earnings for debugging
  if (filteredEarnings.length === 0 && earnings.length > 0) {
    console.log("No earnings in selected range, showing all earnings");
    filteredEarnings = earnings;
  }

  // Group earnings by date
  const groupedEarnings = groupEarningsByDate(filteredEarnings);
  const sortedDates = Object.keys(groupedEarnings).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Debug logging
  console.log("Date range:", dateRange);
  console.log("Total earnings:", earnings.length);
  console.log("Filtered earnings:", filteredEarnings.length);
  console.log("Grouped earnings:", Object.keys(groupedEarnings).length);

  // Calculate totals
  const totalEarnings = filteredEarnings.reduce((sum, record) => sum + record.amount, 0);
  const totalQuantity = filteredEarnings.reduce((sum, record) => sum + record.quantity, 0);

  // Chart calculations
  const chartHeight = 250;
  const maxEarnings = Math.max(...filteredEarnings.map((d) => d.amount), 1);
  const getBarHeight = (amount: number) => Math.max((amount / maxEarnings) * (chartHeight - 60), 20);

  const handleFilterPress = () => {
    setShowDatePicker(true);
  };

  const handlePresetSelect = (range: "7d" | "30d" | "90d") => {
    setSelectedRange(range);
    setShowDatePicker(false);
  };

  const handleCustomDateSelect = () => {
    if (!customStartDate || !customEndDate) {
      Alert.alert("Lỗi", "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc");
      return;
    }
    if (new Date(customStartDate) > new Date(customEndDate)) {
      Alert.alert("Lỗi", "Ngày bắt đầu không thể sau ngày kết thúc");
      return;
    }
    setSelectedRange("custom");
    setShowDatePicker(false);
  };

  return (
    <SectionCard>
      <View style={{ gap: 16 }}>
        {/* Header */}
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
            <FontAwesome name="money" size={16} color={isDark ? colors.textHigh : colors.accent} />
          </View>
          <View>
            <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
              Quản lý thu nhập
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Theo dõi thu nhập theo thời gian
            </Text>
          </View>
        </View>

        {/* Interactive Date Picker */}
        <Pressable
          onPress={handleFilterPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="calendar" size={16} color={colors.accent} />
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
              {formatDateRange(dateRange.start, dateRange.end)}
            </Text>
          </View>
          <FontAwesome name="chevron-down" size={14} color={colors.textMedium} />
        </Pressable>

        {/* Summary Stats */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View
            style={{
              flex: 1,
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
              {formatCurrency(totalEarnings)}
            </Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 11,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Tổng thu nhập {selectedRange === "7d" ? "7 ngày" : selectedRange === "30d" ? "30 ngày" : "90 ngày"}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: colors.textHigh, fontSize: 20, fontWeight: "800" }}>{totalQuantity} sản phẩm</Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 11,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Tổng số lượng hoàn thành
            </Text>
          </View>
        </View>

        {/* Vertical Bar Chart */}
        {filteredEarnings.length > 0 && (
          <View>
            {/* Y-axis Label */}
            <View style={{ alignItems: "center", marginBottom: 8 }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Nghìn đồng
              </Text>
            </View>

            {/* Chart Container */}
            <View
              style={{
                height: chartHeight,
                backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: isDark ? colors.borderVariant : colors.border,
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              {sortedDates.map((date, index) => {
                const dayEarnings = groupedEarnings[date];
                const dayTotal = dayEarnings.reduce((sum, record) => sum + record.amount, 0);
                const barHeight = getBarHeight(dayTotal);
                const isToday = date === new Date().toISOString().split("T")[0];

                return (
                  <View
                    key={date}
                    style={{
                      flex: 1,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    {/* Amount Label */}
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 10,
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      {Math.round(dayTotal / 1000)}k
                    </Text>

                    {/* Bar */}
                    <View
                      style={{
                        width: "100%",
                        height: barHeight,
                        backgroundColor: isToday ? colors.accent : isDark ? "#C4B5FD" : "#A78BFA",
                        borderRadius: 8,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        minHeight: 20,
                      }}
                    />

                    {/* Date Label */}
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                        fontWeight: "600",
                        textAlign: "center",
                      }}
                    >
                      {formatShortDate(date)}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Chart Title */}
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginTop: 12,
                textAlign: "center",
              }}
            >
              Biểu đồ thu nhập từ {formatShortDate(dateRange.start)} đến {formatShortDate(dateRange.end)}
            </Text>
          </View>
        )}

        {/* Empty State */}
        {filteredEarnings.length === 0 && (
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
              <FontAwesome name="money" size={28} color={colors.textMedium} />
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
                Chưa có thu nhập
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Thu nhập sẽ hiển thị khi bạn hoàn thành công việc
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: isDark ? colors.surface : "#FFFFFF",
              borderRadius: 20,
              padding: 24,
              width: "100%",
              maxWidth: 400,
            }}
          >
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 20,
                fontWeight: "700",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Chọn khoảng thời gian
            </Text>

            {/* Preset Options */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 12,
                }}
              >
                Tùy chọn nhanh
              </Text>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {[
                  { key: "7d", label: "7 ngày" },
                  { key: "30d", label: "30 ngày" },
                  { key: "90d", label: "90 ngày" },
                ].map((range) => (
                  <Pressable
                    key={range.key}
                    onPress={() => handlePresetSelect(range.key as "7d" | "30d" | "90d")}
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderRadius: 12,
                      backgroundColor:
                        selectedRange === range.key ? colors.accent : isDark ? colors.surfaceVariant : "#f3f4f6",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: selectedRange === range.key ? "#FFFFFF" : colors.textHigh,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {range.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            {/* Custom Date Range */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 12,
                }}
              >
                Tùy chọn tùy chỉnh
              </Text>
              <View style={{ gap: 12 }}>
                <View>
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 12,
                      fontWeight: "500",
                      marginBottom: 6,
                    }}
                  >
                    Từ ngày
                  </Text>
                  <Pressable
                    onPress={() => {
                      // In a real app, you'd use a proper date picker library
                      Alert.alert("Chọn ngày", "Chức năng chọn ngày sẽ được tích hợp với thư viện date picker");
                    }}
                    style={{
                      padding: 12,
                      backgroundColor: isDark ? colors.surfaceVariant : "#f9fafb",
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : "#d1d5db",
                    }}
                  >
                    <Text
                      style={{
                        color: customStartDate ? colors.textHigh : colors.textMedium,
                        fontSize: 14,
                      }}
                    >
                      {customStartDate || "Chọn ngày bắt đầu"}
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 12,
                      fontWeight: "500",
                      marginBottom: 6,
                    }}
                  >
                    Đến ngày
                  </Text>
                  <Pressable
                    onPress={() => {
                      // In a real app, you'd use a proper date picker library
                      Alert.alert("Chọn ngày", "Chức năng chọn ngày sẽ được tích hợp với thư viện date picker");
                    }}
                    style={{
                      padding: 12,
                      backgroundColor: isDark ? colors.surfaceVariant : "#f9fafb",
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : "#d1d5db",
                    }}
                  >
                    <Text
                      style={{
                        color: customEndDate ? colors.textHigh : colors.textMedium,
                        fontSize: 14,
                      }}
                    >
                      {customEndDate || "Chọn ngày kết thúc"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => setShowDatePicker(false)}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: isDark ? colors.surfaceVariant : "#f3f4f6",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Hủy
                </Text>
              </Pressable>
              <Pressable
                onPress={handleCustomDateSelect}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  backgroundColor: colors.accent,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Áp dụng
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SectionCard>
  );
}

export default PerformanceEarningsCard;
