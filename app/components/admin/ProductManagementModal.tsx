import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { productService } from "../../services/product-service";
import { Product } from "../../types/product.types";
import { Toast } from "../common/Toast";
import { ProductForm } from "./ProductForm";

interface ProductManagementModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ProductManagementModal({ visible, onClose }: ProductManagementModalProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "error" | "info" }>({
    visible: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    async function fetchProducts() {
      const response = await productService.getAllProducts();
      if (response.success && response.data) setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    const response = await productService.getAllProducts();
    if (response.success && response.data) {
      setProducts(response.data);
    }
    setIsLoading(false);
  };

  const handleCreate = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    const response = await productService.deleteProduct(productId);
    if (response.success) {
      loadProducts();
      setShowDeleteConfirm(null);
    }
  };

  const handleFormSubmit = async (data: any) => {
    let response;
    if (editingProduct) {
      response = await productService.updateProduct(data as any);
    } else {
      response = await productService.createProduct(data);
    }
    if (response.success) {
      setToast({
        visible: true,
        message: editingProduct
          ? "Cập nhật sản phẩm thành công"
          : `Tạo sản phẩm thành công! Mã sản phẩm mới: ${response.data}`,
        type: "success",
      });
      setShowForm(false);
      setEditingProduct(undefined);
      loadProducts();
    } else {
      setToast({
        visible: true,
        message: response.error || "Có lỗi xảy ra!",
        type: "error",
      });
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(undefined);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="cubes" size={20} color={colors.textHigh} />
            <Text style={{ color: colors.textHigh, fontSize: 18, fontWeight: "700" }}>
              {showForm ? (editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm") : "Quản lý sản phẩm"}
            </Text>
          </View>
          <Pressable onPress={showForm ? handleCloseForm : onClose}>
            <FontAwesome name="close" size={24} color={colors.textHigh} />
          </Pressable>
        </View>

        {showForm ? (
          <ProductForm product={editingProduct} onSubmit={handleFormSubmit} onCancel={handleCloseForm} />
        ) : (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 16 }}>
            {/* Action Bar */}
            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={handleCreate}
                style={{
                  flex: 1,
                  backgroundColor: colors.accent,
                  padding: 16,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Thêm sản phẩm</Text>
              </Pressable>
            </View>

            {/* Products List */}
            {isLoading ? (
              <Text style={{ color: colors.textLow, textAlign: "center", marginTop: 40 }}>Đang tải...</Text>
            ) : products.length === 0 ? (
              <View style={{ alignItems: "center", marginTop: 40 }}>
                <FontAwesome name="inbox" size={48} color={colors.textLow} />
                <Text style={{ color: colors.textLow, marginTop: 16 }}>Chưa có sản phẩm nào</Text>
              </View>
            ) : (
              <View style={{ gap: 12 }}>
                {products.map((product) => (
                  <View
                    key={product.id}
                    style={{
                      backgroundColor: isDark ? colors.surfaceVariant : colors.surface,
                      padding: 16,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>
                          {product.code} - {product.name}
                        </Text>
                        <Text style={{ color: colors.textLow, fontSize: 14, marginTop: 4 }}>{product.description}</Text>
                      </View>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Pressable
                          onPress={() => handleEdit(product)}
                          style={{
                            padding: 8,
                            backgroundColor: colors.accent,
                            borderRadius: 6,
                          }}
                        >
                          <FontAwesome name="edit" size={16} color="#FFFFFF" />
                        </Pressable>
                        <Pressable
                          onPress={() => setShowDeleteConfirm(product.id ?? null)}
                          style={{
                            padding: 8,
                            backgroundColor: "#ef4444",
                            borderRadius: 6,
                          }}
                        >
                          <FontAwesome name="trash" size={16} color="#FFFFFF" />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <Modal visible={!!showDeleteConfirm} transparent animationType="fade">
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: colors.surface,
                  padding: 24,
                  borderRadius: 12,
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                <Text style={{ color: colors.textHigh, fontSize: 18, fontWeight: "700", marginBottom: 12 }}>
                  Xác nhận xóa
                </Text>
                <Text style={{ color: colors.textLow, marginBottom: 24 }}>
                  Bạn có chắc chắn muốn xóa sản phẩm này không?
                </Text>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <Pressable
                    onPress={() => setShowDeleteConfirm(null)}
                    style={{
                      flex: 1,
                      padding: 12,
                      backgroundColor: colors.surfaceVariant,
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: colors.textHigh, fontWeight: "600" }}>Hủy</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleDelete(showDeleteConfirm)}
                    style={{
                      flex: 1,
                      padding: 12,
                      backgroundColor: "#ef4444",
                      borderRadius: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Xóa</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={() => setToast({ ...toast, visible: false })}
        />
      </View>
    </Modal>
  );
}
