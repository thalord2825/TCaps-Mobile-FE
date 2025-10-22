import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

export interface WelcomeCardThemedProps {
  userName: string;
  role: "Admin" | "Lead" | "QC" | "Staff" | "Courier";
  unreadCount?: number;
  onPressBell?: () => void;
  avatarUri?: string;
}

export function WelcomeCardThemed({ userName, role, unreadCount = 0, onPressBell, avatarUri }: WelcomeCardThemedProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const gradientColors = isDark ? ["#0A0F1A", "#151B2E", "#1A2332"] : ["#2C3E50", "#34495E", "#5D6D7E"];

  return (
    <LinearGradient
      colors={gradientColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 20,
        padding: 24,
        gap: 16,
        shadowColor: isDark ? "#000" : colors.accent,
        shadowOpacity: isDark ? 0.4 : 0.3,
        shadowRadius: 16,
        elevation: 6,
        minHeight: 160,
        borderWidth: 1,
        borderColor: isDark ? "#2A3340" : "#FFFFFF",
      }}
    >
      {/* Top Row */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        {/* Left block: Avatar + Greeting */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16, flex: 1 }}>
          <View
            accessibilityLabel="User avatar"
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: isDark ? colors.accent : "#FFFFFF",
              shadowColor: isDark ? colors.accent : "#FFFFFF",
              shadowOpacity: isDark ? 0.3 : 0.5,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={{ width: "100%", height: "100%" }} />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isDark ? "#1A2332" : "rgba(255,255,255,0.2)",
                }}
              >
                <FontAwesome name="user" color={isDark ? colors.accent : "#FFFFFF"} size={isDark ? 26 : 30} />
              </View>
            )}
          </View>

          <View style={{ gap: 10, flexShrink: 1 }}>
            <Text
              accessibilityRole="header"
              style={{
                color: "#FFFFFF",
                fontSize: 18,
                fontWeight: "800",
                textShadowColor: isDark ? "transparent" : "rgba(0,0,0,0.3)",
                textShadowOffset: isDark ? { width: 0, height: 0 } : { width: 1, height: 1 },
                textShadowRadius: isDark ? 0 : 2,
              }}
            >
              Chào mừng trở lại
            </Text>
            <View
              style={{
                alignSelf: "flex-start",
                backgroundColor: isDark ? colors.accent : "#FFFFFF",
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 999,
                shadowColor: isDark ? colors.accent : "#000",
                shadowOpacity: isDark ? 0.3 : 0.2,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  color: isDark ? "#0b1020" : colors.accent,
                  fontWeight: "800",
                  fontSize: 14,
                }}
              >
                {userName}
              </Text>
            </View>
          </View>
        </View>

        {/* Right block: Bell + Status */}
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Pressable
            accessibilityLabel="Notifications"
            hitSlop={10}
            onPress={onPressBell}
            style={{ position: "relative" }}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: isDark ? colors.surfaceVariant : "rgba(255,255,255,0.2)",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: isDark ? colors.borderVariant : "rgba(255,255,255,0.4)",
              }}
            >
              <FontAwesome name="bell-o" size={20} color={isDark ? colors.accent : "#FFFFFF"} />
            </View>
            {unreadCount > 0 ? (
              <View
                style={{
                  position: "absolute",
                  right: isDark ? -2 : -4,
                  top: isDark ? -2 : -4,
                  backgroundColor: colors.error,
                  borderRadius: 999,
                  minWidth: 18,
                  height: 18,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: 2,
                  shadowColor: colors.error,
                  shadowOpacity: 0.6,
                  shadowRadius: 4,
                  elevation: 3,
                  borderWidth: 0,
                  borderColor: "transparent",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
        </View>
      </View>

      {/* Enhanced Glass Row */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isDark ? "rgba(122, 162, 255, 0.08)" : "rgba(255,255,255,0.15)",
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: isDark ? "rgba(122, 162, 255, 0.2)" : "rgba(255,255,255,0.3)",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <FontAwesome name="id-badge" size={16} color={isDark ? colors.accent : "#FFFFFF"} />
          <Text
            style={{
              color: isDark ? colors.accent : "#FFFFFF",
              fontSize: 15,
              fontWeight: "700",
              textShadowColor: isDark ? "transparent" : "rgba(0,0,0,0.3)",
              textShadowOffset: isDark ? { width: 0, height: 0 } : { width: 1, height: 1 },
              textShadowRadius: isDark ? 0 : 1,
            }}
          >
            {`Vai trò: ${role}`}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default WelcomeCardThemed;
