import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionCard } from "../components/common/section-card";
import { useTheme } from "../context/theme-context";
import { getUserStats, sampleUsers, User } from "../data/sample-users";

export default function Users() {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "active" | "inactive" | "pending">("all");

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const stats = getUserStats();

  // Filter users based on selected filter
  const filteredUsers = sampleUsers.filter((user) => {
    if (selectedFilter === "all") return true;
    return user.status === selectedFilter;
  });

  const renderUserCard = ({ item }: { item: User }) => (
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
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isDark ? colors.accent : colors.accent,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "700" }}>
                {item.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 2,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  color: colors.textLow,
                  fontSize: 14,
                }}
              >
                {item.role} • {item.department}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 16, marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Hiệu suất</Text>
              <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
                {item.performance.rating.toFixed(1)}/5.0
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Công việc</Text>
              <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
                {item.performance.completedTasks}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Thu nhập</Text>
              <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
                {item.performance.totalEarnings.toLocaleString()}đ
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <View
              style={{
                backgroundColor:
                  item.status === "active"
                    ? isDark
                      ? "#4ade8020"
                      : "#dcfce7"
                    : item.status === "inactive"
                      ? isDark
                        ? "#f8717120"
                        : "#fef2f2"
                      : isDark
                        ? "#fbbf2420"
                        : "#fef3c7",
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
                borderWidth: 1,
                borderColor:
                  item.status === "active"
                    ? isDark
                      ? "#4ade80"
                      : "#16a34a"
                    : item.status === "inactive"
                      ? isDark
                        ? "#f87171"
                        : "#dc2626"
                      : isDark
                        ? "#fbbf24"
                        : "#d97706",
              }}
            >
              <Text
                style={{
                  color:
                    item.status === "active"
                      ? isDark
                        ? "#4ade80"
                        : "#16a34a"
                      : item.status === "inactive"
                        ? isDark
                          ? "#f87171"
                          : "#dc2626"
                        : isDark
                          ? "#fbbf24"
                          : "#d97706",
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {item.status === "active" ? "Hoạt động" : item.status === "inactive" ? "Không hoạt động" : "Chờ duyệt"}
              </Text>
            </View>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>
              {new Date(item.lastActive).toLocaleDateString("vi-VN")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const filterButtons = [
    { key: "all", label: "Tất cả", count: stats.totalUsers },
    { key: "active", label: "Hoạt động", count: stats.activeUsers },
    { key: "inactive", label: "Không hoạt động", count: stats.inactiveUsers },
    { key: "pending", label: "Chờ duyệt", count: stats.pendingUsers },
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
          Quản lý người dùng
        </Text>
        <Pressable>
          <FontAwesome name="plus" size={20} color={isDark ? "#fff" : colors.textHigh} />
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
                  Tổng quan người dùng
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
                        backgroundColor: isDark ? "#7aa2ff" : colors.accent,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome name="users" size={18} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {stats.totalUsers}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Tổng người dùng
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
                      {stats.activeUsers}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Đang hoạt động
                    </Text>
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

            {/* Users List Header */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Danh sách người dùng
              </Text>
              <Text
                style={{
                  color: colors.textLow,
                  fontSize: 14,
                }}
              >
                {filteredUsers.length} người
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <FlatList
            data={filteredUsers}
            renderItem={renderUserCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        }
      />
    </SafeAreaView>
  );
}
