import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { formatCurrency } from "../../utils/formatters";
import { SectionCard } from "../common/section-card";
import { WelcomeSectionThemed } from "./welcome-section-themed";

export function AdminHomeContent() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // Admin-specific dashboard metrics
  const dashboardMetrics = [
    {
      label: "Tổng lô hàng",
      value: "24",
      icon: "cubes",
      color: isDark ? colors.accent : colors.textHigh,
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Đang sản xuất",
      value: "12",
      icon: "cog",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Hoàn thành",
      value: "8",
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Chờ QC",
      value: "4",
      icon: "clock-o",
      color: isDark ? "#f87171" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

  // Admin-specific quick actions
  const adminQuickActions = [
    {
      id: "create-product-code",
      label: "Tạo mã sản phẩm",
      icon: "qrcode",
      color: "#3b82f6",
      onPress: () => console.log("Create product code"),
    },
    {
      id: "manage-priority",
      label: "Quản lý ưu tiên",
      icon: "sort",
      color: "#3b82f6",
      onPress: () => console.log("Manage priority"),
    },
    {
      id: "factory-capacity",
      label: "Công suất nhà máy",
      icon: "bar-chart",
      color: "#3b82f6",
      onPress: () => console.log("Factory capacity"),
    },
    {
      id: "export-reports",
      label: "Xuất báo cáo",
      icon: "download",
      color: "#3b82f6",
      onPress: () => router.push("/analytics/admin"),
    },
  ];

  // Mock factory performance data
  const factoryPerformance = [
    { name: "Xưởng Cắt Vải", batches: 8, quality: 95, efficiency: 92 },
    { name: "Xưởng Thêu", batches: 6, quality: 98, efficiency: 88 },
    { name: "Xưởng In", batches: 5, quality: 90, efficiency: 85 },
    { name: "Xưởng May", batches: 7, quality: 93, efficiency: 90 },
  ];

  // Mock financial data
  const financialData = {
    productionCost: 45000000,
    revenueProjection: 65000000,
    materialTrend: { value: -5.2, isPositive: false },
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ gap: 8 }}>
        {/* Welcome Section */}
        <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

        {/* Quick Actions */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng quản trị</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {adminQuickActions.map((action) => (
                <Pressable
                  key={action.id}
                  onPress={action.onPress}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: action.color,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome name={action.icon as any} size={16} color="#FFFFFF" />
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
        </SectionCard>

        {/* Compact Stats Header */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tổng quan</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {dashboardMetrics.map((metric, index) => (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    backgroundColor: metric.bgColor,
                    padding: 8,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                    alignItems: "center",
                  }}
                >
                  <FontAwesome name={metric.icon as any} size={16} color={metric.color} />
                  <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600", marginTop: 2 }}>
                    {metric.value}
                  </Text>
                  <Text style={{ color: colors.textLow, fontSize: 10, textAlign: "center" }}>{metric.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </SectionCard>

        {/* Production Performance Dashboard */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Hiệu suất sản xuất nhà máy</Text>
            <View style={{ gap: 6 }}>
              {factoryPerformance.map((factory, index) => (
                <View
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: isDark ? colors.background : "#FFFFFF",
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textHigh }}>{factory.name}</Text>
                    <View
                      style={{
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        backgroundColor:
                          factory.efficiency >= 90 ? "#4ade8040" : factory.efficiency >= 85 ? "#fbbf2440" : "#ef444440",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "600",
                          color:
                            factory.efficiency >= 90 ? "#4ade80" : factory.efficiency >= 85 ? "#fbbf24" : "#ef4444",
                        }}
                      >
                        {factory.efficiency}%
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", gap: 12 }}>
                    <Text style={{ fontSize: 10, color: colors.textLow }}>{factory.batches} lô</Text>
                    <Text style={{ fontSize: 10, color: colors.textLow }}>•</Text>
                    <Text style={{ fontSize: 10, color: colors.textLow }}>{factory.quality}% chất lượng</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SectionCard>

        {/* Financial Overview */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tổng quan tài chính</Text>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: isDark ? colors.background : "#FFFFFF",
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <Text style={{ fontSize: 10, color: colors.textLow, marginBottom: 4 }}>Chi phí sản xuất</Text>
                <Text style={{ fontSize: 14, fontWeight: "700", color: colors.textHigh }}>
                  {formatCurrency(financialData.productionCost)}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                  backgroundColor: isDark ? colors.background : "#FFFFFF",
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <Text style={{ fontSize: 10, color: colors.textLow, marginBottom: 4 }}>Dự kiến doanh thu</Text>
                <Text style={{ fontSize: 14, fontWeight: "700", color: colors.success }}>
                  {formatCurrency(financialData.revenueProjection)}
                </Text>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                backgroundColor: isDark ? colors.background : "#FFFFFF",
                borderRadius: 6,
                borderWidth: 1,
                borderLeftWidth: 3,
                borderLeftColor: financialData.materialTrend.isPositive ? "#4ade80" : "#ef4444",
                borderColor: isDark ? colors.borderVariant : colors.border,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <FontAwesome
                  name={financialData.materialTrend.isPositive ? "arrow-up" : "arrow-down"}
                  size={12}
                  color={financialData.materialTrend.isPositive ? "#4ade80" : "#ef4444"}
                />
                <Text style={{ fontSize: 12, color: colors.textHigh }}>
                  Chi phí nguyên liệu {Math.abs(financialData.materialTrend.value)}%
                </Text>
              </View>
            </View>
          </View>
        </SectionCard>

        {/* System Status */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Trạng thái hệ thống</Text>
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 8,
                  backgroundColor: isDark ? colors.background : "#FFFFFF",
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#4ade80",
                    }}
                  />
                  <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>
                    Tất cả nhà máy hoạt động bình thường
                  </Text>
                </View>
                <Text style={{ color: colors.textLow, fontSize: 10 }}>99.8%</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 8,
                  backgroundColor: isDark ? colors.background : "#FFFFFF",
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "#fbbf24",
                    }}
                  />
                  <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>
                    Cần cập nhật nguyên liệu
                  </Text>
                </View>
                <Text style={{ color: colors.textLow, fontSize: 10 }}>3 loại</Text>
              </View>
            </View>
          </View>
        </SectionCard>
      </View>
    </ScrollView>
  );
}
