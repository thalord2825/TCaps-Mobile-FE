import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";

export interface BatchActionBarProps {
  visible: boolean;
  selectedCount: number;
  onApproveAll: () => void;
  onMarkViewed: () => void;
  onExport: () => void;
  onClearSelection: () => void;
  canApproveAll: boolean;
}

export function BatchActionBar({
  visible,
  selectedCount,
  onApproveAll,
  onMarkViewed,
  onExport,
  onClearSelection,
  canApproveAll,
}: BatchActionBarProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.surface,
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: isDark ? colors.border : colors.borderVariant,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Left: Selection Count */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            backgroundColor: colors.accent,
            borderRadius: 16,
            paddingHorizontal: 12,
            paddingVertical: 6,
            minWidth: 32,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            {selectedCount}
          </Text>
        </View>
        <Text
          style={{
            color: colors.textHigh,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          yêu cầu đã chọn
        </Text>
      </View>

      {/* Right: Action Buttons */}
      <View style={{ flexDirection: "row", gap: 8 }}>
        {/* Approve All Button */}
        {canApproveAll && (
          <Pressable
            onPress={onApproveAll}
            style={{
              backgroundColor: "#10b981",
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#10b981",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: "700",
              }}
            >
              Phê duyệt tất cả
            </Text>
          </Pressable>
        )}

        {/* Mark as Viewed Button */}
        <Pressable
          onPress={onMarkViewed}
          style={{
            backgroundColor: "transparent",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#3b82f6",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#3b82f6",
              fontSize: 13,
              fontWeight: "700",
            }}
          >
            Đánh dấu đã xem
          </Text>
        </Pressable>

        {/* Export Button */}
        <Pressable
          onPress={onExport}
          style={{
            backgroundColor: "transparent",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            gap: 6,
          }}
        >
          <FontAwesome name="download" size={12} color={colors.textMedium} />
          <Text
            style={{
              color: colors.textMedium,
              fontSize: 13,
              fontWeight: "700",
            }}
          >
            Xuất Excel
          </Text>
        </Pressable>

        {/* Clear Selection Button */}
        <Pressable
          onPress={onClearSelection}
          style={{
            backgroundColor: "transparent",
            paddingHorizontal: 12,
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name="times" size={16} color={colors.textMedium} />
        </Pressable>
      </View>
    </View>
  );
}

export default BatchActionBar;




