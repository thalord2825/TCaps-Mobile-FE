import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";

export interface ProfileQuickActionsProps {
  profile: ProfileData;
  onActionPress: (actionId: string) => void;
}

export function ProfileQuickActions({ profile, onActionPress }: ProfileQuickActionsProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // Fixed actions reflecting the four profile sections
  const actions = [
    { id: "stats", label: "Thống kê cá nhân", icon: "line-chart", color: isDark ? "#84cc16" : "#65a30d" },
    { id: "earnings", label: "Quản lý thu nhập", icon: "money", color: isDark ? "#60a5fa" : "#3b82f6" },
    { id: "contract", label: "Thông tin hợp đồng", icon: "file-text", color: isDark ? "#f59e0b" : "#d97706" },
    { id: "settings", label: "Cài đặt & Tùy chọn", icon: "cog", color: isDark ? "#a78bfa" : "#8b5cf6" },
  ];

  return (
    <View style={{ paddingHorizontal: 20 }}>
      {/* Header */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng</Text>
      </View>

      {/* Horizontal row of buttons with shared background */}
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        {actions.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => onActionPress(action.id)}
            style={{
              flex: 1,
              alignItems: "center",
              gap: 6,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: action.color,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name={action.icon as any} size={20} color="#FFFFFF" />
            </View>
            <Text
              numberOfLines={2}
              style={{ textAlign: "center", color: colors.textHigh, fontWeight: "600", fontSize: 10 }}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default ProfileQuickActions;
