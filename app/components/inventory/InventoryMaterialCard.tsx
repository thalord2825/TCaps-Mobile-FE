import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { MaterialItem } from "../../data/sample-materials";

export interface InventoryMaterialCardProps {
  item: MaterialItem;
  onViewHistory?: (materialId: string) => void;
}

function getStockStatus(quantity: number, minThreshold: number, isDark: boolean) {
  if (quantity === 0)
    return { label: "Inactive", color: isDark ? "#f87171" : "#dc2626", bgColor: isDark ? "#1f2937" : "#f8fafc" };
  if (quantity < minThreshold * 0.5)
    return { label: "Low Stock", color: isDark ? "#fbbf24" : "#d97706", bgColor: isDark ? "#1f2937" : "#f8fafc" };
  if (quantity < minThreshold)
    return { label: "Warning", color: isDark ? "#fbbf24" : "#d97706", bgColor: isDark ? "#1f2937" : "#f8fafc" };
  return { label: "Active", color: isDark ? "#4ade80" : "#16a34a", bgColor: isDark ? "#1f2937" : "#f8fafc" };
}

export function InventoryMaterialCard({ item, onViewHistory }: InventoryMaterialCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const stockStatus = getStockStatus(item.quantity, item.minThreshold, isDark);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <View
      style={{
        backgroundColor: C.card,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: isDark ? "#000" : "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
      }}
    >
      {/* Left: Product Image */}
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 12,
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 16,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        {item.category === "Vải Cotton" && (
          <FontAwesome name="cut" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Vải Polyester" && (
          <FontAwesome name="cut" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Chỉ Nylon" && (
          <FontAwesome name="link" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Chỉ Thêu" && (
          <FontAwesome name="link" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Keo Công Nghiệp" && (
          <FontAwesome name="wrench" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Nhãn Vải" && (
          <FontAwesome name="tag" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Nút Bấm" && (
          <FontAwesome name="circle" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
        {item.category === "Dây Kéo" && (
          <FontAwesome name="chain" size={24} color={isDark ? colors.textHigh : colors.textHigh} />
        )}
      </View>

      {/* Center: Product Details */}
      <View style={{ flex: 1, gap: 8 }}>
        <Text
          style={{
            color: isDark ? "#fff" : colors.textHigh,
            fontSize: 16,
            fontWeight: "700",
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={{
            color: colors.textMedium,
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          Category: {item.category}
        </Text>

        <View style={{ flexDirection: "row", gap: 16 }}>
          <Text style={{ color: colors.textMedium, fontSize: 11, fontWeight: "500" }}>ID: {item.id}</Text>
          <Text style={{ color: colors.textMedium, fontSize: 11, fontWeight: "500" }}>Stock: {item.quantity}</Text>
          <Text
            style={{
              color: item.quantity < item.minThreshold ? "#f59e0b" : colors.textMedium,
              fontSize: 11,
              fontWeight: "500",
            }}
          >
            Updated: {item.lastUpdated}
          </Text>
        </View>
      </View>

      {/* Right: Price, Status & Actions */}
      <View style={{ alignItems: "flex-end", gap: 8 }}>
        <Text
          style={{
            color: isDark ? "#fff" : colors.textHigh,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {formatCurrency(item.costPerUnit)}
        </Text>

        <View
          style={{
            backgroundColor: stockStatus.bgColor,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <Text
            style={{
              color: stockStatus.color,
              fontSize: 10,
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            {stockStatus.label}
          </Text>
        </View>

        <Pressable onPress={() => onViewHistory?.(item.id)}>
          <FontAwesome name="ellipsis-v" size={16} color={colors.textMedium} />
        </Pressable>
      </View>
    </View>
  );
}

export default InventoryMaterialCard;
