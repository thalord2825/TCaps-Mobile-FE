import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { MaterialItem } from "../../data/sample-materials";

export interface InventoryMaterialCardProps {
  item: MaterialItem;
  onViewHistory?: (materialId: string) => void;
}

function getStockStatus(quantity: number, minThreshold: number, colors: any) {
  if (quantity === 0) return { label: "Inactive", color: colors.error, bgColor: colors.surfaceVariant };
  if (quantity < minThreshold * 0.5)
    return { label: "Low Stock", color: colors.warning, bgColor: colors.surfaceVariant };
  if (quantity < minThreshold) return { label: "Warning", color: colors.warning, bgColor: colors.surfaceVariant };
  return { label: "Active", color: colors.success, bgColor: colors.surfaceVariant };
}

export function InventoryMaterialCard({ item, onViewHistory }: InventoryMaterialCardProps) {
  const { colors, theme } = useTheme();
  const isDark = theme === "dark";

  const stockStatus = getStockStatus(item.quantity, item.minThreshold, colors);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface,
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
            color: colors.textHigh,
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
            color: colors.textHigh,
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {formatCurrency(item.costPerUnit)}
        </Text>

        <View
          style={{
            backgroundColor: colors.surfaceVariant,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
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
