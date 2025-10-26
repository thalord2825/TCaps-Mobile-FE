import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionCard } from "../components/common/section-card";
import { ThemeToggle } from "../components/common/theme-toggle";
import { useTheme } from "../context/theme-context";
import { useUser } from "../context/user-context";
import { Delivery as DeliveryType, getDeliveryStats, sampleDeliveries } from "../data/sample-deliveries";

export default function Delivery() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "in_transit" | "delivered" | "failed">(
    "all"
  );

  const handleQuickAction = (actionId: string) => {
    console.log("Quick action:", actionId);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const stats = getDeliveryStats();

  // Filter deliveries based on selected filter
  const filteredDeliveries = sampleDeliveries.filter((delivery) => {
    if (selectedFilter === "all") return true;
    return delivery.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return isDark ? "#fbbf24" : "#d97706";
      case "in_transit":
        return isDark ? "#3b82f6" : "#2563eb";
      case "delivered":
        return isDark ? "#4ade80" : "#16a34a";
      case "failed":
        return isDark ? "#f87171" : "#dc2626";
      case "returned":
        return isDark ? "#a78bfa" : "#7c3aed";
      default:
        return colors.textLow;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ giao";
      case "in_transit":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "failed":
        return "Thất bại";
      case "returned":
        return "Trả về";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return isDark ? "#f87171" : "#dc2626";
      case "high":
        return isDark ? "#fbbf24" : "#d97706";
      case "medium":
        return isDark ? "#3b82f6" : "#2563eb";
      case "low":
        return isDark ? "#4ade80" : "#16a34a";
      default:
        return colors.textLow;
    }
  };

  const renderDeliveryCard = ({ item }: { item: DeliveryType }) => (
    <View
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
        shadowColor: isDark ? "transparent" : "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
              marginBottom: 4,
            }}
          >
            {item.batchName}
          </Text>
          <Text
            style={{
              color: colors.textLow,
              fontSize: 14,
              marginBottom: 8,
            }}
          >
            {item.destination}
          </Text>
          <Text
            style={{
              color: colors.textLow,
              fontSize: 12,
            }}
          >
            {item.address}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: getStatusColor(item.status),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 16, marginBottom: 12 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Liên hệ</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>{item.contactName}</Text>
          <Text style={{ color: colors.textLow, fontSize: 12 }}>{item.contactPhone}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Phương tiện</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
            {item.vehicleType === "motorcycle" ? "Xe máy" : item.vehicleType === "truck" ? "Xe tải" : "Xe van"}
          </Text>
          <Text style={{ color: colors.textLow, fontSize: 12 }}>
            {item.route.distance}km • {item.route.estimatedTime}phút
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View
          style={{
            backgroundColor: getPriorityColor(item.priority),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {item.priority === "urgent"
              ? "Khẩn cấp"
              : item.priority === "high"
                ? "Cao"
                : item.priority === "medium"
                  ? "Trung bình"
                  : "Thấp"}
          </Text>
        </View>
        <Text style={{ color: colors.textLow, fontSize: 12 }}>
          {new Date(item.estimatedDelivery).toLocaleDateString("vi-VN")}
        </Text>
      </View>

      {item.notes && (
        <View
          style={{
            backgroundColor: isDark ? colors.surface : colors.surfaceVariant,
            padding: 8,
            borderRadius: 6,
            marginTop: 8,
            borderLeftWidth: 3,
            borderLeftColor: getStatusColor(item.status),
          }}
        >
          <Text style={{ color: colors.textLow, fontSize: 12, fontStyle: "italic" }}>{item.notes}</Text>
        </View>
      )}
    </View>
  );

  const filterButtons = [
    { key: "all", label: "Tất cả", count: stats.totalDeliveries },
    { key: "pending", label: "Chờ giao", count: stats.pendingDeliveries },
    { key: "in_transit", label: "Đang giao", count: stats.inTransitDeliveries },
    { key: "delivered", label: "Đã giao", count: stats.deliveredDeliveries },
    { key: "failed", label: "Thất bại", count: stats.failedDeliveries },
  ] as const;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.border : colors.borderVariant,
        }}
      >
        <Pressable>
          <FontAwesome name="bars" size={20} color={isDark ? "#fff" : colors.textHigh} />
        </Pressable>
        <Text
          style={{
            color: isDark ? "#fff" : colors.textHigh,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Giao hàng
        </Text>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <ThemeToggle />
          <Pressable>
            <FontAwesome name="map-marker" size={20} color={isDark ? "#fff" : colors.textHigh} />
          </Pressable>
        </View>
      </View>

      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        data={[{ key: "content" }]}
        renderItem={() => null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: 16 }}>
            {/* Stats Cards */}
            <SectionCard>
              <View style={{ gap: 16 }}>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 18,
                    fontWeight: "800",
                  }}
                >
                  Tổng quan giao hàng
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: "48%",
                      flexBasis: "48%",
                      maxWidth: "48%",
                      backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: isDark ? "#3b82f6" : "#2563eb",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome name="truck" size={18} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {stats.totalDeliveries}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Tổng đơn giao
                    </Text>
                  </View>

                  <View
                    style={{
                      width: "48%",
                      flexBasis: "48%",
                      maxWidth: "48%",
                      backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                      borderRadius: 12,
                      padding: 16,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: isDark ? "#4ade80" : "#16a34a",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome name="check-circle" size={18} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {stats.deliveredDeliveries}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Đã giao
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Tổng quãng đường</Text>
                    <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
                      {stats.totalDistance}km
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Tổng sản phẩm</Text>
                    <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>{stats.totalItems}</Text>
                  </View>
                </View>
              </View>
            </SectionCard>

            {/* Filter Buttons */}
            <SectionCard>
              <View style={{ gap: 12 }}>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  Bộ lọc
                </Text>
                <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
                  {filterButtons.map((filter) => (
                    <Pressable
                      key={filter.key}
                      onPress={() => setSelectedFilter(filter.key as any)}
                      style={{
                        backgroundColor:
                          selectedFilter === filter.key
                            ? isDark
                              ? colors.accent
                              : colors.accent
                            : isDark
                              ? colors.surfaceVariant
                              : colors.surfaceVariant,
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                        borderRadius: 8,
                        borderWidth: 1,
                        borderColor:
                          selectedFilter === filter.key
                            ? isDark
                              ? colors.accent
                              : colors.accent
                            : isDark
                              ? colors.borderVariant
                              : colors.border,
                      }}
                    >
                      <Text
                        style={{
                          color: selectedFilter === filter.key ? (isDark ? "#0b1020" : "#FFFFFF") : colors.textHigh,
                          fontSize: 14,
                          fontWeight: "600",
                        }}
                      >
                        {filter.label} ({filter.count})
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </SectionCard>

            {/* Deliveries List Header */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Danh sách giao hàng
              </Text>
              <Text
                style={{
                  color: colors.textLow,
                  fontSize: 14,
                }}
              >
                {filteredDeliveries.length} đơn
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <FlatList
            data={filteredDeliveries}
            renderItem={renderDeliveryCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        }
      />
    </SafeAreaView>
  );
}
