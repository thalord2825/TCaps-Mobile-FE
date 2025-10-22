import { FontAwesome } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Alert, FlatList, Modal, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { MaterialItem, RequestItem } from "../../data/sample-requests";

export interface MaterialDistributionModalProps {
  visible: boolean;
  request: RequestItem | null;
  onClose: () => void;
  onConfirm: (requestId: string, distributedMaterials: MaterialItem[]) => void;
}

interface InventoryItem {
  id: string;
  name: string;
  code: string;
  category: string;
  currentStock: number;
  unitPrice: number;
  unit: string;
}

// Mock inventory data
const mockInventory: InventoryItem[] = [
  {
    id: "V001",
    name: "Vải cotton",
    code: "V001",
    category: "fabric",
    currentStock: 150,
    unitPrice: 25000,
    unit: "mét",
  },
  {
    id: "V002",
    name: "Vải polyester",
    code: "V002",
    category: "fabric",
    currentStock: 200,
    unitPrice: 18000,
    unit: "mét",
  },
  { id: "V003", name: "Vải denim", code: "V003", category: "fabric", currentStock: 80, unitPrice: 35000, unit: "mét" },
  { id: "C001", name: "Chỉ may", code: "C001", category: "thread", currentStock: 50, unitPrice: 5000, unit: "cuộn" },
  { id: "C002", name: "Chỉ thêu", code: "C002", category: "thread", currentStock: 30, unitPrice: 8000, unit: "cuộn" },
  { id: "K001", name: "Keo dán", code: "K001", category: "glue", currentStock: 25, unitPrice: 15000, unit: "chai" },
  { id: "K002", name: "Keo nóng", code: "K002", category: "glue", currentStock: 40, unitPrice: 12000, unit: "thanh" },
  {
    id: "N001",
    name: "Nút bấm",
    code: "N001",
    category: "accessories",
    currentStock: 100,
    unitPrice: 2000,
    unit: "cái",
  },
  {
    id: "N002",
    name: "Nút cài",
    code: "N002",
    category: "accessories",
    currentStock: 80,
    unitPrice: 3000,
    unit: "cái",
  },
  {
    id: "P001",
    name: "Phụ kiện kim loại",
    code: "P001",
    category: "accessories",
    currentStock: 20,
    unitPrice: 25000,
    unit: "bộ",
  },
  {
    id: "P002",
    name: "Dây kéo",
    code: "P002",
    category: "accessories",
    currentStock: 60,
    unitPrice: 8000,
    unit: "cái",
  },
  {
    id: "P003",
    name: "Nhãn tag",
    code: "P003",
    category: "accessories",
    currentStock: 200,
    unitPrice: 1000,
    unit: "cái",
  },
];

const categories = [
  { label: "Tất cả", value: "all" },
  { label: "Vải", value: "fabric" },
  { label: "Chỉ", value: "thread" },
  { label: "Keo", value: "glue" },
  { label: "Phụ kiện", value: "accessories" },
];

export function MaterialDistributionModal({ visible, request, onClose, onConfirm }: MaterialDistributionModalProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterials, setSelectedMaterials] = useState<Map<string, number>>(new Map());
  const [isSubstituting, setIsSubstituting] = useState(false);

  // Filter inventory based on search and category
  const filteredInventory = useMemo(() => {
    return mockInventory.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getStockLevelColor = (stock: number) => {
    if (stock < 20) return "#ef4444"; // Red - Low stock
    if (stock < 50) return "#f59e0b"; // Yellow - Medium stock
    return "#10b981"; // Green - Good stock
  };

  const toggleMaterialSelection = (materialId: string) => {
    const newSelection = new Map(selectedMaterials);
    if (newSelection.has(materialId)) {
      newSelection.delete(materialId);
    } else {
      newSelection.set(materialId, 1);
    }
    setSelectedMaterials(newSelection);
  };

  const updateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) return;

    const newSelection = new Map(selectedMaterials);
    newSelection.set(materialId, quantity);
    setSelectedMaterials(newSelection);
  };

  const getSelectedMaterialsData = () => {
    return Array.from(selectedMaterials.entries()).map(([id, qty]) => {
      const material = mockInventory.find((m) => m.id === id);
      return {
        materialId: id,
        materialName: material?.name || "",
        requestedQty: qty,
        approvedQty: qty,
        unit: material?.unit || "",
        currentStock: material?.currentStock || 0,
        unitPrice: material?.unitPrice || 0,
      };
    });
  };

  const calculateTotalCost = () => {
    return Array.from(selectedMaterials.entries()).reduce((total, [id, qty]) => {
      const material = mockInventory.find((m) => m.id === id);
      return total + (material?.unitPrice || 0) * qty;
    }, 0);
  };

  const getFulfillmentRate = () => {
    if (!request?.materials) return 0;
    const requestedCount = request.materials.length;
    const selectedCount = selectedMaterials.size;
    return Math.round((selectedCount / requestedCount) * 100);
  };

  const handleConfirm = () => {
    if (selectedMaterials.size === 0) {
      Alert.alert("Lỗi", "Vui lòng chọn ít nhất một vật liệu để phân phối");
      return;
    }

    const distributedMaterials = getSelectedMaterialsData();
    onConfirm(request!.id, distributedMaterials);
    setSelectedMaterials(new Map());
    setSearchQuery("");
    setSelectedCategory("all");
    setIsSubstituting(false);
  };

  const handleClose = () => {
    setSelectedMaterials(new Map());
    setSearchQuery("");
    setSelectedCategory("all");
    setIsSubstituting(false);
    onClose();
  };

  if (!request) return null;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={{ flex: 1, backgroundColor: C.background }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 16,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? colors.border : colors.borderVariant,
            backgroundColor: colors.surface,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Phân phối vật liệu
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
              }}
            >
              {request.id} • {request.factory}
            </Text>
          </View>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={handleClose}
              style={{
                backgroundColor: colors.surfaceVariant,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Lưu nháp
              </Text>
            </Pressable>

            <Pressable onPress={handleClose}>
              <FontAwesome name="times" size={20} color={colors.textMedium} />
            </Pressable>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          {/* Current Request Section */}
          <View
            style={{
              backgroundColor: colors.surface,
              margin: 20,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? colors.border : colors.borderVariant,
            }}
          >
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Yêu cầu ban đầu ({request.materials?.length || 0} loại)
            </Text>

            {request.materials?.map((material, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 8,
                  borderBottomWidth: index < (request.materials?.length || 0) - 1 ? 1 : 0,
                  borderBottomColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {material.materialName}
                  </Text>
                  <Text
                    style={{
                      color: colors.textMedium,
                      fontSize: 12,
                    }}
                  >
                    {material.materialId}
                  </Text>
                </View>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 14,
                    fontWeight: "700",
                  }}
                >
                  {material.requestedQty} {material.unit}
                </Text>
              </View>
            ))}
          </View>

          {/* Search & Filter */}
          <View style={{ paddingHorizontal: 20, gap: 16 }}>
            {/* Search Bar */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.surface,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: isDark ? colors.border : colors.borderVariant,
              }}
            >
              <FontAwesome name="search" size={16} color={colors.textMedium} style={{ marginRight: 12 }} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Tìm kiếm vật liệu..."
                placeholderTextColor={colors.textMedium}
                style={{
                  flex: 1,
                  color: colors.textHigh,
                  fontSize: 16,
                }}
              />
            </View>

            {/* Category Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                {categories.map((category) => (
                  <Pressable
                    key={category.value}
                    onPress={() => setSelectedCategory(category.value)}
                    style={{
                      backgroundColor:
                        selectedCategory === category.value
                          ? colors.accent
                          : isDark
                            ? colors.surfaceVariant
                            : colors.surfaceVariant,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor:
                        selectedCategory === category.value
                          ? colors.accent
                          : isDark
                            ? colors.borderVariant
                            : colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: selectedCategory === category.value ? "#FFFFFF" : colors.textMedium,
                        fontSize: 14,
                        fontWeight: selectedCategory === category.value ? "700" : "500",
                      }}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Material Selection List */}
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Chọn vật liệu từ kho ({filteredInventory.length} loại)
            </Text>

            <FlatList
              data={filteredInventory}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const isSelected = selectedMaterials.has(item.id);
                const selectedQty = selectedMaterials.get(item.id) || 0;
                const stockColor = getStockLevelColor(item.currentStock);

                return (
                  <View
                    style={{
                      backgroundColor: colors.surface,
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: isSelected ? colors.accent : isDark ? colors.border : colors.borderVariant,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: 0.05,
                      shadowRadius: 2,
                      elevation: 2,
                    }}
                  >
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
                      <Pressable
                        onPress={() => toggleMaterialSelection(item.id)}
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 4,
                          borderWidth: 2,
                          borderColor: isSelected ? colors.accent : colors.border,
                          backgroundColor: isSelected ? colors.accent : "transparent",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: 12,
                        }}
                      >
                        {isSelected && <FontAwesome name="check" size={12} color="#FFFFFF" />}
                      </Pressable>

                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: colors.textHigh,
                            fontSize: 16,
                            fontWeight: "700",
                            marginBottom: 4,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: colors.textMedium,
                            fontSize: 12,
                          }}
                        >
                          {item.code}
                        </Text>
                      </View>

                      <View style={{ alignItems: "flex-end" }}>
                        <Text
                          style={{
                            color: stockColor,
                            fontSize: 14,
                            fontWeight: "700",
                          }}
                        >
                          {item.currentStock} {item.unit}
                        </Text>
                        <Text
                          style={{
                            color: colors.textMedium,
                            fontSize: 12,
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                            notation: "compact",
                          }).format(item.unitPrice)}
                          /{item.unit}
                        </Text>
                      </View>
                    </View>

                    {/* Stock Level Bar */}
                    <View
                      style={{
                        height: 4,
                        backgroundColor: isDark ? colors.borderVariant : colors.border,
                        borderRadius: 2,
                        marginBottom: 12,
                      }}
                    >
                      <View
                        style={{
                          height: 4,
                          width: `${Math.min((item.currentStock / 200) * 100, 100)}%`,
                          backgroundColor: stockColor,
                          borderRadius: 2,
                        }}
                      />
                    </View>

                    {/* Quantity Selector */}
                    {isSelected && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                          borderRadius: 8,
                          padding: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.textMedium,
                            fontSize: 14,
                            fontWeight: "600",
                          }}
                        >
                          Số lượng:
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                          <Pressable
                            onPress={() => updateQuantity(item.id, Math.max(1, selectedQty - 1))}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: colors.accent,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesome name="minus" size={14} color="#FFFFFF" />
                          </Pressable>

                          <TextInput
                            value={selectedQty.toString()}
                            onChangeText={(text) => {
                              const qty = parseInt(text) || 0;
                              if (qty <= item.currentStock) {
                                updateQuantity(item.id, qty);
                              }
                            }}
                            keyboardType="numeric"
                            style={{
                              width: 60,
                              textAlign: "center",
                              color: colors.textHigh,
                              fontSize: 16,
                              fontWeight: "700",
                              backgroundColor: colors.surface,
                              borderRadius: 8,
                              paddingVertical: 8,
                              borderWidth: 1,
                              borderColor: colors.border,
                            }}
                          />

                          <Pressable
                            onPress={() => updateQuantity(item.id, Math.min(item.currentStock, selectedQty + 1))}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 16,
                              backgroundColor: colors.accent,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <FontAwesome name="plus" size={14} color="#FFFFFF" />
                          </Pressable>
                        </View>
                      </View>
                    )}

                    {/* Warning for low stock */}
                    {item.currentStock < 20 && (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                          marginTop: 8,
                          padding: 8,
                          backgroundColor: "#fef2f2",
                          borderRadius: 6,
                          borderWidth: 1,
                          borderColor: "#fecaca",
                        }}
                      >
                        <FontAwesome name="exclamation-triangle" size={12} color="#dc2626" />
                        <Text
                          style={{
                            color: "#dc2626",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Tồn kho thấp
                        </Text>
                      </View>
                    )}
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>

        {/* Distribution Summary Panel */}
        <View
          style={{
            backgroundColor: colors.surface,
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: isDark ? colors.border : colors.borderVariant,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* Summary Stats */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {selectedMaterials.size}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Đã chọn
              </Text>
            </View>

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {request.materials?.length || 0}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Yêu cầu
              </Text>
            </View>

            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {getFulfillmentRate()}%
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Hoàn thành
              </Text>
            </View>
          </View>

          {/* Total Cost */}
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              Tổng chi phí phân phối
            </Text>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(calculateTotalCost())}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable
              onPress={handleClose}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                paddingVertical: 16,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Hủy bỏ
              </Text>
            </Pressable>

            <Pressable
              onPress={handleConfirm}
              style={{
                flex: 2,
                backgroundColor: colors.accent,
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: "center",
                shadowColor: colors.accent,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "700",
                }}
              >
                Xác nhận & Phê duyệt
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default MaterialDistributionModal;




