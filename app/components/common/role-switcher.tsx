import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text } from "react-native";
import { UserRole } from "../../config/route-rules";
import { useTheme } from "../../context/theme-context";
import { useUser, useUserActions } from "../../context/user-context";
import { Toast } from "./Toast";

interface RoleOption {
  role: UserRole;
  label: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  { role: "Admin", label: "Admin", icon: "user-shield" },
  { role: "Lead", label: "Lead", icon: "users" },
  { role: "QC", label: "QC", icon: "check-circle" },
  { role: "Courier", label: "Courier", icon: "truck" },
  { role: "Staff", label: "Staff", icon: "user" },
];

export function RoleSwitcher() {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const { role: currentRole } = useUser();
  const { setRole } = useUserActions();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setShowModal(false);

    // Show toast notification
    const roleLabel = roleOptions.find((r) => r.role === newRole)?.label || newRole;
    setToastMessage(`Switched to: ${roleLabel}`);
    setShowToast(true);

    // Auto hide toast after 2 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const currentRoleOption = roleOptions.find((r) => r.role === currentRole);

  return (
    <>
      {/* Compact Role Switcher Button */}
      <Pressable
        onPress={() => setShowModal(true)}
        style={{
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          borderWidth: 1,
          borderColor: colors.accent,
          shadowColor: colors.accent,
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 2,
        }}
      >
        <FontAwesome name="cog" size={14} color={colors.accent} />
        <Text
          style={{
            color: colors.accent,
            fontSize: 12,
            fontWeight: "700",
          }}
        >
          {currentRoleOption?.label}
        </Text>
        <FontAwesome name="chevron-down" size={10} color={colors.textLow} />
      </Pressable>

      {/* Role Selection Modal */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={() => setShowModal(false)}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
          onPress={() => setShowModal(false)}
        >
          <Pressable
            style={{
              backgroundColor: colors.background,
              borderRadius: 16,
              padding: 20,
              width: "100%",
              maxWidth: 300,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 18,
                fontWeight: "800",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Switch Role
            </Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              {roleOptions.map((option) => (
                <Pressable
                  key={option.role}
                  onPress={() => handleRoleChange(option.role)}
                  style={{
                    backgroundColor:
                      currentRole === option.role
                        ? colors.accent
                        : isDark
                          ? colors.surfaceVariant
                          : colors.surfaceVariant,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor:
                      currentRole === option.role ? colors.accent : isDark ? colors.borderVariant : colors.border,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <FontAwesome
                    name={option.icon as any}
                    size={18}
                    color={currentRole === option.role ? (isDark ? "#0b1020" : "#FFFFFF") : colors.textHigh}
                  />
                  <Text
                    style={{
                      color: currentRole === option.role ? (isDark ? "#0b1020" : "#FFFFFF") : colors.textHigh,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {option.label}
                  </Text>
                  {currentRole === option.role && (
                    <FontAwesome
                      name="check"
                      size={14}
                      color={isDark ? "#0b1020" : "#FFFFFF"}
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} type="success" visible={showToast} onHide={() => setShowToast(false)} />
      )}
    </>
  );
}

export default RoleSwitcher;
