import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { getStaffTaskStats, sampleStaffTasks } from "../../data/sample-staff-tasks";
import { formatCurrency } from "../../utils/formatters";
import { SectionCard } from "../common/section-card";
import { WelcomeSectionThemed } from "./welcome-section-themed";

export function StaffHomeContent() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // Get staff task stats
  const taskStats = getStaffTaskStats();

  // Staff-specific dashboard metrics
  const dashboardMetrics = [
    {
      label: "Công việc hôm nay",
      value: taskStats.totalTasks.toString(),
      icon: "tasks",
      color: isDark ? colors.accent : colors.textHigh,
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Đã hoàn thành",
      value: taskStats.completedTasks.toString(),
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Thu nhập hôm nay",
      value: `${Math.round(taskStats.totalEarnings / 1000)}K`,
      icon: "money",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Điểm chất lượng",
      value: Math.round(taskStats.averageQualityScore).toString(),
      icon: "star",
      color: isDark ? "#f59e0b" : "#d97706",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

  // Staff-specific quick actions
  const staffQuickActions = [
    {
      id: "submit-work",
      label: "Nộp công việc",
      icon: "upload",
      color: "#3b82f6",
      onPress: () => console.log("Submit work"),
    },
    {
      id: "request-materials",
      label: "Yêu cầu vật liệu",
      icon: "shopping-cart",
      color: "#3b82f6",
      onPress: () => console.log("Request materials"),
    },
    {
      id: "view-instructions",
      label: "Xem hướng dẫn",
      icon: "book",
      color: "#3b82f6",
      onPress: () => console.log("View instructions"),
    },
    {
      id: "check-earnings",
      label: "Báo cáo sản xuất",
      icon: "bar-chart",
      color: "#3b82f6",
      onPress: () => router.push("/analytics/staff"),
    },
  ];

  // Get today's tasks
  const todayTasks = sampleStaffTasks.filter((task) => task.status === "assigned" || task.status === "in_progress");

  // Get next tasks in queue
  const nextTasks = sampleStaffTasks.filter((task) => task.status === "assigned").slice(0, 2);

  // Get completed tasks for today
  const completedTasks = sampleStaffTasks.filter((task) => task.status === "completed" && task.completedAt).slice(0, 3);

  // Calculate today's summary
  const todayCompleted = completedTasks.reduce((sum, task) => sum + task.completedQuantity, 0);
  const todayEarnings = completedTasks.reduce((sum, task) => sum + task.earnings.total, 0);

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ gap: 8 }}>
        {/* Welcome Section */}
        <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

        {/* Quick Actions */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng công việc</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {staffQuickActions.map((action) => (
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
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tổng quan cá nhân</Text>
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

        {/* Today's Tasks */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Công việc hôm nay</Text>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>{todayTasks.length} việc • 2 việc khẩn cấp</Text>
            {todayTasks.length > 0 ? (
              <View style={{ gap: 8 }}>
                {todayTasks.slice(0, 3).map((task) => (
                  <View
                    key={task.id}
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
                          {task.batchName}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 12, marginTop: 2 }}>
                          Giai đoạn: {task.stage}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2 }}>
                          Mục tiêu: {task.targetQuantity} | Hoàn thành: {task.completedQuantity}
                        </Text>
                        {task.notes && (
                          <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2, fontStyle: "italic" }}>
                            {task.notes}
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          backgroundColor:
                            task.priority === "urgent"
                              ? "#ef4444"
                              : task.priority === "high"
                                ? "#f59e0b"
                                : task.priority === "medium"
                                  ? "#3b82f6"
                                  : "#10b981",
                          paddingHorizontal: 6,
                          paddingVertical: 3,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "600" }}>
                          {task.priority.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <FontAwesome name="clock-o" size={10} color={colors.textLow} />
                        <Text style={{ color: colors.textLow, fontSize: 10 }}>
                          Hạn:{" "}
                          {new Date(task.deadline).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                        <FontAwesome name="money" size={10} color={colors.textLow} />
                        <Text style={{ color: colors.textLow, fontSize: 10 }}>
                          {task.earnings.total.toLocaleString("vi-VN")} VNĐ
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}

                {todayTasks.length > 3 && (
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
                      +{todayTasks.length - 3} công việc khác
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
                  Không có công việc nào
                </Text>
                <Text style={{ color: colors.textLow, fontSize: 12, textAlign: "center", marginTop: 2 }}>
                  Tất cả công việc đã được hoàn thành
                </Text>
              </View>
            )}
          </View>
        </SectionCard>

        {/* Next Tasks in Queue */}
        {nextTasks.length > 0 && (
          <SectionCard>
            <View style={{ gap: 8 }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Công việc tiếp theo</Text>
              <View style={{ gap: 8 }}>
                {nextTasks.map((task) => (
                  <View
                    key={task.id}
                    style={{
                      backgroundColor: isDark ? colors.background : "#FFFFFF",
                      borderRadius: 8,
                      padding: 12,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                      opacity: 0.7,
                    }}
                  >
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "700" }}>
                          {task.batchName}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 12, marginTop: 2 }}>
                          Giai đoạn: {task.stage}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2 }}>
                          Mục tiêu: {task.targetQuantity}
                        </Text>
                      </View>
                      <Pressable
                        onPress={() => console.log("Prepare task")}
                        style={{
                          backgroundColor: colors.accent + "20",
                          paddingHorizontal: 12,
                          paddingVertical: 6,
                          borderRadius: 6,
                        }}
                      >
                        <Text style={{ color: colors.accent, fontSize: 11, fontWeight: "600" }}>Chuẩn bị</Text>
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </SectionCard>
        )}

        {/* Recent Task History */}
        {completedTasks.length > 0 && (
          <SectionCard>
            <View style={{ gap: 8 }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Lịch sử công việc</Text>
              <View style={{ gap: 6 }}>
                {completedTasks.map((task) => (
                  <View
                    key={task.id}
                    style={{
                      padding: 10,
                      backgroundColor: isDark ? colors.background : "#FFFFFF",
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                    }}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textHigh }}>{task.batchName}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 4 }}>
                      <Text style={{ fontSize: 10, color: colors.textLow }}>
                        {task.completedQuantity} sản phẩm • {task.qualityScore} điểm
                      </Text>
                      <Text style={{ fontSize: 10, color: colors.success, fontWeight: "600" }}>
                        {formatCurrency(task.earnings.total)}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  borderRadius: 6,
                  marginTop: 4,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textHigh, textAlign: "center" }}>
                  Hôm nay đã hoàn thành {todayCompleted} việc, kiếm được {formatCurrency(todayEarnings)}
                </Text>
              </View>
            </View>
          </SectionCard>
        )}

        {/* Personal Performance Summary */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Hiệu suất cá nhân</Text>
            <View style={{ gap: 6 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tỷ lệ hoàn thành</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {taskStats.completionRate.toFixed(1)}%
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Điểm chất lượng TB</Text>
                <Text style={{ color: colors.textLow, fontSize: 12 }}>
                  {taskStats.averageQualityScore.toFixed(1)}/100
                </Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>Tổng thu nhập hôm nay</Text>
                <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>
                  {taskStats.totalEarnings.toLocaleString("vi-VN")} VNĐ
                </Text>
              </View>
            </View>
          </View>
        </SectionCard>
      </View>
    </ScrollView>
  );
}
