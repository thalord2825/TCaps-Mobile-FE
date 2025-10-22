import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { EarningsRecord } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface EarningsHistoryCardProps {
  earnings: EarningsRecord[];
  role: "Staff" | "QC";
}

export function EarningsHistoryCard({ earnings, role }: EarningsHistoryCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [expandedDate, setExpandedDate] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatShortDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  const getStatusColor = (status: "pending" | "paid") => {
    switch (status) {
      case "paid":
        return isDark ? "#4ade80" : "#16a34a";
      case "pending":
        return isDark ? "#fbbf24" : "#d97706";
      default:
        return colors.textMedium;
    }
  };

  const getStatusIcon = (status: "pending" | "paid") => {
    switch (status) {
      case "paid":
        return "check-circle";
      case "pending":
        return "clock-o";
      default:
        return "question-circle";
    }
  };

  const getStatusText = (status: "pending" | "paid") => {
    switch (status) {
      case "paid":
        return "Đã thanh toán";
      case "pending":
        return "Chờ thanh toán";
      default:
        return "Không xác định";
    }
  };

  // Calculate totals
  const totalEarnings = earnings.reduce((sum, record) => sum + record.amount, 0);
  const paidEarnings = earnings.filter((r) => r.status === "paid").reduce((sum, record) => sum + record.amount, 0);
  const pendingEarnings = earnings
    .filter((r) => r.status === "pending")
    .reduce((sum, record) => sum + record.amount, 0);
  const totalQuantity = earnings.reduce((sum, record) => sum + record.quantity, 0);

  // Group earnings by date
  const groupedEarnings = earnings.reduce(
    (acc, record) => {
      const date = record.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(record);
      return acc;
    },
    {} as Record<string, EarningsRecord[]>
  );

  const sortedDates = Object.keys(groupedEarnings).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const toggleExpanded = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
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
              <FontAwesome name="money" size={16} color={isDark ? colors.textHigh : colors.accent} />
            </View>
            <View>
              <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
                Lịch sử thu nhập
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Chi tiết thu nhập theo ngày
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              backgroundColor: colors.accent,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              Xuất báo cáo
            </Text>
          </Pressable>
        </View>

        {/* Summary Stats */}
        <View style={{ gap: 12 }}>
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
            <Text style={{ color: colors.accent, fontSize: 24, fontWeight: "800" }}>
              {formatCurrency(totalEarnings)}
            </Text>
            <Text
              style={{
                color: isDark ? colors.textLow : colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Tổng thu nhập tháng này
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: isDark ? "#374151" : "#e2e8f0",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text style={{ color: getStatusColor("paid"), fontSize: 18, fontWeight: "700" }}>
                {formatCurrency(paidEarnings)}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 10,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                ĐÃ THANH TOÁN
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: isDark ? "#374151" : "#e2e8f0",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Text style={{ color: getStatusColor("pending"), fontSize: 18, fontWeight: "700" }}>
                {formatCurrency(pendingEarnings)}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 10,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                CHỜ THANH TOÁN
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text style={{ color: colors.textHigh, fontSize: 20, fontWeight: "800" }}>
              {totalQuantity} {role === "Staff" ? "sản phẩm" : "kiểm tra"}
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              Tổng số lượng hoàn thành
            </Text>
          </View>
        </View>

        {/* Daily Breakdown */}
        <View>
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Chi tiết theo ngày
          </Text>
          <View style={{ gap: 8 }}>
            {sortedDates.map((date) => {
              const dayEarnings = groupedEarnings[date];
              const dayTotal = dayEarnings.reduce((sum, record) => sum + record.amount, 0);
              const dayQuantity = dayEarnings.reduce((sum, record) => sum + record.quantity, 0);
              const isExpanded = expandedDate === date;

              return (
                <View
                  key={date}
                  style={{
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                    overflow: "hidden",
                  }}
                >
                  <Pressable
                    onPress={() => toggleExpanded(date)}
                    style={{
                      padding: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: colors.textHigh,
                          fontSize: 14,
                          fontWeight: "700",
                          marginBottom: 4,
                        }}
                      >
                        {formatShortDate(date)}
                      </Text>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
                        <Text
                          style={{
                            color: colors.textMedium,
                            fontSize: 12,
                            fontWeight: "500",
                          }}
                        >
                          {dayQuantity} {role === "Staff" ? "sản phẩm" : "kiểm tra"}
                        </Text>
                        <Text
                          style={{
                            color: colors.accent,
                            fontSize: 14,
                            fontWeight: "700",
                          }}
                        >
                          {formatCurrency(dayTotal)}
                        </Text>
                      </View>
                    </View>
                    <FontAwesome
                      name={isExpanded ? "chevron-up" : "chevron-down"}
                      size={14}
                      color={colors.textMedium}
                    />
                  </Pressable>

                  {isExpanded && (
                    <View
                      style={{
                        borderTopWidth: 1,
                        borderTopColor: isDark ? colors.borderVariant : colors.border,
                        padding: 16,
                        gap: 12,
                      }}
                    >
                      {dayEarnings.map((record, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingVertical: 8,
                            paddingHorizontal: 12,
                            backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: isDark ? "#374151" : "#e2e8f0",
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <Text
                              style={{
                                color: colors.textHigh,
                                fontSize: 13,
                                fontWeight: "600",
                                marginBottom: 2,
                              }}
                            >
                              Lô {record.batchId} - {record.stage}
                            </Text>
                            <Text
                              style={{
                                color: colors.textMedium,
                                fontSize: 11,
                                fontWeight: "500",
                              }}
                            >
                              {record.quantity} × {formatCurrency(record.rate)}
                            </Text>
                          </View>
                          <View style={{ alignItems: "flex-end", gap: 4 }}>
                            <Text
                              style={{
                                color: colors.textHigh,
                                fontSize: 13,
                                fontWeight: "700",
                              }}
                            >
                              {formatCurrency(record.amount)}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <FontAwesome
                                name={getStatusIcon(record.status)}
                                size={10}
                                color={getStatusColor(record.status)}
                              />
                              <Text
                                style={{
                                  color: getStatusColor(record.status),
                                  fontSize: 10,
                                  fontWeight: "600",
                                }}
                              >
                                {getStatusText(record.status)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Empty State */}
        {earnings.length === 0 && (
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
    </SectionCard>
  );
}

export default EarningsHistoryCard;
