import { FontAwesome } from "@expo/vector-icons";
import { Text, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { MaterialItem } from "../../data/sample-materials";
import { SectionCard } from "../common/section-card";

export interface InventoryStatsCardProps {
  materials: MaterialItem[];
}

export function InventoryStatsCard({ materials }: InventoryStatsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // Calculate stats
  const totalMaterials = materials.length;
  const lowStockCount = materials.filter((m) => m.quantity < m.minThreshold * 0.5).length;
  const outOfStockCount = materials.filter((m) => m.quantity === 0).length;
  const totalValue = materials.reduce((sum, m) => sum + m.quantity * m.costPerUnit, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      notation: "compact",
    }).format(amount);
  };

  const stats = [
    {
      label: "Tổng nguyên liệu",
      value: totalMaterials.toString(),
      icon: "cube",
      color: isDark ? "#3b82f6" : "#2563eb",
      bgColor: isDark ? "#1f2937" : "#f8fafc",
    },
    {
      label: "Sắp hết hàng",
      value: lowStockCount.toString(),
      icon: "exclamation-triangle",
      color: isDark ? "#fbbf24" : "#d97706",
      bgColor: isDark ? "#1f2937" : "#f8fafc",
    },
    {
      label: "Hết hàng",
      value: outOfStockCount.toString(),
      icon: "times-circle",
      color: isDark ? "#f87171" : "#dc2626",
      bgColor: isDark ? "#1f2937" : "#f8fafc",
    },
    {
      label: "Tổng giá trị",
      value: formatCurrency(totalValue),
      icon: "money",
      color: isDark ? "#4ade80" : "#16a34a",
      bgColor: isDark ? "#1f2937" : "#f8fafc",
    },
  ];

  return (
    <SectionCard>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: isDark ? colors.accent : colors.accent,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <FontAwesome name="bar-chart" size={20} color={isDark ? colors.accent : colors.accent} />
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
                Thống kê kho hàng
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 11,
                  fontWeight: "500",
                }}
              >
                Tổng quan và phân tích
              </Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.accent + "30",
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {materials.length} mục
            </Text>
          </View>
        </View>

        <View style={{ gap: 12 }}>
          {/* First Row */}
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
                  backgroundColor: stat.bgColor,
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

          {/* Second Row */}
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
                  backgroundColor: stat.bgColor,
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
      </View>
    </SectionCard>
  );
}

export default InventoryStatsCard;
