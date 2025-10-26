import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { BatchItem } from "../../data/sample-batches";
import { HistoryStageRow } from "../history/HistoryStageRow";

export interface BatchCardThemedProps {
  item: BatchItem;
  onViewDetails?: (id: string) => void;
  onApproveTransfer?: (id: string) => void;
}

function getStatusColor(status: BatchItem["status"], isDark: boolean, colors: any) {
  switch (status) {
    case "Completed":
      return { color: "#10b981", bgColor: isDark ? "#0B0F18" : "#E8F8F5" };
    case "QCPending":
      return { color: "#f59e0b", bgColor: isDark ? "#0B0F18" : "#FFFBEB" };
    case "InProgress":
      return { color: "#3b82f6", bgColor: isDark ? "#0B0F18" : "#EBF4FF" };
    default:
      return { color: colors.textMedium, bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant };
  }
}

export function BatchCardThemed({ item, onViewDetails, onApproveTransfer }: BatchCardThemedProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(false);

  const progress = Math.max(0, Math.min(1, item.doneQty / item.totalQty));
  const statusStyle = getStatusColor(item.status, isDark, colors);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount);
  };

  const calculateDuration = () => {
    const start = new Date(item.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getCompletionRate = () => {
    const completedStages = item.stages.filter((stage) => stage.qcStatus === "Pass").length;
    const totalExpectedStages = 17; // Total stages in hat production process
    return Math.round((completedStages / totalExpectedStages) * 100);
  };

  const duration = calculateDuration();
  const completionRate = getCompletionRate();

  // Filter stages to show only completed ones (Pass or Fail, not Pending)
  const completedStages = item.stages.filter((stage) => stage.qcStatus !== "Pending");

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
          <View
            style={{
              backgroundColor: colors.accent,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
              alignSelf: "flex-start",
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: isDark ? "#0b1020" : "#FFFFFF",
                fontWeight: "800",
                fontSize: 14,
              }}
            >
              {item.productCode}
            </Text>
          </View>
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            {item.factory}
          </Text>
          <Text
            style={{
              color: colors.textMedium,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {item.stage}
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
          ) : item.status === "QCPending" ? (
            <>
              <FontAwesome name="clock-o" size={14} color={statusStyle.color} />
              <Text style={{ color: statusStyle.color, fontSize: 13, fontWeight: "700" }}>Chờ QC</Text>
            </>
          ) : (
            <>
              <FontAwesome name="play-circle" size={14} color={statusStyle.color} />
              <Text style={{ color: statusStyle.color, fontSize: 13, fontWeight: "700" }}>Đang xử lý</Text>
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

      {/* Progress Bar */}
      <View
        style={{
          height: 8,
          borderRadius: 999,
          backgroundColor: isDark ? "#151E2A" : colors.border,
          overflow: "hidden",
          marginBottom: 16,
        }}
      >
        <View
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: colors.accent,
          }}
        />
      </View>

      {/* Action Buttons */}
      <View style={{ flexDirection: "row", gap: 12 }}>
        {completedStages.length > 0 && (
          <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              paddingVertical: 14,
              paddingHorizontal: 14,
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
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Duyệt/Chuyển công đoạn ${item.id}`}
          onPress={() => onApproveTransfer?.(item.id)}
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: 20,
            paddingVertical: 14,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
            }}
          >
            Duyệt
          </Text>
        </Pressable>
      </View>

      {/* Expanded Stage Details */}
      {isExpanded && completedStages.length > 0 && (
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
            Chi tiết các giai đoạn ({completedStages.length} giai đoạn)
          </Text>

          <View style={{ marginLeft: 8 }}>
            {completedStages.map((stage, index) => (
              <HistoryStageRow key={stage.stageNumber} stage={stage} isLast={index === completedStages.length - 1} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

export default BatchCardThemed;
