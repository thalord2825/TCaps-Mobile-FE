import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { BatchItem } from "../../data/sample-batches";

export interface BatchCardThemedProps {
  item: BatchItem;
  onViewDetails?: (id: string) => void;
  onApproveTransfer?: (id: string) => void;
}

function getStatusLabel(status: BatchItem["status"]) {
  if (status === "Completed") return "Hoàn tất";
  if (status === "QCPending") return "Chờ QC";
  return "Đang xử lý";
}

export function BatchCardThemed({ item, onViewDetails, onApproveTransfer }: BatchCardThemedProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const progress = Math.max(0, Math.min(1, item.doneQty / item.totalQty));

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
        borderRadius: 14,
        padding: 14,
        gap: 12,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.2 : 0.1,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      {/* Header: code pill + status */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
          }}
        >
          <Text
            style={{
              color: isDark ? "#0b1020" : "#FFFFFF",
              fontWeight: "800",
            }}
          >
            {item.productCode}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : colors.surfaceVariant,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 999,
            borderWidth: isDark ? 0 : 1,
            borderColor: isDark ? "transparent" : colors.border,
          }}
        >
          <Text
            style={{
              color: isDark ? colors.textMedium : colors.textHigh,
              fontSize: 12,
              fontWeight: isDark ? "400" : "600",
            }}
          >
            {getStatusLabel(item.status)}
          </Text>
        </View>
      </View>

      {/* Info rows */}
      <View style={{ gap: 6 }}>
        <Text
          style={{
            color: isDark ? colors.textHigh : colors.textHigh,
            fontWeight: "700",
          }}
        >
          {item.factory}
        </Text>
        <Text
          style={{
            color: isDark ? colors.textLow : colors.textLow,
          }}
        >
          {item.stage}
        </Text>
        <Text
          style={{
            color: isDark ? colors.textMuted : colors.textLow,
            fontSize: 12,
          }}
        >
          {item.doneQty}/{item.totalQty}
        </Text>
      </View>

      {/* Progress bar */}
      <View
        style={{
          height: 8,
          borderRadius: 999,
          backgroundColor: isDark ? "#151E2A" : colors.border,
          overflow: "hidden",
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

      {/* Actions */}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Xem chi tiết ${item.id}`}
          onPress={() => onViewDetails?.(item.id)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.border,
            backgroundColor: isDark ? "transparent" : colors.surfaceVariant,
          }}
        >
          <Text
            style={{
              color: isDark ? colors.textMedium : colors.textHigh,
              fontWeight: "700",
            }}
          >
            Xem chi tiết
          </Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Duyệt/Chuyển công đoạn ${item.id}`}
          onPress={() => onApproveTransfer?.(item.id)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: isDark ? "#1D2A3A" : colors.accent,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.accent,
          }}
        >
          <Text
            style={{
              color: isDark ? colors.accent : "#FFFFFF",
              fontWeight: "800",
            }}
          >
            Duyệt / Chuyển
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default BatchCardThemed;
