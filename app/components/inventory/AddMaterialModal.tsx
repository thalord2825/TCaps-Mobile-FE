import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import type { MaterialItem } from "../../data/sample-materials";

export interface AddMaterialModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (material: Omit<MaterialItem, "id" | "lastUpdated">) => void;
}

const categories = [
  "Vải Cotton",
  "Vải Polyester",
  "Chỉ Nylon",
  "Chỉ Thêu",
  "Keo Công Nghiệp",
  "Nhãn Vải",
  "Nút Bấm",
  "Dây Kéo",
];

const units = ["mét", "kg", "cuộn", "cái", "hộp"];

export function AddMaterialModal({ visible, onClose, onSave }: AddMaterialModalProps) {
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    category: categories[0],
    quantity: "",
    unit: units[0],
    costPerUnit: "",
    supplier: "",
    minThreshold: "",
  });

  const handleSave = () => {
    if (!formData.name || !formData.quantity || !formData.costPerUnit || !formData.supplier || !formData.minThreshold) {
      return; // Basic validation
    }

    onSave({
      name: formData.name,
      category: formData.category,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      costPerUnit: parseInt(formData.costPerUnit),
      supplier: formData.supplier,
      minThreshold: parseInt(formData.minThreshold),
    });

    // Reset form
    setFormData({
      name: "",
      category: categories[0],
      quantity: "",
      unit: units[0],
      costPerUnit: "",
      supplier: "",
      minThreshold: "",
    });
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      category: categories[0],
      quantity: "",
      unit: units[0],
      costPerUnit: "",
      supplier: "",
      minThreshold: "",
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={handleClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: C.background,
          paddingTop: 20,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: isDark ? "#2A2D35" : "#E5E7EB",
          }}
        >
          <Text
            style={{
              color: isDark ? "#fff" : C.dark,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Thêm nguyên liệu mới
          </Text>
          <Pressable onPress={handleClose}>
            <Text
              style={{
                color: C.primary,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Hủy
            </Text>
          </Pressable>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, gap: 20 }}>
          {/* Material Name */}
          <View>
            <Text
              style={{
                color: C.darkGrey,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Tên nguyên liệu *
            </Text>
            <TextInput
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Nhập tên nguyên liệu"
              style={{
                backgroundColor: C.card,
                borderRadius: 12,
                padding: 16,
                color: C.dark,
                fontSize: 16,
                borderWidth: 1,
                borderColor: isDark ? "#3A3D44" : "#E5E7EB",
              }}
              placeholderTextColor={C.darkGrey}
            />
          </View>

          {/* Category */}
          <View>
            <Text
              style={{
                color: C.darkGrey,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Danh mục
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setFormData({ ...formData, category })}
                  style={{
                    backgroundColor: formData.category === category ? C.primary : C.card,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: formData.category === category ? C.primary : isDark ? "#3A3D44" : "#E5E7EB",
                  }}
                >
                  <Text
                    style={{
                      color: formData.category === category ? "#FFFFFF" : C.dark,
                      fontSize: 12,
                      fontWeight: formData.category === category ? "700" : "500",
                    }}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Quantity and Unit */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: C.darkGrey,
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 8,
                }}
              >
                Số lượng *
              </Text>
              <TextInput
                value={formData.quantity}
                onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                placeholder="0"
                keyboardType="numeric"
                style={{
                  backgroundColor: C.card,
                  borderRadius: 12,
                  padding: 16,
                  color: C.dark,
                  fontSize: 16,
                  borderWidth: 1,
                  borderColor: isDark ? "#3A3D44" : "#E5E7EB",
                }}
                placeholderTextColor={C.darkGrey}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: C.darkGrey,
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 8,
                }}
              >
                Đơn vị
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {units.map((unit) => (
                  <Pressable
                    key={unit}
                    onPress={() => setFormData({ ...formData, unit })}
                    style={{
                      backgroundColor: formData.unit === unit ? C.primary : C.card,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: formData.unit === unit ? C.primary : isDark ? "#3A3D44" : "#E5E7EB",
                    }}
                  >
                    <Text
                      style={{
                        color: formData.unit === unit ? "#FFFFFF" : C.dark,
                        fontSize: 12,
                        fontWeight: formData.unit === unit ? "700" : "500",
                      }}
                    >
                      {unit}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Cost per Unit */}
          <View>
            <Text
              style={{
                color: C.darkGrey,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Giá mỗi đơn vị (VNĐ) *
            </Text>
            <TextInput
              value={formData.costPerUnit}
              onChangeText={(text) => setFormData({ ...formData, costPerUnit: text })}
              placeholder="0"
              keyboardType="numeric"
              style={{
                backgroundColor: C.card,
                borderRadius: 12,
                padding: 16,
                color: C.dark,
                fontSize: 16,
                borderWidth: 1,
                borderColor: isDark ? "#3A3D44" : "#E5E7EB",
              }}
              placeholderTextColor={C.darkGrey}
            />
          </View>

          {/* Supplier */}
          <View>
            <Text
              style={{
                color: C.darkGrey,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Nhà cung cấp *
            </Text>
            <TextInput
              value={formData.supplier}
              onChangeText={(text) => setFormData({ ...formData, supplier: text })}
              placeholder="Nhập tên nhà cung cấp"
              style={{
                backgroundColor: C.card,
                borderRadius: 12,
                padding: 16,
                color: C.dark,
                fontSize: 16,
                borderWidth: 1,
                borderColor: isDark ? "#3A3D44" : "#E5E7EB",
              }}
              placeholderTextColor={C.darkGrey}
            />
          </View>

          {/* Minimum Threshold */}
          <View>
            <Text
              style={{
                color: C.darkGrey,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Ngưỡng tối thiểu *
            </Text>
            <TextInput
              value={formData.minThreshold}
              onChangeText={(text) => setFormData({ ...formData, minThreshold: text })}
              placeholder="0"
              keyboardType="numeric"
              style={{
                backgroundColor: C.card,
                borderRadius: 12,
                padding: 16,
                color: C.dark,
                fontSize: 16,
                borderWidth: 1,
                borderColor: isDark ? "#3A3D44" : "#E5E7EB",
              }}
              placeholderTextColor={C.darkGrey}
            />
          </View>
        </ScrollView>

        {/* Save Button */}
        <View
          style={{
            padding: 20,
            borderTopWidth: 1,
            borderTopColor: isDark ? "#2A2D35" : "#E5E7EB",
          }}
        >
          <Pressable
            onPress={handleSave}
            style={{
              backgroundColor: C.primary,
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              Lưu nguyên liệu
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default AddMaterialModal;

