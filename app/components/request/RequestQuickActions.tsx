import { FontAwesome } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";

export interface RequestQuickActionsProps {
  selectedAction: string;
  onActionChange: (action: string) => void;
  urgentCount: number;
  pendingCount: number;
  todayCount: number;
}

export function RequestQuickActions({
  selectedAction,
  onActionChange,
  urgentCount,
  pendingCount,
  todayCount,
}: RequestQuickActionsProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const actions = [
    {
      id: "all",
      label: "Tất cả",
      icon: "list",
      count: null,
      color: colors.accent,
    },
    {
      id: "urgent",
      label: "Khẩn cấp",
      icon: "exclamation-triangle",
      count: urgentCount,
      color: "#ef4444",
      isUrgent: true,
    },
    {
      id: "today",
      label: "Hôm nay",
      icon: "calendar",
      count: todayCount,
      color: "#3b82f6",
    },
    {
      id: "pending",
      label: "Chờ duyệt",
      icon: "clock-o",
      count: pendingCount,
      color: "#f59e0b",
    },
    {
      id: "material",
      label: "Vật liệu",
      icon: "cube",
      count: null,
      color: "#8b5cf6",
    },
    {
      id: "correction",
      label: "Sửa chữa",
      icon: "wrench",
      count: null,
      color: "#f59e0b",
    },
  ];

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
        {actions.map((action) => {
          const isSelected = selectedAction === action.id;
          const hasCount = action.count !== null && action.count > 0;

          return (
            <Pressable
              key={action.id}
              onPress={() => onActionChange(action.id)}
              style={{
                backgroundColor: isSelected ? colors.accent : isDark ? colors.surfaceVariant : colors.surfaceVariant,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: isSelected ? colors.accent : isDark ? colors.borderVariant : colors.border,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                minWidth: 80,
                justifyContent: "center",
                shadowColor: isSelected ? colors.accent : "transparent",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: isSelected ? 3 : 0,
              }}
            >
              {/* Icon */}
              <View style={{ position: "relative" }}>
                <FontAwesome name={action.icon as any} size={14} color={isSelected ? "#FFFFFF" : action.color} />

                {/* Pulsing dot for urgent */}
                {action.isUrgent && hasCount && (
                  <View
                    style={{
                      position: "absolute",
                      top: -2,
                      right: -2,
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#ef4444",
                      opacity: 0.8,
                    }}
                  />
                )}
              </View>

              {/* Label */}
              <Text
                style={{
                  color: isSelected ? "#FFFFFF" : colors.textMedium,
                  fontSize: 13,
                  fontWeight: isSelected ? "700" : "600",
                }}
                numberOfLines={1}
              >
                {action.label}
              </Text>

              {/* Count Badge */}
              {hasCount && (
                <View
                  style={{
                    backgroundColor: isSelected ? "rgba(255, 255, 255, 0.2)" : action.color,
                    borderRadius: 10,
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    minWidth: 20,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: isSelected ? "#FFFFFF" : "#FFFFFF",
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    {action.count}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default RequestQuickActions;




