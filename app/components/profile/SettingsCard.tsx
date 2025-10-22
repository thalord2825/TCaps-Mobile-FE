import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Switch, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface SettingsCardProps {
  profile: ProfileData;
  onToggleNotification: (enabled: boolean) => void;
  onLanguageChange: (language: "vi" | "en") => void;
  onChangePassword: () => void;
  onHelpSupport: () => void;
  onLogout: () => void;
}

export function SettingsCard({
  profile,
  onToggleNotification,
  onLanguageChange,
  onChangePassword,
  onHelpSupport,
  onLogout,
}: SettingsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const getLanguageText = (lang: "vi" | "en") => {
    switch (lang) {
      case "vi":
        return "Tiếng Việt";
      case "en":
        return "English";
      default:
        return "Tiếng Việt";
    }
  };

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
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
            <FontAwesome name="cog" size={16} color={isDark ? colors.textHigh : colors.accent} />
          </View>
          <View>
            <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
              Cài đặt & Tùy chọn
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Quản lý tài khoản và ứng dụng
            </Text>
          </View>
        </View>

        {/* Notification Settings */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Thông báo
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Nhận thông báo về công việc và hệ thống
              </Text>
            </View>
            <Switch
              value={profile.notificationEnabled}
              onValueChange={onToggleNotification}
              trackColor={{ false: isDark ? "#374151" : "#e2e8f0", true: colors.accent }}
              thumbColor={profile.notificationEnabled ? "#FFFFFF" : isDark ? "#9ca3af" : "#f3f4f6"}
            />
          </View>
        </View>

        {/* Language Settings */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Ngôn ngữ
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            {[
              { key: "vi", label: "Tiếng Việt" },
              { key: "en", label: "English" },
            ].map((lang) => (
              <Pressable
                key={lang.key}
                onPress={() => onLanguageChange(lang.key as "vi" | "en")}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor:
                    profile.language === lang.key ? colors.accent : isDark ? colors.borderVariant : colors.border,
                  backgroundColor: profile.language === lang.key ? colors.accent : "transparent",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: profile.language === lang.key ? "#FFFFFF" : colors.textMedium,
                    fontSize: 14,
                    fontWeight: profile.language === lang.key ? "700" : "600",
                  }}
                >
                  {lang.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Account Actions */}
        <View style={{ gap: 12 }}>
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            Tài khoản
          </Text>

          <Pressable
            onPress={onChangePassword}
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
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="lock" size={16} color={colors.textMedium} />
              </View>
              <View>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 16,
                    fontWeight: "700",
                    marginBottom: 2,
                  }}
                >
                  Đổi mật khẩu
                </Text>
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  Cập nhật mật khẩu bảo mật
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.textMedium} />
          </Pressable>

          <Pressable
            onPress={onHelpSupport}
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
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="question-circle" size={16} color={colors.textMedium} />
              </View>
              <View>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 16,
                    fontWeight: "700",
                    marginBottom: 2,
                  }}
                >
                  Trợ giúp & Hỗ trợ
                </Text>
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 12,
                    fontWeight: "500",
                  }}
                >
                  Liên hệ và hướng dẫn sử dụng
                </Text>
              </View>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.textMedium} />
          </Pressable>
        </View>

        {/* App Info */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="info-circle" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Phiên bản ứng dụng: 1.0.0
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="calendar" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Cập nhật lần cuối: 15/12/2024
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="shield" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Bảo mật: Mã hóa SSL/TLS
            </Text>
          </View>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={onLogout}
          style={{
            backgroundColor: isDark ? "#dc2626" : "#ef4444",
            borderRadius: 12,
            padding: 16,
            alignItems: "center",
            gap: 8,
            shadowColor: isDark ? "#dc2626" : "#ef4444",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          <FontAwesome name="sign-out" size={16} color="#FFFFFF" />
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Đăng xuất
          </Text>
        </Pressable>
      </View>
    </SectionCard>
  );
}

export default SettingsCard;
