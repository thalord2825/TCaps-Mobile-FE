import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";

export interface EditProfileModalProps {
  visible: boolean;
  profile: ProfileData;
  onClose: () => void;
  onSave: (updatedProfile: Partial<ProfileData>) => void;
}

export function EditProfileModal({ visible, profile, onClose, onSave }: EditProfileModalProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên không được để trống";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại phải có 10-11 chữ số";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSave(formData);
      onClose();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể cập nhật thông tin. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
    setErrors({});
    onClose();
  };

  const handleAvatarPress = () => {
    Alert.alert("Thay đổi ảnh đại diện", "Chọn cách thay đổi ảnh đại diện", [
      { text: "Hủy", style: "cancel" },
      { text: "Chụp ảnh", onPress: () => console.log("Take photo") },
      { text: "Chọn từ thư viện", onPress: () => console.log("Choose from library") },
    ]);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
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
          }}
        >
          <Pressable
            onPress={handleCancel}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text
              style={{
                color: colors.accent,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Hủy
            </Text>
          </Pressable>
          <Text
            style={{
              color: isDark ? "#fff" : colors.textHigh,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Chỉnh sửa hồ sơ
          </Text>
          <Pressable
            onPress={handleSave}
            disabled={isLoading}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text
              style={{
                color: isLoading ? colors.textMedium : colors.accent,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {isLoading ? "Đang lưu..." : "Lưu"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingVertical: 24,
            gap: 24,
          }}
        >
          {/* Avatar Section */}
          <View style={{ alignItems: "center", gap: 16 }}>
            <Pressable onPress={handleAvatarPress}>
              <View
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 3,
                  borderColor: colors.accent,
                  shadowColor: colors.accent,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                {profile.avatarUri ? (
                  <Text style={{ color: colors.textHigh, fontSize: 40, fontWeight: "700" }}>
                    {formData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                ) : (
                  <FontAwesome name="user" size={40} color={colors.textMedium} />
                )}
              </View>
            </Pressable>
            <Pressable onPress={handleAvatarPress}>
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Thay đổi ảnh đại diện
              </Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View style={{ gap: 20 }}>
            {/* Name Field */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Họ và tên
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Nhập họ và tên"
                placeholderTextColor={colors.textMedium}
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: errors.name ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                  color: colors.textHigh,
                  fontSize: 16,
                }}
              />
              {errors.name && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.name}
                </Text>
              )}
            </View>

            {/* Email Field */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Email
              </Text>
              <TextInput
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                placeholder="Nhập địa chỉ email"
                placeholderTextColor={colors.textMedium}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: errors.email ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                  color: colors.textHigh,
                  fontSize: 16,
                }}
              />
              {errors.email && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Phone Field */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Số điện thoại
              </Text>
              <TextInput
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="Nhập số điện thoại"
                placeholderTextColor={colors.textMedium}
                keyboardType="phone-pad"
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  borderWidth: 1,
                  borderColor: errors.phone ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                  color: colors.textHigh,
                  fontSize: 16,
                }}
              />
              {errors.phone && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.phone}
                </Text>
              )}
            </View>

            {/* Read-only Fields */}
            <View style={{ gap: 16 }}>
              <View
                style={{
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 12,
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 4,
                  }}
                >
                  Vai trò
                </Text>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {profile.role}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  borderRadius: 12,
                  padding: 16,
                  borderWidth: 1,
                  borderColor: isDark ? colors.borderVariant : colors.border,
                }}
              >
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 12,
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 4,
                  }}
                >
                  Mã nhân viên
                </Text>
                <Text
                  style={{
                    color: colors.textHigh,
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {profile.employeeId}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default EditProfileModal;
