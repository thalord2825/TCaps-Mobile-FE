import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { HistoryBatchItem } from "../../data/sample-history-batches";
import { HistoryStageRow } from "./HistoryStageRow";

export interface HistoryBatchCardProps {
  item: HistoryBatchItem;
  onViewDetails?: (batchId: string) => void;
}

export function HistoryBatchCard({ item, onViewDetails }: HistoryBatchCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return { color: "#10b981", bgColor: isDark ? "#0B0F18" : "#E8F8F5" };
      case "Cancelled":
        return { color: "#ef4444", bgColor: isDark ? "#0B0F18" : "#FADBD8" };
      case "Returned":
        return { color: "#f59e0b", bgColor: isDark ? "#0B0F18" : "#FFFBEB" };
      default:
        return { color: colors.textMedium, bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant };
    }
  };

  const statusStyle = getStatusColor(item.status);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const calculateDuration = () => {
    const start = new Date(item.startDate);
    const end = new Date(item.completionDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCompletionRate = () => {
    const completedStages = item.stages.filter((stage) => stage.qcStatus === "Pass").length;
    return Math.round((completedStages / item.stages.length) * 100);
  };

  const duration = calculateDuration();
  const completionRate = getCompletionRate();

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.border : colors.borderVariant,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}
    >
      {/* Batch Header */}
      <View
        style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            {item.id} - {item.productCode}
          </Text>
          <Text
            style={{
              color: colors.textMedium,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            Hoàn thành: {formatDate(item.completionDate)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: statusStyle.bgColor,
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: statusStyle.color,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          {item.status === "Completed" ? (
            <>
              <FontAwesome name="check-circle" size={14} color={statusStyle.color} />
              <Text style={{ color: statusStyle.color, fontSize: 13, fontWeight: "700" }}>Hoàn thành</Text>
            </>
          ) : item.status === "Cancelled" ? (
            <>
              <FontAwesome name="times-circle" size={14} color={statusStyle.color} />
              <Text style={{ color: statusStyle.color, fontSize: 13, fontWeight: "700" }}>Hủy bỏ</Text>
            </>
          ) : (
            <>
              <FontAwesome name="undo" size={14} color={statusStyle.color} />
              <Text style={{ color: statusStyle.color, fontSize: 13, fontWeight: "700" }}>Trả về</Text>
            </>
          )}
        </View>
      </View>

      {/* Compact Metrics Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "05",
          borderRadius: 8,
          padding: 12,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.accent + "15",
        }}
      >
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
            {item.totalQty.toLocaleString()}
          </Text>
          <Text style={{ color: colors.textMedium, fontSize: 10, fontWeight: "500" }}>Số lượng</Text>
        </View>

        <View style={{ width: 1, height: 24, backgroundColor: isDark ? colors.borderVariant : colors.accent + "20" }} />

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>{duration}</Text>
          <Text style={{ color: colors.textMedium, fontSize: 10, fontWeight: "500" }}>Ngày</Text>
        </View>

        <View style={{ width: 1, height: 24, backgroundColor: isDark ? colors.borderVariant : colors.accent + "20" }} />

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
            {formatCurrency(item.totalCost)}
          </Text>
          <Text style={{ color: colors.textMedium, fontSize: 10, fontWeight: "500" }}>Chi phí</Text>
        </View>

        <View style={{ width: 1, height: 24, backgroundColor: isDark ? colors.borderVariant : colors.accent + "20" }} />

        <View style={{ alignItems: "center", flex: 1 }}>
          <Text
            style={{
              color:
                completionRate >= 90
                  ? isDark
                    ? "#4ade80"
                    : "#16a34a"
                  : completionRate >= 70
                    ? isDark
                      ? "#fbbf24"
                      : "#d97706"
                    : isDark
                      ? "#f87171"
                      : "#dc2626",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {completionRate}%
          </Text>
          <Text style={{ color: colors.textMedium, fontSize: 10, fontWeight: "500" }}>Hoàn thành</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          style={{
            flex: 1,
            backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
            paddingVertical: 14,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.accent + "30",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Text
            style={{
              color: colors.accent,
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            {isExpanded ? "Ẩn chi tiết" : "Chi tiết giai đoạn"}
          </Text>
          <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={14} color={colors.accent} />
        </Pressable>

        <Pressable
          onPress={() => onViewDetails?.(item.id)}
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: 20,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Xem
          </Text>
        </Pressable>
      </View>

      {/* Expanded Stage Details */}
      {isExpanded && (
        <View
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTopWidth: 1,
            borderTopColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 16,
            }}
          >
            Chi tiết các giai đoạn ({item.stages.length} giai đoạn)
          </Text>

          <View style={{ marginLeft: 8 }}>
            {item.stages.map((stage, index) => (
              <HistoryStageRow key={stage.stageNumber} stage={stage} isLast={index === item.stages.length - 1} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default HistoryBatchCard;
