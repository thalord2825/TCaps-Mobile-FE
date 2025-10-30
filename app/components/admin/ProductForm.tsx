import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { Product, ProductCreateInput, ProductUpdateInput } from "../../types/product.types";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductCreateInput | ProductUpdateInput) => Promise<void>;
  onCancel: () => void;
  resetTrigger?: boolean; // new
  newProductId?: string | null; // new for feedback
}

export function ProductForm({ product, onSubmit, onCancel, resetTrigger, newProductId }: ProductFormProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const [code, setCode] = useState(product?.code || "");
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [image, setImage] = useState(product?.imageUrl || "");
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (resetTrigger) {
      setCode(product?.code || "");
      setName(product?.name || "");
      setDescription(product?.description || "");
      setImage(product?.imageUrl || "");
      setErrors({});
    }
  }, [resetTrigger]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!code.trim()) {
      newErrors.code = "Mã sản phẩm là bắt buộc";
    }

    if (!name.trim()) {
      newErrors.name = "Tên sản phẩm là bắt buộc";
    }

    if (!description.trim()) {
      newErrors.description = "Mô tả là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMockImagePicker = () => {
    // Mock image picker - in real app, use expo-image-picker
    const mockImageUrl = `https://via.placeholder.com/300x300?text=${code || "Product"}`;
    setImage(mockImageUrl);
    setIsImagePickerVisible(false);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      if (product) {
        // Update existing product
        await onSubmit({ id: product.id, name, description, image });
      } else {
        // Create new product
        await onSubmit({ code, name, description, image });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
      <View style={{ gap: 16 }}>
        {/* Code (readonly for updates) */}
        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
            Mã sản phẩm *
          </Text>
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
            placeholder="VD: N001"
            placeholderTextColor={colors.textLow}
            editable={!product} // Readonly when updating
          />
          {errors.code && <Text style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.code}</Text>}
        </View>

        {/* Name */}
        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>
            Tên sản phẩm *
          </Text>
          <TextInput
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
              color: colors.textHigh,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: errors.name ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
            }}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên sản phẩm"
            placeholderTextColor={colors.textLow}
          />
          {errors.name && <Text style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.name}</Text>}
        </View>

        {/* Description */}
        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Mô tả *</Text>
          <TextInput
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
              color: colors.textHigh,
              padding: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: errors.description ? "#ef4444" : isDark ? colors.borderVariant : colors.border,
              minHeight: 80,
              textAlignVertical: "top",
            }}
            value={description}
            onChangeText={setDescription}
            placeholder="Nhập mô tả sản phẩm"
            placeholderTextColor={colors.textLow}
            multiline
            numberOfLines={4}
          />
          {errors.description && (
            <Text style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.description}</Text>
          )}
        </View>

        {/* Image */}
        <View>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600", marginBottom: 8 }}>Hình ảnh</Text>
          {image ? (
            <View style={{ marginBottom: 12 }}>
              <Image source={{ uri: image }} style={{ width: "100%", height: 200, borderRadius: 8 }} />
              <Pressable
                onPress={handleMockImagePicker}
                style={{
                  marginTop: 8,
                  padding: 12,
                  backgroundColor: colors.accent,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Chọn hình khác</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              onPress={handleMockImagePicker}
              style={{
                padding: 40,
                backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
                borderRadius: 8,
                borderWidth: 2,
                borderStyle: "dashed",
                borderColor: colors.border,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="camera" size={32} color={colors.textLow} />
              <Text style={{ color: colors.textLow, marginTop: 8 }}>Chọn hình ảnh</Text>
            </Pressable>
          )}
        </View>

        {/* Action Buttons */}
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
              {isSubmitting ? "Đang lưu..." : product ? "Cập nhật" : "Tạo"}
            </Text>
          </Pressable>
        </View>
        {newProductId && (
          <Text style={{ color: colors.accent, fontWeight: "700", textAlign: "center", marginTop: 12 }}>
            Đã tạo mã sản phẩm: {newProductId}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
