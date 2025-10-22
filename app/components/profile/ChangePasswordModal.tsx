import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";

export interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  onChangePassword: (currentPassword: string, newPassword: string) => void;
}

export function ChangePasswordModal({ visible, onClose, onChangePassword }: ChangePasswordModalProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const getPasswordStrength = (password: string) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };

    Object.values(checks).forEach((check) => {
      if (check) score++;
    });

    return {
      score,
      checks,
      strength: score < 2 ? "weak" : score < 4 ? "medium" : "strong",
    };
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "weak":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "strong":
        return "#10b981";
      default:
        return colors.textMedium;
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case "weak":
        return "Yếu";
      case "medium":
        return "Trung bình";
      case "strong":
        return "Mạnh";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Mật khẩu hiện tại không được để trống";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else {
      const strength = getPasswordStrength(formData.newPassword);
      if (strength.score < 3) {
        newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onChangePassword(formData.currentPassword, formData.newPassword);
      handleCancel();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể đổi mật khẩu. Vui lòng kiểm tra mật khẩu hiện tại và thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setShowPasswords({
      current: false,
      new: false,
      confirm: false,
    });
    onClose();
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

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
          <Pressable onPress={handleCancel}>
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
            Đổi mật khẩu
          </Text>
          <Pressable onPress={handleChangePassword} disabled={isLoading}>
            <Text
              style={{
                color: isLoading ? colors.textMedium : colors.accent,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {isLoading ? "Đang lưu..." : "Đổi"}
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
          {/* Security Icon */}
          <View style={{ alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: colors.accent,
              }}
            >
              <FontAwesome name="lock" size={32} color={colors.accent} />
            </View>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Bảo mật tài khoản
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Đổi mật khẩu để bảo vệ tài khoản của bạn
            </Text>
          </View>

          {/* Form Fields */}
          <View style={{ gap: 20 }}>
            {/* Current Password */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Mật khẩu hiện tại
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={formData.currentPassword}
                  onChangeText={(text) => setFormData({ ...formData, currentPassword: text })}
                  placeholder="Nhập mật khẩu hiện tại"
                  placeholderTextColor={colors.textMedium}
                  secureTextEntry={!showPasswords.current}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    paddingRight: 50,
                    borderWidth: 1,
                    borderColor: errors.currentPassword ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                    color: colors.textHigh,
                    fontSize: 16,
                  }}
                />
                <Pressable
                  onPress={() => togglePasswordVisibility("current")}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 14,
                  }}
                >
                  <FontAwesome name={showPasswords.current ? "eye-slash" : "eye"} size={16} color={colors.textMedium} />
                </Pressable>
              </View>
              {errors.currentPassword && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.currentPassword}
                </Text>
              )}
            </View>

            {/* New Password */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Mật khẩu mới
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={formData.newPassword}
                  onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                  placeholder="Nhập mật khẩu mới"
                  placeholderTextColor={colors.textMedium}
                  secureTextEntry={!showPasswords.new}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    paddingRight: 50,
                    borderWidth: 1,
                    borderColor: errors.newPassword ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                    color: colors.textHigh,
                    fontSize: 16,
                  }}
                />
                <Pressable
                  onPress={() => togglePasswordVisibility("new")}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 14,
                  }}
                >
                  <FontAwesome name={showPasswords.new ? "eye-slash" : "eye"} size={16} color={colors.textMedium} />
                </Pressable>
              </View>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <View style={{ marginTop: 8, gap: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 12,
                        fontWeight: "500",
                      }}
                    >
                      Độ mạnh:
                    </Text>
                    <Text
                      style={{
                        color: getStrengthColor(passwordStrength.strength),
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {getStrengthText(passwordStrength.strength)}
                    </Text>
                  </View>

                  {/* Strength Bar */}
                  <View
                    style={{
                      height: 4,
                      backgroundColor: isDark ? colors.borderVariant : colors.border,
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        height: "100%",
                        backgroundColor: getStrengthColor(passwordStrength.strength),
                        borderRadius: 2,
                      }}
                    />
                  </View>

                  {/* Password Requirements */}
                  <View style={{ gap: 4 }}>
                    {[
                      { check: passwordStrength.checks.length, text: "Ít nhất 8 ký tự" },
                      { check: passwordStrength.checks.lowercase, text: "Có chữ thường" },
                      { check: passwordStrength.checks.uppercase, text: "Có chữ hoa" },
                      { check: passwordStrength.checks.number, text: "Có số" },
                      { check: passwordStrength.checks.special, text: "Có ký tự đặc biệt" },
                    ].map((requirement, index) => (
                      <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <FontAwesome
                          name={requirement.check ? "check" : "times"}
                          size={10}
                          color={requirement.check ? "#10b981" : "#ef4444"}
                        />
                        <Text
                          style={{
                            color: requirement.check ? "#10b981" : "#ef4444",
                            fontSize: 11,
                            fontWeight: "500",
                          }}
                        >
                          {requirement.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {errors.newPassword && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.newPassword}
                </Text>
              )}
            </View>

            {/* Confirm Password */}
            <View>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Xác nhận mật khẩu mới
              </Text>
              <View style={{ position: "relative" }}>
                <TextInput
                  value={formData.confirmPassword}
                  onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                  placeholder="Nhập lại mật khẩu mới"
                  placeholderTextColor={colors.textMedium}
                  secureTextEntry={!showPasswords.confirm}
                  style={{
                    backgroundColor: colors.surface,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 14,
                    paddingRight: 50,
                    borderWidth: 1,
                    borderColor: errors.confirmPassword ? "#ef4444" : isDark ? colors.border : colors.borderVariant,
                    color: colors.textHigh,
                    fontSize: 16,
                  }}
                />
                <Pressable
                  onPress={() => togglePasswordVisibility("confirm")}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 14,
                  }}
                >
                  <FontAwesome name={showPasswords.confirm ? "eye-slash" : "eye"} size={16} color={colors.textMedium} />
                </Pressable>
              </View>
              {errors.confirmPassword && (
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 4,
                  }}
                >
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>

          {/* Security Tips */}
          <View
            style={{
              backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.accent + "30",
              gap: 12,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <FontAwesome name="shield" size={16} color={colors.accent} />
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                }}
              >
                Mẹo bảo mật
              </Text>
            </View>
            <View style={{ gap: 8 }}>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                • Sử dụng mật khẩu dài và phức tạp
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                • Không sử dụng thông tin cá nhân
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                • Đổi mật khẩu định kỳ
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  lineHeight: 16,
                }}
              >
                • Không chia sẻ mật khẩu với ai khác
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ChangePasswordModal;




