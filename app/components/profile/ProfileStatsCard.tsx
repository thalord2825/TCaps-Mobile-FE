import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface ProfileStatsCardProps {
  profile: ProfileData;
}

export function ProfileStatsCard({ profile }: ProfileStatsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const getPerformanceColor = (value: number, type: "rate" | "score" | "count" = "rate") => {
    if (type === "rate" || type === "score") {
      if (value >= 90) return isDark ? "#4ade80" : "#16a34a";
      if (value >= 70) return isDark ? "#fbbf24" : "#d97706";
      return isDark ? "#f87171" : "#dc2626";
    }
    return colors.accent;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  // Role-based stats configuration
  const getStatsForRole = () => {
    switch (profile.role) {
      case "Staff":
        return [
          {
            label: "Sản phẩm",
            value: profile.totalProduction?.toString() || "0",
            icon: "cube",
            color: isDark ? "#3b82f6" : "#2563eb",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Tỷ lệ đạt",
            value: `${profile.qualityScore || 0}%`,
            icon: "check-circle",
            color: getPerformanceColor(profile.qualityScore || 0, "score"),
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "score" as const,
          },
          {
            label: "Thu nhập",
            value: profile.totalEarnings ? formatCurrency(profile.totalEarnings) : "0₫",
            icon: "money",
            color: isDark ? "#10b981" : "#059669",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Chất lượng",
            value: `${profile.qualityScore || 0}%`,
            icon: "star",
            color: getPerformanceColor(profile.qualityScore || 0, "score"),
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "score" as const,
          },
        ];

      case "QC":
        return [
          {
            label: "Kiểm tra",
            value: formatNumber(profile.totalInspections || 0),
            icon: "search",
            color: isDark ? "#3b82f6" : "#2563eb",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Tỷ lệ đạt",
            value: `${profile.qcPassRate || 0}%`,
            icon: "check-circle",
            color: getPerformanceColor(profile.qcPassRate || 0, "rate"),
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "rate" as const,
          },
          {
            label: "Hôm nay",
            value: "8", // This would come from daily data
            icon: "calendar",
            color: isDark ? "#f59e0b" : "#d97706",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Thời gian TB",
            value: "2.5h",
            icon: "clock-o",
            color: isDark ? colors.textHigh : colors.textHigh,
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
        ];

      case "Lead":
        return [
          {
            label: "Lô quản lý",
            value: formatNumber(profile.batchesManaged || 0),
            icon: "list-alt",
            color: isDark ? "#3b82f6" : "#2563eb",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Đội nhóm",
            value: profile.teamSize?.toString() || "0",
            icon: "users",
            color: isDark ? "#10b981" : "#059669",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Hoàn thành",
            value: "94%", // This would be calculated
            icon: "check-circle",
            color: getPerformanceColor(94, "rate"),
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "rate" as const,
          },
          {
            label: "Yêu cầu VL",
            value: "12", // This would come from material requests
            icon: "cube",
            color: isDark ? "#f59e0b" : "#d97706",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
        ];

      case "Admin":
        return [
          {
            label: "Người dùng",
            value: "156",
            icon: "users",
            color: isDark ? "#3b82f6" : "#2563eb",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Lô hoạt động",
            value: "23",
            icon: "list-alt",
            color: isDark ? "#10b981" : "#059669",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
          {
            label: "Hệ thống",
            value: "99.8%",
            icon: "server",
            color: getPerformanceColor(99.8, "rate"),
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "rate" as const,
          },
          {
            label: "Chờ duyệt",
            value: "7",
            icon: "clock-o",
            color: isDark ? "#f59e0b" : "#d97706",
            bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            type: "count" as const,
          },
        ];

      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
        {/* Enhanced Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isDark ? colors.accent : colors.accent,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <FontAwesome name="bar-chart" size={20} color={isDark ? colors.accent : colors.accent} />
            </View>
            <View>
              <Text
                style={{
                  color: isDark ? "#fff" : colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 2,
                }}
              >
                Thống kê cá nhân
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                Hiệu suất và thành tích
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.accent + "30",
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {profile.role}
            </Text>
          </View>
        </View>

        {/* Main Stats Grid */}
        <View style={{ gap: 12 }}>
          {/* First Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {stats.slice(0, 2).map((stat, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: isDark ? "#374151" : "#e2e8f0",
                  shadowColor: isDark ? "#000" : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: stat.color,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <FontAwesome name={stat.icon as any} size={16} color="#FFFFFF" />
                  </View>
                  <Text
                    style={{
                      color: colors.textMedium,
                      fontSize: 10,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
                <Text
                  style={{
                    color: isDark ? "#fff" : colors.textHigh,
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>

          {/* Second Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {stats.slice(2, 4).map((stat, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? "#1f2937" : "#f8fafc",
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: isDark ? "#374151" : "#e2e8f0",
                  shadowColor: isDark ? "#000" : "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: stat.color,
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <FontAwesome name={stat.icon as any} size={16} color="#FFFFFF" />
                  </View>
                  <Text
                    style={{
                      color: colors.textMedium,
                      fontSize: 10,
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {stat.label}
                  </Text>
                </View>
                <Text
                  style={{
                    color: isDark ? "#fff" : colors.textHigh,
                    fontSize: 18,
                    fontWeight: "700",
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SectionCard>
  );
}

export default ProfileStatsCard;
