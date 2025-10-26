import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

interface Factory {
  id: string;
  name: string;
  color: string;
}

interface BatchSectionHeaderProps {
  selectedFactory?: string;
  onFactoryChange?: (factoryId: string) => void;
  factories?: Factory[];
}

export function BatchSectionHeader({
  selectedFactory = "all",
  onFactoryChange,
  factories = [],
}: BatchSectionHeaderProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [showFactoryModal, setShowFactoryModal] = useState<boolean>(false);

  // Default factories if none provided
  const defaultFactories: Factory[] = [
    { id: "all", name: "Tất cả nhà máy", color: colors.accent },
    { id: "factory_a", name: "Nhà máy A - Cắt vải", color: "#3b82f6" },
    { id: "factory_b", name: "Nhà máy B - Thêu", color: "#10b981" },
    { id: "factory_c", name: "Nhà máy C - In", color: "#f59e0b" },
    { id: "factory_d", name: "Nhà máy D - May vành", color: "#ef4444" },
  ];

  const availableFactories = factories.length > 0 ? factories : defaultFactories;
  const currentFactory = availableFactories.find((f) => f.id === selectedFactory);

  const handleSelectFactory = (factoryId: string) => {
    onFactoryChange?.(factoryId);
    setShowFactoryModal(false);
  };

  return (
    <>
      <View style={{ paddingHorizontal: 4, paddingBottom: 8 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Text style={{ color: colors.textHigh, fontWeight: "800" }}>Lô hàng</Text>
          {onFactoryChange && (
            <Pressable
              onPress={() => setShowFactoryModal(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                borderWidth: 1,
                borderColor: isDark ? colors.borderVariant : colors.border,
              }}
            >
              <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>
                {currentFactory?.name || "Tất cả nhà máy"}
              </Text>
              <FontAwesome name="chevron-down" size={10} color={colors.textLow} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Factory Selector Modal */}
      {onFactoryChange && (
        <Modal
          visible={showFactoryModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowFactoryModal(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <View
              style={{
                backgroundColor: isDark ? colors.surface : "#FFFFFF",
                borderRadius: 16,
                padding: 20,
                width: "100%",
                maxWidth: 400,
                maxHeight: "80%",
                borderWidth: 1,
                borderColor: isDark ? colors.borderVariant : colors.border,
              }}
            >
              {/* Header */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 18,
                    fontWeight: "700",
                  }}
                >
                  Chọn nhà máy (Giai đoạn)
                </Text>
                <Pressable
                  onPress={() => setShowFactoryModal(false)}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome name="times" size={16} color={colors.textHigh} />
                </Pressable>
              </View>

              {/* Factory List */}
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ gap: 8 }}>
                  {availableFactories.map((factory) => (
                    <Pressable
                      key={factory.id}
                      onPress={() => handleSelectFactory(factory.id)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor:
                          selectedFactory === factory.id
                            ? factory.color
                            : isDark
                              ? colors.borderVariant
                              : colors.border,
                        backgroundColor:
                          selectedFactory === factory.id
                            ? `${factory.color}20`
                            : isDark
                              ? colors.surfaceVariant
                              : colors.surfaceVariant,
                      }}
                    >
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                          backgroundColor: factory.color,
                          marginRight: 12,
                        }}
                      />
                      <Text
                        style={{
                          flex: 1,
                          color: colors.textHigh,
                          fontSize: 16,
                          fontWeight: selectedFactory === factory.id ? "700" : "500",
                        }}
                      >
                        {factory.name}
                      </Text>
                      {selectedFactory === factory.id && <FontAwesome name="check" size={16} color={factory.color} />}
                    </Pressable>
                  ))}
                </View>
              </ScrollView>

              {/* Footer */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <Pressable
                  onPress={() => setShowFactoryModal(false)}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    Hủy
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setShowFactoryModal(false)}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    backgroundColor: colors.accent,
                    alignItems: "center",
                    marginLeft: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    Xác nhận
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

export default BatchSectionHeader;
