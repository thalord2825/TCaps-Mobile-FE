import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { productService } from "../../services/product-service";
import { BatchCreateInput, BatchManagementItem, BatchUpdateInput } from "../../types/batch.types";
import { Product } from "../../types/product.types";

interface BatchFormProps {
  batch?: BatchManagementItem;
  onSubmit: (data: BatchCreateInput | BatchUpdateInput) => Promise<void>;
  onCancel: () => void;
}

export function BatchForm({ batch, onSubmit, onCancel }: BatchFormProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState(batch?.productId || "");
  const [code, setCode] = useState(batch?.code || "");
  const [quantity, setQuantity] = useState(batch?.quantity.toString() || "");
  const [startDate, setStartDate] = useState(batch?.startDate || "");
  const [endDate, setEndDate] = useState(batch?.endDate || "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await productService.getAllProducts();
    if (response.success && response.data) {
      setProducts(response.data);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!productId && !batch) {
      newErrors.productId = "Vui lòng chọn sản phẩm";
    }

    if (!code.trim()) {
      newErrors.code = "Mã lô là bắt buộc";
    }

    if (!quantity || parseInt(quantity) <= 0) {
      newErrors.quantity = "Số lượng phải lớn hơn 0";
    }

    if (!startDate) {
      newErrors.startDate = "Ngày bắt đầu là bắt buộc";
    }

    if (!endDate) {
      newErrors.endDate = "Ngày kết thúc là bắt buộc";
    }

    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) {
      newErrors.endDate = "Ngày kết thúc phải sau ngày bắt đầu";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (batch) {
        await onSubmit({
          id: batch.id,
          quantity: parseInt(quantity),
          startDate,
          endDate,
        } as BatchUpdateInput);
      } else {
        const selectedProduct = products.find((p) => p.id === productId);
        await onSubmit({
          productId,
          code,
          quantity: parseInt(quantity),
          startDate,
          endDate,
        } as BatchCreateInput);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ gap: 16 }}>
        {!batch && (
          <View>
            <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
              Chọn sản phẩm *
            </Text>
            <View
              style={{
                backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.productId ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
              }}
            >
              <Text style={{ color: colors.textHigh }}>
                {products.find((p) => p.id === productId)?.code || "Chọn sản phẩm"}
              </Text>
            </View>
          </View>
        )}

        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Mã lô *</Text>
          <TextInput
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
              color: colors.textHigh,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: errors.code ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
            }}
            value={code}
            onChangeText={setCode}
            placeholder="VD: L001"
            placeholderTextColor={colors.textLow}
            editable={!batch}
          />
        </View>

        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Số lượng *</Text>
          <TextInput
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
              color: colors.textHigh,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: errors.quantity ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
            }}
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Nhập số lượng"
            placeholderTextColor={colors.textLow}
            keyboardType="numeric"
          />
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
              Ngày bắt đầu *
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
                color: colors.textHigh,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.startDate ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
              }}
              value={startDate}
              onChangeText={setStartDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textLow}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
              Ngày kết thúc *
            </Text>
            <TextInput
              style={{
                backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
                color: colors.textHigh,
                padding: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: errors.endDate ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
              }}
              value={endDate}
              onChangeText={setEndDate}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.textLow}
            />
          </View>
        </View>

        {Object.values(errors).map((error, idx) => (
          <Text key={idx} style={{ color: "#ef4444", fontSize: 12 }}>
            {error}
          </Text>
        ))}

        <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
          <Pressable
            onPress={onCancel}
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.textHigh, fontWeight: "600" }}>Hủy</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: colors.accent,
              borderRadius: 8,
              alignItems: "center",
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>
              {isSubmitting ? "Đang lưu..." : batch ? "Cập nhật" : "Tạo"}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

