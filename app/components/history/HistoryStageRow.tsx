import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { StageDetail } from "../../data/sample-batches";

export interface HistoryStageRowProps {
  stage: StageDetail;
  isLast: boolean;
}

export function HistoryStageRow({ stage, isLast }: HistoryStageRowProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pass":
        return {
          color: isDark ? "#4ade80" : "#16a34a",
          bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        };
      case "Fail":
        return {
          color: isDark ? "#f87171" : "#dc2626",
          bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        };
      case "Pending":
        return {
          color: isDark ? "#fbbf24" : "#d97706",
          bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        };
      default:
        return { color: colors.textMedium, bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant };
    }
  };

  const statusStyle = getStatusColor(stage.qcStatus);

  const formatDuration = (hours: number) => {
    if (hours < 1) return "< 1h";
    if (hours < 24) return `${Math.round(hours)}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
    });
  };

  return (
    <View style={{ flexDirection: "row", marginBottom: 12 }}>
      {/* Timeline Connector */}
      <View style={{ alignItems: "center", marginRight: 16, width: 24 }}>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: statusStyle.color,
            borderWidth: 2,
            borderColor: isDark ? colors.surface : "#FFFFFF",
            marginBottom: 4,
          }}
        />
        {!isLast && (
          <View
            style={{
              width: 2,
              flex: 1,
              backgroundColor: isDark ? colors.borderVariant : colors.border,
              marginTop: 4,
            }}
          />
        )}
      </View>

      {/* Stage Content */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.borderVariant,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {/* Stage Header */}
          <View
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {stage.stageNumber}. {stage.stageName}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                }}
              >
                {stage.factory}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: statusStyle.bgColor,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: statusStyle.color,
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              {stage.qcStatus === "Pass" ? (
                <>
                  <FontAwesome name="check-circle" size={10} color={statusStyle.color} />
                  <Text style={{ color: statusStyle.color, fontSize: 11, fontWeight: "600" }}>Pass</Text>
                </>
              ) : stage.qcStatus === "Fail" ? (
                <>
                  <FontAwesome name="times-circle" size={10} color={statusStyle.color} />
                  <Text style={{ color: statusStyle.color, fontSize: 11, fontWeight: "600" }}>Fail</Text>
                </>
              ) : (
                <>
                  <FontAwesome name="clock-o" size={10} color={statusStyle.color} />
                  <Text style={{ color: statusStyle.color, fontSize: 11, fontWeight: "600" }}>Pending</Text>
                </>
              )}
            </View>
          </View>

          {/* Stage Details Grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            {/* Quantity */}
            <View style={{ flex: 1, minWidth: "45%" }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "600",
                  marginBottom: 2,
                }}
              >
                Số lượng
              </Text>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                {stage.quantity.toLocaleString()}
              </Text>
            </View>

            {/* Duration */}
            <View style={{ flex: 1, minWidth: "45%" }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "600",
                  marginBottom: 2,
                }}
              >
                Thời gian
              </Text>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                {formatDuration(stage.duration)}
              </Text>
            </View>

            {/* Date Range */}
            <View style={{ flex: 1, minWidth: "45%" }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "600",
                  marginBottom: 2,
                }}
              >
                Ngày thực hiện
              </Text>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                {formatDate(stage.startDate)} - {formatDate(stage.endDate)}
              </Text>
            </View>

            {/* Cost */}
            <View style={{ flex: 1, minWidth: "45%" }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "600",
                  marginBottom: 2,
                }}
              >
                Chi phí
              </Text>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  notation: "compact",
                }).format(stage.cost)}
              </Text>
            </View>
          </View>

          {/* Staff Assigned */}
          <View
            style={{
              marginTop: 12,
              paddingTop: 12,
              borderTopWidth: 1,
              borderTopColor: isDark ? colors.borderVariant : colors.border,
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 11,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              Nhân viên thực hiện
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
              {stage.staffAssigned.map((staff, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "20",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.accent + "40",
                  }}
                >
                  <Text
                    style={{
                      color: isDark ? colors.accent : colors.accent,
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    {staff}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Notes */}
          {stage.notes && (
            <View
              style={{
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: isDark ? colors.borderVariant : colors.border,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <FontAwesome name="exclamation-triangle" size={12} color="#f59e0b" />
                <Text
                  style={{
                    color: "#f59e0b",
                    fontSize: 12,
                    fontWeight: "600",
                    flex: 1,
                  }}
                >
                  {stage.notes}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default HistoryStageRow;
