import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BatchCardThemed } from "../components/batches/batch-card-themed";

// Alias base components as themed variants to satisfy usages below
import { BatchSectionHeader as BatchSectionHeaderThemed } from "../components/batches/batch-section-header";

import { RoleSwitcher } from "../components/common/role-switcher";
import { SectionCard } from "../components/common/section-card";
import { HomeQuickActions } from "../components/home/HomeQuickActions";
import { WelcomeSectionThemed } from "../components/home/welcome-section-themed";
import { useTheme } from "../context/theme-context";
import { useUser } from "../context/user-context";
import { sampleBatches } from "../data/sample-batches";

export default function Index() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  // State management
  const [refreshing, setRefreshing] = useState(false);

  const handleQuickAction = (actionId: string) => {
    // TODO: Implement quick action handlers
    console.log("Quick action:", actionId);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Dashboard metrics data with theme-aware colors
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
          Trang chủ
        </Text>
        <Pressable>
          <FontAwesome name="bell" size={20} color={isDark ? "#fff" : colors.textHigh} />
        </Pressable>
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
          <View style={{ gap: 12 }}>
            {/* Role Switcher - Developer Mode */}
            <RoleSwitcher />

            {/* Themed Welcome Section */}
            <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

            {/* Quick Actions */}
            <SectionCard>
              <HomeQuickActions onActionPress={handleQuickAction} />
            </SectionCard>

            {/* Themed Dashboard Metrics */}
            <SectionCard>
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 18,
                      fontWeight: "800",
                    }}
                  >
                    Tổng quan sản xuất
                  </Text>
                  <View
                    style={{
                      backgroundColor: colors.accent,
                      paddingHorizontal: isDark ? 8 : 12,
                      paddingVertical: isDark ? 4 : 6,
                      borderRadius: isDark ? 6 : 12,
                      shadowColor: colors.accent,
                      shadowOpacity: 0.3,
                      shadowRadius: isDark ? 8 : 8,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: isDark ? "#0b1020" : "#FFFFFF",
                        fontSize: isDark ? 10 : 11,
                        fontWeight: "700",
                      }}
                    >
                      HÔM NAY
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  {dashboardMetrics.map((metric, index) => (
                    <View
                      key={index}
                      style={{
                        width: "48%",
                        flexBasis: "48%",
                        maxWidth: "48%",
                        backgroundColor: metric.bgColor,
                        borderRadius: 12,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: isDark ? colors.borderVariant : metric.color,
                        alignItems: "center",
                        gap: 8,
                        shadowColor: isDark ? "#000" : metric.color,
                        shadowOpacity: 0.2,
                        shadowRadius: 8,
                        elevation: 3,
                      }}
                    >
                      <View
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                          backgroundColor: metric.color,
                          alignItems: "center",
                          justifyContent: "center",
                          shadowColor: metric.color,
                          shadowOpacity: 0.4,
                          shadowRadius: 8,
                          elevation: 4,
                        }}
                      >
                        {metric.icon === "cubes" && <FontAwesome name="cube" size={18} color="#FFFFFF" />}
                        {metric.icon === "cog" && <FontAwesome name="cog" size={18} color="#FFFFFF" />}
                        {metric.icon === "check-circle" && (
                          <FontAwesome name="check-circle" size={18} color="#FFFFFF" />
                        )}
                        {metric.icon === "clock-o" && <FontAwesome name="clock-o" size={18} color="#FFFFFF" />}
                      </View>
                      <Text
                        style={{
                          color: colors.textHigh,
                          fontSize: 20,
                          fontWeight: "800",
                        }}
                      >
                        {metric.value}
                      </Text>
                      <Text
                        style={{
                          color: colors.textLow,
                          fontSize: 12,
                          textAlign: "center",
                          fontWeight: "400",
                        }}
                      >
                        {metric.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </SectionCard>

            {/* Themed Batch Section */}
            <SectionCard>
              <View style={{ gap: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: isDark ? "#7aa2ff20" : colors.accent,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: isDark ? "#7aa2ff" : colors.accent,
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 3,
                      }}
                    >
                      <FontAwesome name="clipboard" size={16} color={isDark ? "#7aa2ff" : "#FFFFFF"} />
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 18,
                        fontWeight: "800",
                      }}
                    >
                      Lô hàng hiện tại
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: isDark ? "#1D2A3A" : colors.success,
                      paddingHorizontal: isDark ? 10 : 14,
                      paddingVertical: isDark ? 6 : 8,
                      borderRadius: isDark ? 8 : 12,
                      borderWidth: isDark ? 1 : 0,
                      borderColor: isDark ? colors.border : "transparent",
                      shadowColor: isDark ? "transparent" : colors.success,
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: isDark ? colors.accent : "#FFFFFF",
                        fontSize: isDark ? 12 : 13,
                        fontWeight: "700",
                      }}
                    >
                      {sampleBatches.length} lô
                    </Text>
                  </View>
                </View>

                <BatchSectionHeaderThemed />
                {sampleBatches.slice(0, 3).map((item) => (
                  <View key={item.id} style={{ marginTop: isDark ? 12 : 16 }}>
                    <BatchCardThemed item={item} />
                  </View>
                ))}

                {sampleBatches.length > 3 && (
                  <View
                    style={{
                      backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                      borderRadius: isDark ? 10 : 14,
                      padding: isDark ? 12 : 16,
                      borderWidth: isDark ? 1 : 2,
                      borderColor: isDark ? colors.borderVariant : colors.accent,
                      alignItems: "center",
                      shadowColor: isDark ? "transparent" : colors.accent,
                      shadowOpacity: isDark ? 0 : 0.2,
                      shadowRadius: 8,
                      elevation: isDark ? 0 : 2,
                    }}
                  >
                    <Text
                      style={{
                        color: isDark ? colors.accent : colors.accent,
                        fontSize: isDark ? 14 : 15,
                        fontWeight: "700",
                      }}
                    >
                      +{sampleBatches.length - 3} lô hàng khác
                    </Text>
                  </View>
                )}
              </View>
            </SectionCard>
          </View>
        }
      />
    </SafeAreaView>
  );
}
