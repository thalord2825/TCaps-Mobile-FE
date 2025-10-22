import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { MaterialItem } from "../../data/sample-materials";
import { sampleMaterials } from "../../data/sample-materials";
import { AddMaterialModal } from "./AddMaterialModal";
import { FloatingAddButton } from "./FloatingAddButton";
import { InventoryMaterialCard } from "./InventoryMaterialCard";

interface InventoryDashboardProps {
  onViewHistory?: (materialId: string) => void;
}

export function InventoryDashboard({ onViewHistory }: InventoryDashboardProps) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  const { colors } = useTheme();

  const [materials, setMaterials] = useState<MaterialItem[]>(sampleMaterials);
  const [selectedCategory] = useState("Tất cả");
  const [selectedSubCategory] = useState("None");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter materials
  const filteredMaterials = materials.filter((material) => {
    const matchesCategory = selectedCategory === "Tất cả" || material.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddMaterial = (newMaterial: Omit<MaterialItem, "id" | "lastUpdated">) => {
    const material: MaterialItem = {
      ...newMaterial,
      id: `M-${Date.now()}`,
      lastUpdated: new Date().toLocaleDateString("vi-VN"),
    };
    setMaterials([...materials, material]);
  };

  const handleViewHistory = (materialId: string) => {
    onViewHistory?.(materialId);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        data={[{ key: "content" }]}
        renderItem={() => null}
        ListHeaderComponent={
          <View style={{ gap: isDark ? 12 : 16 }}>
            {/* Search & Filter Section */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 20,
                borderWidth: 1,
                borderColor: isDark ? colors.border : colors.borderVariant,
                marginTop: 16,
              }}
            >
              <View style={{ gap: 16 }}>
                {/* Search Bar */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <FontAwesome name="search" size={16} color={colors.textMedium} style={{ marginRight: 12 }} />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Tìm kiếm nguyên liệu"
                    placeholderTextColor={colors.textMedium}
                    style={{
                      flex: 1,
                      color: colors.textHigh,
                      fontSize: 16,
                    }}
                  />
                </View>

                {/* Filter Row */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 12,
                        fontWeight: "600",
                        marginBottom: 4,
                      }}
                    >
                      Danh mục
                    </Text>
                    <Pressable
                      style={{
                        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: isDark ? colors.borderVariant : colors.border,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textHigh,
                          fontSize: 14,
                        }}
                      >
                        {selectedCategory}
                      </Text>
                      <FontAwesome name="chevron-down" size={12} color={colors.textMedium} />
                    </Pressable>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 12,
                        fontWeight: "600",
                        marginBottom: 4,
                      }}
                    >
                      Danh mục phụ
                    </Text>
                    <Pressable
                      style={{
                        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: isDark ? colors.borderVariant : colors.border,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: colors.textHigh,
                          fontSize: 14,
                        }}
                      >
                        {selectedSubCategory}
                      </Text>
                      <FontAwesome name="chevron-down" size={12} color={colors.textMedium} />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ gap: isDark ? 12 : 16, marginTop: isDark ? 12 : 16 }}>
            {filteredMaterials.map((item) => (
              <InventoryMaterialCard key={item.id} item={item} onViewHistory={handleViewHistory} />
            ))}
            {filteredMaterials.length === 0 && (
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 18,
                  padding: 32,
                  alignItems: "center",
                  gap: 12,
                  marginTop: 40,
                }}
              >
                <FontAwesome name="cube" size={48} color={colors.textMedium} />
                <Text
                  style={{
                    color: isDark ? "#fff" : colors.textHigh,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy nguyên liệu
                </Text>
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Thử điều chỉnh tìm kiếm hoặc bộ lọc
                </Text>
              </View>
            )}
          </View>
        }
      />

      {/* Floating Add Button */}
      <FloatingAddButton onPress={() => setShowAddModal(true)} />

      {/* Add Material Modal */}
      <AddMaterialModal visible={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleAddMaterial} />
    </View>
  );
}
