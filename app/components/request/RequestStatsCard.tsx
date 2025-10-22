import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { RequestItem } from "../../data/sample-requests";
import { SectionCard } from "../common/section-card";

export interface RequestStatsCardProps {
  requests: RequestItem[];
}

export function RequestStatsCard({ requests }: RequestStatsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  // Handle empty data gracefully
  const hasData = requests && requests.length > 0;

  // Calculate stats with fallbacks
  const totalRequests = requests?.length || 0;
  const pendingRequests = hasData ? requests.filter((r) => r.status === "pending").length : 0;
  const urgentRequests = hasData ? requests.filter((r) => r.priority === "urgent" && r.status === "pending").length : 0;
  const approvedToday = hasData
    ? requests.filter((r) => {
        const today = new Date().toISOString().split("T")[0];
        return r.status === "approved" && r.respondedDate?.split("T")[0] === today;
      }).length
    : 0;

  // Calculate average response time in hours
  const avgResponseTime = hasData
    ? requests
        .filter((r) => r.respondedDate)
        .reduce((sum, r) => {
          const created = new Date(r.createdDate);
          const responded = new Date(r.respondedDate!);
          const diffHours = (responded.getTime() - created.getTime()) / (1000 * 60 * 60);
          return sum + diffHours;
        }, 0) / requests.filter((r) => r.respondedDate).length
    : 0;

  const formatResponseTime = (hours: number) => {
    if (hours < 1) return "< 1h";
    if (hours < 24) return `${Math.round(hours)}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = Math.round(hours % 24);
    return remainingDays > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  const stats = [
    {
      label: "Chờ duyệt",
      value: pendingRequests.toString(),
      icon: "clock-o",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Khẩn cấp",
      value: urgentRequests.toString(),
      icon: "exclamation-triangle",
      color: isDark ? "#f87171" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
      isUrgent: true,
    },
    {
      label: "Duyệt hôm nay",
      value: approvedToday.toString(),
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Thời gian TB",
      value: formatResponseTime(avgResponseTime),
      icon: "hourglass-half",
      color: isDark ? colors.textHigh : colors.textHigh,
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

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
                backgroundColor: isDark ? "#dc2626" : "#ef4444",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isDark ? "#dc2626" : "#ef4444",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <FontAwesome name="bell" size={20} color="#FFFFFF" />
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
                Thống kê yêu cầu
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                Tổng quan quản lý yêu cầu
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: hasData
                ? isDark
                  ? "#dc2626"
                  : "#ef4444"
                : isDark
                  ? colors.surfaceVariant
                  : colors.surfaceVariant,
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: hasData ? 0 : 1,
              borderColor: hasData ? "transparent" : colors.border,
              shadowColor: hasData ? (isDark ? "#dc2626" : "#ef4444") : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: hasData ? "#FFFFFF" : colors.textMedium,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {totalRequests} yêu cầu
            </Text>
          </View>
        </View>

        {hasData ? (
          <View style={{ gap: 12 }}>
            {/* Main Stats Row */}
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
                    position: "relative",
                  }}
                >
                  {/* Pulsing animation for urgent requests */}
                  {stat.isUrgent && urgentRequests > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#ef4444",
                        opacity: 0.8,
                      }}
                    />
                  )}

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

            {/* Secondary Stats Row */}
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
        ) : (
          <View
            style={{
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderRadius: 20,
              padding: 32,
              alignItems: "center",
              gap: 16,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e2e8f0",
              borderStyle: "dashed",
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: isDark ? "#374151" : "#e2e8f0",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="bell-o" size={28} color={colors.textMedium} />
            </View>
            <View style={{ alignItems: "center", gap: 8 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Chưa có yêu cầu nào
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Thống kê sẽ hiển thị khi có yêu cầu từ nhân viên
              </Text>
            </View>
          </View>
        )}
      </View>
    </SectionCard>
  );
}

export default RequestStatsCard;
