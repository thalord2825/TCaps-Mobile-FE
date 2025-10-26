import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { useUser } from "../../context/user-context";
import { sampleBatches } from "../../data/sample-batches";
import { getQCInspectionStats, sampleQCInspections } from "../../data/sample-qc-inspections";
import { BatchCardThemed } from "../batches/batch-card-themed";
import { SectionCard } from "../common/section-card";
import { WelcomeSectionThemed } from "./welcome-section-themed";

export function QCHomeContent() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const router = useRouter();
  const isDark = theme === "dark";

  // Get QC inspection stats for the assigned factory
  const inspectionStats = getQCInspectionStats(user.factoryId);

  // QC-specific dashboard metrics for assigned factory only
  const dashboardMetrics = [
    {
      label: "Tổng lô trong nhà máy",
      value: inspectionStats.totalInspections.toString(),
      icon: "building",
      color: isDark ? colors.accent : colors.textHigh,
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Chờ kiểm tra",
      value: inspectionStats.pendingInspections.toString(),
      icon: "clock-o",
      color: isDark ? "#f87171" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Đã kiểm tra hôm nay",
      value: inspectionStats.completedInspections.toString(),
      icon: "check-circle",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
    {
      label: "Không đạt",
      value: inspectionStats.failedInspections.toString(),
      icon: "times-circle",
      color: isDark ? "#ef4444" : "#dc2626",
      bgColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
    },
  ];

  // QC-specific quick actions
  const qcQuickActions = [
    {
      id: "start-inspection",
      label: "Bắt đầu kiểm tra",
      icon: "play-circle",
      color: "#3b82f6",
      onPress: () => console.log("Start inspection"),
    },
    {
      id: "view-pending",
      label: "Xem chờ kiểm tra",
      icon: "list",
      color: "#3b82f6",
      onPress: () => console.log("View pending"),
    },
    {
      id: "quality-reports",
      label: "Báo cáo sản xuất",
      icon: "bar-chart",
      color: "#3b82f6",
      onPress: () => router.push("/analytics/qc"),
    },
    {
      id: "factory-stats",
      label: "Thống kê nhà máy",
      icon: "building",
      color: "#3b82f6",
      onPress: () => console.log("Factory stats"),
    },
  ];

  // Get pending inspections for the assigned factory
  const pendingInspections = sampleQCInspections.filter(
    (inspection) => inspection.factoryId === user.factoryId && inspection.status === "pending"
  );

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ gap: 8 }}>
        {/* Welcome Section */}
        <WelcomeSectionThemed userName={user.name} role={user.role} unreadCount={user.unreadCount} />

        {/* Factory Assignment Info */}
        <SectionCard>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: isDark ? "#7aa2ff20" : colors.accent,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="building" size={18} color={isDark ? "#7aa2ff" : "#FFFFFF"} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Nhà máy được phân công</Text>
              <Text style={{ color: colors.textLow, fontSize: 14 }}>
                {user.factoryId === "F001" ? "Nhà máy A - Cắt vải" : "Chưa được phân công"}
              </Text>
            </View>
          </View>
        </SectionCard>

        {/* Quick Actions */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chức năng QC</Text>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {qcQuickActions.map((action) => (
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
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Tổng quan QC</Text>
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

        {/* Pending Inspections */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Chờ kiểm tra</Text>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>{pendingInspections.length} lô • 2 lô khẩn cấp</Text>
            {pendingInspections.length > 0 ? (
              <View style={{ gap: 8 }}>
                {pendingInspections.slice(0, 3).map((inspection) => (
                  <View
                    key={inspection.id}
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
                          {inspection.batchName}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 12, marginTop: 2 }}>
                          Giai đoạn: {inspection.stage}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 10, marginTop: 2 }}>
                          Số lượng: {inspection.quantity} | Ưu tiên: {inspection.priority}
                        </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor:
                            inspection.priority === "urgent"
                              ? "#ef4444"
                              : inspection.priority === "high"
                                ? "#f59e0b"
                                : inspection.priority === "medium"
                                  ? "#3b82f6"
                                  : "#10b981",
                          paddingHorizontal: 6,
                          paddingVertical: 3,
                          borderRadius: 4,
                        }}
                      >
                        <Text style={{ color: "#FFFFFF", fontSize: 9, fontWeight: "600" }}>
                          {inspection.priority.toUpperCase()}
                        </Text>
                      </View>
                    </View>

                    {/* Start Inspection Button */}
                    <Pressable
                      onPress={() => router.push(`/quality-check/${inspection.batchId}`)}
                      style={{
                        backgroundColor: "#4ade80",
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 8,
                        marginTop: 8,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                    >
                      <FontAwesome name="play-circle" size={14} color="#FFFFFF" />
                      <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Bắt đầu kiểm tra</Text>
                    </Pressable>
                  </View>
                ))}

                {pendingInspections.length > 3 && (
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
                      +{pendingInspections.length - 3} lô khác chờ kiểm tra
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
                  Không có lô nào chờ kiểm tra
                </Text>
                <Text style={{ color: colors.textLow, fontSize: 12, textAlign: "center", marginTop: 2 }}>
                  Tất cả lô hàng đã được kiểm tra
                </Text>
              </View>
            )}
          </View>
        </SectionCard>

        {/* Current Batches - Only for QC's assigned factory stage */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Lô hàng tại giai đoạn</Text>
            <Text style={{ color: colors.textLow, fontSize: 12 }}>
              {sampleBatches.filter((batch) => user.factoryId === "F001" && batch.factory === "Xưởng Cắt Vải").length}{" "}
              lô đang sản xuất
            </Text>
            <View style={{ gap: 8 }}>
              {sampleBatches
                .filter((batch) => user.factoryId === "F001" && batch.factory === "Xưởng Cắt Vải")
                .slice(0, 3)
                .map((item) => (
                  <View key={item.id}>
                    <BatchCardThemed item={item} />
                  </View>
                ))}
              {sampleBatches.filter((batch) => user.factoryId === "F001" && batch.factory === "Xưởng Cắt Vải").length >
                3 && (
                <Pressable
                  onPress={() => console.log("View all batches")}
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
                    +
                    {sampleBatches.filter((batch) => user.factoryId === "F001" && batch.factory === "Xưởng Cắt Vải")
                      .length - 3}{" "}
                    lô khác
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </SectionCard>

        {/* Recent QC Activity */}
        <SectionCard>
          <View style={{ gap: 8 }}>
            <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>Hoạt động QC gần đây</Text>
            {sampleQCInspections
              .filter((inspection) => inspection.factoryId === user.factoryId && inspection.status === "completed")
              .slice(0, 5)
              .map((inspection) => (
                <View
                  key={inspection.id}
                  style={{
                    padding: 10,
                    backgroundColor: isDark ? colors.background : "#FFFFFF",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: inspection.result === "Pass" ? "#4ade8040" : "#ef444440",
                    borderLeftWidth: 3,
                    borderLeftColor: inspection.result === "Pass" ? "#4ade80" : "#ef4444",
                  }}
                >
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, fontWeight: "600", color: colors.textHigh }}>
                        {inspection.batchName}
                      </Text>
                      <Text style={{ fontSize: 10, color: colors.textLow, marginTop: 2 }}>
                        Kết quả: {inspection.result === "Pass" ? "Đạt" : "Không đạt"}
                      </Text>
                      {inspection.notes && (
                        <Text style={{ fontSize: 10, color: colors.textLow, marginTop: 2, fontStyle: "italic" }}>
                          {inspection.notes.substring(0, 50)}...
                        </Text>
                      )}
                    </View>
                    <Text style={{ fontSize: 10, color: colors.textLow }}>5 phút trước</Text>
                  </View>
                </View>
              ))}
          </View>
        </SectionCard>
      </View>
    </ScrollView>
  );
}
