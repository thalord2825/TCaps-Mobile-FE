import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { getDeliveryStats, sampleDeliveries } from "../../data/sample-deliveries";
import { formatRelativeTime } from "../../utils/formatters";
import { SectionCard } from "../common/section-card";
import { WelcomeSectionThemed } from "./welcome-section-themed";

export function CourierHomeContent() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // Get delivery stats
  const deliveryStats = getDeliveryStats();

  // Courier-specific dashboard metrics
  const dashboardMetrics = [
    {
      label: "Chờ giao",
      value: deliveryStats.pendingDeliveries.toString(),
      icon: "clock-o",
      color: isDark ? "#f87171" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Đang giao",
      value: deliveryStats.inTransitDeliveries.toString(),
      icon: "truck",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Đã giao hôm nay",
      value: deliveryStats.deliveredDeliveries.toString(),
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Thất bại/Trả về",
      value: (deliveryStats.failedDeliveries + deliveryStats.returnedDeliveries).toString(),
      icon: "times-circle",
      color: isDark ? "#ef4444" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

  // Courier-specific quick actions
  const courierQuickActions = [
    {
      id: "view-route",
      label: "Xem tuyến đường",
      icon: "map",
      color: "#3b82f6",
      onPress: () => console.log("View route"),
    },
    {
      id: "update-status",
      label: "Cập nhật trạng thái",
      icon: "edit",
      color: "#3b82f6",
      onPress: () => console.log("Update status"),
    },
    {
      id: "contact-customer",
      label: "Liên hệ khách hàng",
      icon: "phone",
      color: "#3b82f6",
      onPress: () => console.log("Contact customer"),
    },
    {
      id: "report-issue",
      label: "Báo cáo sản xuất",
      icon: "bar-chart",
      color: "#3b82f6",
      onPress: () => router.push("/analytics/courier"),
    },
  ];

  // Get active deliveries (pending + in-transit)
  const activeDeliveries = sampleDeliveries.filter(
    (delivery) => delivery.status === "pending" || delivery.status === "in_transit"
  );

  // Get completed deliveries for today
  const completedDeliveries = sampleDeliveries.filter((delivery) => delivery.status === "delivered").slice(0, 5);

  // Helper functions
  const openMapsNavigation = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch((err) => console.error("Failed to open maps:", err));
  };

  const updateDeliveryStatus = (deliveryId: string, status: string) => {
    console.log(`Update delivery ${deliveryId} to status: ${status}`);
    // In real app, this would update the delivery status via API
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ gap: 8 }}>
        {/* Welcome Section */}
        <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

        {/* Quick Actions */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng giao hàng</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {courierQuickActions.map((action) => (
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
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tổng quan giao hàng</Text>
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

        {/* Active Deliveries */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Giao hàng đang hoạt động</Text>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>{activeDeliveries.length} đơn • 2 đơn đang giao</Text>
            {activeDeliveries.length > 0 ? (
              <View style={{ gap: 8 }}>
                {activeDeliveries.slice(0, 3).map((delivery) => (
                  <View
                    key={delivery.id}
                    style={{
                      backgroundColor: isDark ? colors.background : "#FFFFFF",
                      borderRadius: 8,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                    }}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "700" }}>
                          {delivery.batchName}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 12, marginTop: 2 }}>
                          Đến: {delivery.destination}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2 }}>{delivery.address}</Text>
                        <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2 }}>
                          Liên hệ: {delivery.contactName} - {delivery.contactPhone}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: delivery.status === "in_transit" ? "#f59e0b" : "#3b82f6",
                          paddingHorizontal: 6,
                          paddingVertical: 3,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "600" }}>
                          {delivery.status === "in_transit" ? "ĐANG GIAO" : "CHỜ GIAO"}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <FontAwesome name="road" size={10} color={colors.textLow} />
                        <Text style={{ color: colors.textLow, fontSize: 10 }}>{delivery.route.distance}km</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <FontAwesome name="clock-o" size={10} color={colors.textLow} />
                        <Text style={{ color: colors.textLow, fontSize: 10 }}>{delivery.route.estimatedTime} phút</Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <FontAwesome name="cube" size={10} color={colors.textLow} />
                        <Text style={{ color: colors.textLow, fontSize: 10 }}>
                          {delivery.items.reduce((sum, item) => sum + item.quantity, 0)} sản phẩm
                        </Text>
                      </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                      <Pressable
                        onPress={() => openMapsNavigation(delivery.address)}
                        style={{
                          flex: 1,
                          backgroundColor: colors.accent,
                          paddingVertical: 10,
                          paddingHorizontal: 12,
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <FontAwesome name="map-marker" size={14} color="#FFFFFF" />
                        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>Điều hướng</Text>
                      </Pressable>
                      <Pressable
                        onPress={() =>
                          updateDeliveryStatus(delivery.id, delivery.status === "pending" ? "in_transit" : "delivered")
                        }
                        style={{
                          flex: 1,
                          backgroundColor: delivery.status === "in_transit" ? "#4ade80" : "#f59e0b",
                          paddingVertical: 10,
                          paddingHorizontal: 12,
                          borderRadius: 8,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 6,
                        }}
                      >
                        <FontAwesome name="check" size={14} color="#FFFFFF" />
                        <Text style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>Cập nhật</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}

                {activeDeliveries.length > 3 && (
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
                      +{activeDeliveries.length - 3} đơn giao hàng khác
                    </Text>
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  borderRadius: 8,
                  padding: 16,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <FontAwesome name="check-circle" size={24} color={colors.success} />
                <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginTop: 6 }}>
                  Không có đơn giao hàng nào
                </Text>
                <Text style={{ color: colors.textLow, fontSize: 12, textAlign: "center", marginTop: 2 }}>
                  Tất cả đơn hàng đã được giao hoàn tất
                </Text>
              </View>
            )}
          </View>
        </SectionCard>

        {/* Today's Summary */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tóm tắt hôm nay</Text>
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng quãng đường</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>{deliveryStats.totalDistance} km</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng sản phẩm giao</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>{deliveryStats.totalItems} sản phẩm</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tỷ lệ thành công</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {deliveryStats.totalDeliveries > 0
                    ? Math.round((deliveryStats.deliveredDeliveries / deliveryStats.totalDeliveries) * 100)
                    : 0}
                  %
                </Text>
              </View>
            </View>
          </View>
        </SectionCard>

        {/* Recent Delivery History */}
        {completedDeliveries.length > 0 && (
          <SectionCard>
            <View style={{ gap: 8 }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Lịch sử giao hàng hôm nay</Text>
              <View style={{ gap: 6 }}>
                {completedDeliveries.map((delivery) => (
                  <View
                    key={delivery.id}
                    style={{
                      padding: 10,
                      backgroundColor: isDark ? colors.background : "#FFFFFF",
                      borderRadius: 6,
                      borderWidth: 1,
                      borderLeftWidth: 3,
                      borderLeftColor: "#4ade80",
                      borderColor: isDark ? colors.borderVariant : colors.border,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textHigh }}>
                      {delivery.batchName}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 10, color: colors.textLow }}>{delivery.destination}</Text>
                        <Text style={{ fontSize: 10, color: colors.textLow }}>
                          {delivery.route.distance}km • {delivery.route.estimatedTime} phút
                        </Text>
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 10, color: "#4ade80", fontWeight: "600" }}>Thành công</Text>
                        <Text style={{ fontSize: 9, color: colors.textLow }}>{formatRelativeTime(new Date())}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </SectionCard>
        )}
      </View>
    </ScrollView>
  );
}
