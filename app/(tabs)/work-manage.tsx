import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionCard } from "../components/common/section-card";
import { useTheme } from "../context/theme-context";
import { getWorkTaskStats, sampleWorkTasks, WorkTask } from "../data/sample-work-tasks";

export default function WorkManage() {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<"all" | "pending" | "in_progress" | "completed" | "on_hold">(
    "all"
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const stats = getWorkTaskStats();

  // Filter tasks based on selected filter
  const filteredTasks = sampleWorkTasks.filter((task) => {
    if (selectedFilter === "all") return true;
    return task.status === selectedFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return isDark ? "#fbbf24" : "#d97706";
      case "in_progress":
        return isDark ? "#3b82f6" : "#2563eb";
      case "completed":
        return isDark ? "#4ade80" : "#16a34a";
      case "on_hold":
        return isDark ? "#a78bfa" : "#7c3aed";
      case "cancelled":
        return isDark ? "#f87171" : "#dc2626";
      default:
        return colors.textLow;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thực hiện";
      case "in_progress":
        return "Đang thực hiện";
      case "completed":
        return "Hoàn thành";
      case "on_hold":
        return "Tạm dừng";
      case "cancelled":
        return "Đã hủy";
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

  const renderTaskCard = ({ item }: { item: WorkTask }) => (
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
            {item.stage} (Giai đoạn {item.stageNumber})
          </Text>
          <Text
            style={{
              color: colors.textLow,
              fontSize: 12,
            }}
          >
            {item.description}
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
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Số lượng</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
            {item.quantity.completed}/{item.quantity.required}
          </Text>
          <View
            style={{
              width: "100%",
              height: 4,
              backgroundColor: isDark ? colors.borderVariant : colors.border,
              borderRadius: 2,
              marginTop: 4,
            }}
          >
            <View
              style={{
                width: `${(item.quantity.completed / item.quantity.required) * 100}%`,
                height: 4,
                backgroundColor: getStatusColor(item.status),
                borderRadius: 2,
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Chất lượng</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>{item.quality.passRate}%</Text>
          <Text style={{ color: colors.textLow, fontSize: 12 }}>{item.quality.defects} lỗi</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
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
          Hạn: {new Date(item.deadline).toLocaleDateString("vi-VN")}
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 16, marginBottom: 8 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Thời gian</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>
            {item.actualHours ? `${item.actualHours}h` : `${item.estimatedHours}h`}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Nguyên liệu</Text>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>{item.materials.length} loại</Text>
        </View>
      </View>

      {item.quality.notes && (
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
          <Text style={{ color: colors.textLow, fontSize: 12, fontStyle: "italic" }}>{item.quality.notes}</Text>
        </View>
      )}

      {item.status === "in_progress" && (
        <View
          style={{
            backgroundColor: isDark ? "#3b82f620" : "#dbeafe",
            padding: 12,
            borderRadius: 8,
            marginTop: 8,
            borderWidth: 1,
            borderColor: isDark ? "#3b82f6" : "#3b82f6",
          }}
        >
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 4 }}>
            Tiến độ hiện tại
          </Text>
          <Text style={{ color: colors.textLow, fontSize: 12 }}>
            Đã hoàn thành {item.quantity.completed}/{item.quantity.required} sản phẩm
          </Text>
        </View>
      )}
    </View>
  );

  const filterButtons = [
    { key: "all", label: "Tất cả", count: stats.totalTasks },
    { key: "pending", label: "Chờ thực hiện", count: stats.pendingTasks },
    { key: "in_progress", label: "Đang thực hiện", count: stats.inProgressTasks },
    { key: "completed", label: "Hoàn thành", count: stats.completedTasks },
    { key: "on_hold", label: "Tạm dừng", count: stats.onHoldTasks },
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
          Quản lý công việc
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
                  Tổng quan công việc
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
                      <FontAwesome name="tasks" size={18} color="#FFFFFF" />
                    </View>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 20,
                        fontWeight: "800",
                      }}
                    >
                      {stats.totalTasks}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Tổng công việc
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
                      {stats.completedTasks}
                    </Text>
                    <Text
                      style={{
                        color: colors.textLow,
                        fontSize: 12,
                        textAlign: "center",
                        fontWeight: "400",
                      }}
                    >
                      Hoàn thành
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Tỷ lệ hoàn thành</Text>
                    <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
                      {stats.completionRate.toFixed(1)}%
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={{ color: colors.textLow, fontSize: 12, marginBottom: 2 }}>Chất lượng TB</Text>
                    <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
                      {stats.averageQuality.toFixed(1)}%
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

            {/* Tasks List Header */}
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "800",
                }}
              >
                Danh sách công việc
              </Text>
              <Text
                style={{
                  color: colors.textLow,
                  fontSize: 14,
                }}
              >
                {filteredTasks.length} công việc
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <FlatList
            data={filteredTasks}
            renderItem={renderTaskCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        }
      />
    </SafeAreaView>
  );
}
