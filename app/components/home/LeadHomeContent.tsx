import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, RefreshControl, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { sampleBatches } from "../../data/sample-batches";
import { formatRelativeTime, getTimeRemaining, getUrgencyColor } from "../../utils/formatters";
import { BatchCardThemed } from "../batches/batch-card-themed";
import { BatchSectionHeader as BatchSectionHeaderThemed } from "../batches/batch-section-header";
import { SectionCard } from "../common/section-card";
import { WelcomeSectionThemed } from "./welcome-section-themed";

export function LeadHomeContent() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // State management
  const [selectedFactory, setSelectedFactory] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Get batches with upcoming deadlines (next 24 hours)
  const upcomingDeadlines = sampleBatches
    .filter((batch) => {
      if (!batch.deadline) return false;
      const deadline = new Date(batch.deadline);
      const now = new Date();
      const diffHours = (deadline.getTime() - now.getTime()) / 3600000;
      return diffHours > 0 && diffHours <= 24;
    })
    .slice(0, 3);

  // Mock recent activities data
  const recentActivities = [
    {
      id: 1,
      time: new Date(Date.now() - 5 * 60000),
      icon: "exchange",
      description: "Lô B-001 chuyển đến Xưởng In",
      actor: "Lead Hùng",
    },
    {
      id: 2,
      time: new Date(Date.now() - 15 * 60000),
      icon: "check-circle",
      description: "QC hoàn tất lô B-003",
      actor: "QC Lan",
    },
    {
      id: 3,
      time: new Date(Date.now() - 45 * 60000),
      icon: "shopping-cart",
      description: "Yêu cầu vật liệu được duyệt",
      actor: "Staff Hoa",
    },
    {
      id: 4,
      time: new Date(Date.now() - 120 * 60000),
      icon: "exchange",
      description: "Lô B-005 chuyển đến Xưởng Thêu",
      actor: "Lead Hùng",
    },
    {
      id: 5,
      time: new Date(Date.now() - 180 * 60000),
      icon: "check-circle",
      description: "QC hoàn tất lô B-002",
      actor: "QC Lan",
    },
  ];

  // Available factories
  const factories = [
    { id: "all", name: "Tất cả nhà máy", color: colors.accent },
    { id: "factory_a", name: "Nhà máy A - Cắt vải", color: "#3b82f6" },
    { id: "factory_b", name: "Nhà máy B - Thêu", color: "#10b981" },
    { id: "factory_c", name: "Nhà máy C - In", color: "#f59e0b" },
    { id: "factory_d", name: "Nhà máy D - May vành", color: "#ef4444" },
  ];

  // Lead-specific dashboard metrics for all factories
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

  // Lead-specific quick actions
  const leadQuickActions = [
    {
      id: "manage-batches",
      label: "Quản lý lô hàng",
      icon: "clipboard",
      color: "#3b82f6",
      onPress: () => console.log("Manage batches"),
    },
    {
      id: "assign-tasks",
      label: "Phân công công việc",
      icon: "tasks",
      color: "#3b82f6",
      onPress: () => console.log("Assign tasks"),
    },
    {
      id: "quality-control",
      label: "Kiểm soát chất lượng",
      icon: "check-circle",
      color: "#3b82f6",
      onPress: () => console.log("Quality control"),
    },
    {
      id: "factory-overview",
      label: "Báo cáo sản xuất",
      icon: "bar-chart",
      color: "#3b82f6",
      onPress: () => router.push("/analytics/lead"),
    },
  ];

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={colors.accent}
          colors={[colors.accent]}
        />
      }
    >
      <View style={{ gap: 8 }}>
        {/* Welcome Section */}
        <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

        {/* Quick Actions */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng quản lý</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {leadQuickActions.map((action) => (
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
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
              Tổng quan {selectedFactory !== "all" ? factories.find((f) => f.id === selectedFactory)?.name : ""}
            </Text>
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

        {/* Upcoming Deadlines */}
        {upcomingDeadlines.length > 0 && (
          <SectionCard>
            <View style={{ gap: 8 }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Hạn chót sắp tới (24h)</Text>
              <View style={{ gap: 6 }}>
                {upcomingDeadlines.map((batch) => {
                  const remaining = batch.deadline
                    ? getTimeRemaining(new Date(batch.deadline))
                    : { hours: 0, minutes: 0, display: "Không có hạn" };
                  const urgencyColor = getUrgencyColor(remaining.hours);
                  return (
                    <View
                      key={batch.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: 12,
                        backgroundColor: isDark ? colors.background : "#FFFFFF",
                        borderRadius: 8,
                        borderWidth: 1,
                        borderLeftWidth: 4,
                        borderLeftColor: urgencyColor,
                        borderColor: isDark ? colors.borderVariant : colors.border,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "700" }}>{batch.id}</Text>
                        <Text style={{ color: colors.textLow, fontSize: 12 }}>{batch.factory}</Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ color: urgencyColor, fontSize: 12, fontWeight: "700" }}>
                          {remaining.display}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </SectionCard>
        )}

        {/* Recent Activity */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Hoạt động gần đây</Text>
            <View style={{ gap: 8 }}>
              {recentActivities.map((activity) => (
                <View key={activity.id} style={{ flexDirection: "row", gap: 8 }}>
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: colors.accent,
                      marginTop: 4,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 2 }}>
                      <FontAwesome name={activity.icon as any} size={12} color={colors.accent} />
                      <Text style={{ fontSize: 12, color: colors.textHigh, fontWeight: "600" }}>
                        {activity.description}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <Text style={{ fontSize: 10, color: colors.textLow }}>{activity.actor}</Text>
                      <Text style={{ fontSize: 10, color: colors.textLow }}>•</Text>
                      <Text style={{ fontSize: 10, color: colors.textLow }}>{formatRelativeTime(activity.time)}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </SectionCard>

        {/* Current Batches */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Lô hàng hiện tại</Text>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>{sampleBatches.length} lô • 3 lô khẩn cấp</Text>
            <View style={{ gap: 8 }}>
              <BatchSectionHeaderThemed
                selectedFactory={selectedFactory}
                onFactoryChange={setSelectedFactory}
                factories={factories}
              />
              {sampleBatches.slice(0, 3).map((item) => (
                <View key={item.id}>
                  <BatchCardThemed item={item} />
                </View>
              ))}
              {sampleBatches.length > 3 && (
                <View
                  style={{
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    borderRadius: 8,
                    padding: 12,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.accent,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.accent,
                      fontSize: 14,
                      fontWeight: "700",
                    }}
                  >
                    +{sampleBatches.length - 3} lô hàng khác
                  </Text>
                </View>
              )}
            </View>
          </View>
        </SectionCard>
      </View>
    </ScrollView>
  );
}
