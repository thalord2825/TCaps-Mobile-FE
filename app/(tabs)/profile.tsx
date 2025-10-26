import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { Alert, FlatList, LayoutAnimation, Pressable, RefreshControl, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "../components/common/theme-toggle";
import { Toast } from "../components/common/Toast";
import { ChangePasswordModal } from "../components/profile/ChangePasswordModal";
import { ContractDetailsCard } from "../components/profile/ContractDetailsCard";
import { EditProfileModal } from "../components/profile/EditProfileModal";
import { PerformanceEarningsCard } from "../components/profile/PerformanceEarningsCard";
import { ProfileHeaderCard } from "../components/profile/ProfileHeaderCard";
import { ProfileQuickActions } from "../components/profile/ProfileQuickActions";
import { ProfileStatsCard } from "../components/profile/ProfileStatsCard";
import { SettingsCard } from "../components/profile/SettingsCard";
import { useTheme } from "../context/theme-context";
import { useUser } from "../context/user-context";
import { getEarningsByRole, getPerformanceByRole, getProfileByRole, type ProfileData } from "../data/sample-profile";

export default function Profile() {
  const { colors } = useTheme();
  const { role } = useUser();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // State management
  const [profile, setProfile] = useState<ProfileData>(getProfileByRole(role));
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);

  // Visibility toggles for sections (only one visible at a time)
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setProfile(getProfileByRole(role));
      setRefreshing(false);
    }, 1000);
  }, [role]);

  const handleEditProfile = useCallback(() => {
    setEditModalVisible(true);
  }, []);

  const handleSaveProfile = useCallback(
    (updatedData: Partial<ProfileData>) => {
      setProfile({ ...profile, ...updatedData });
      showToast("✓ Đã cập nhật thông tin cá nhân", "success");
    },
    [profile]
  );

  const handleViewContract = useCallback(() => {
    // TODO: Navigate to contract detail screen
    console.log("View contract details");
    showToast("Chuyển đến trang chi tiết hợp đồng", "info");
  }, []);

  const handleToggleNotification = useCallback(
    (enabled: boolean) => {
      setProfile({ ...profile, notificationEnabled: enabled });
      showToast(enabled ? "✓ Đã bật thông báo" : "✗ Đã tắt thông báo", "info");
    },
    [profile]
  );

  const handleLanguageChange = useCallback(
    (language: "vi" | "en") => {
      setProfile({ ...profile, language });
      showToast(`✓ Đã chuyển ngôn ngữ sang ${language === "vi" ? "Tiếng Việt" : "English"}`, "info");
    },
    [profile]
  );

  const handleChangePassword = useCallback(() => {
    setChangePasswordModalVisible(true);
  }, []);

  const handlePasswordChange = useCallback((currentPassword: string, newPassword: string) => {
    // TODO: Implement password change logic
    console.log("Change password:", currentPassword, newPassword);
    showToast("✓ Đã đổi mật khẩu thành công", "success");
  }, []);

  const handleHelpSupport = useCallback(() => {
    // TODO: Navigate to help/support screen
    console.log("Navigate to help/support");
    showToast("Chuyển đến trang trợ giúp", "info");
  }, []);

  const handleLogout = useCallback(() => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: () => {
          // TODO: Implement logout logic
          console.log("Logout");
          showToast("Đã đăng xuất thành công", "success");
        },
      },
    ]);
  }, []);

  const handleQuickAction = useCallback(
    (actionId: string) => {
      // Toggle section visibility (only one visible at a time)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      switch (actionId) {
        case "stats":
        case "earnings":
        case "contract":
        case "settings":
          setActiveSection(activeSection === actionId ? null : actionId);
          break;
        default:
          console.log("Unknown action:", actionId);
      }
    },
    [activeSection]
  );

  // Get role-specific data
  const earnings = getEarningsByRole(role);
  const performanceData = getPerformanceByRole(role);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.border : colors.borderVariant,
        }}
      >
        <Pressable>
          <FontAwesome name="bars" size={20} color={isDark ? "#fff" : colors.textHigh} />
        </Pressable>
        <Text
          style={{
            color: isDark ? "#fff" : colors.textHigh,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Hồ sơ cá nhân
        </Text>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <ThemeToggle />
          <Pressable>
            <FontAwesome name="bell" size={20} color={isDark ? "#fff" : colors.textHigh} />
          </Pressable>
        </View>
      </View>

      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 120,
        }}
        data={[{ key: "content" }]}
        renderItem={() => null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: isDark ? 12 : 16 }}>
            {/* Profile Header */}
            <ProfileHeaderCard profile={profile} onEditProfile={handleEditProfile} />

            {/* Quick Actions */}
            <ProfileQuickActions profile={profile} onActionPress={handleQuickAction} />

            {/* Stats Card (exclusive visibility) */}
            {activeSection === "stats" && <ProfileStatsCard profile={profile} />}

            {/* Performance & Earnings Combined (exclusive visibility) */}
            {activeSection === "earnings" && (
              <PerformanceEarningsCard performanceData={performanceData} earnings={earnings} role={role} />
            )}

            {/* Contract Details (exclusive visibility) */}
            {activeSection === "contract" && (
              <ContractDetailsCard profile={profile} onViewContract={handleViewContract} />
            )}

            {/* Settings (exclusive visibility) */}
            {activeSection === "settings" && (
              <SettingsCard
                profile={profile}
                onToggleNotification={handleToggleNotification}
                onLanguageChange={handleLanguageChange}
                onChangePassword={handleChangePassword}
                onHelpSupport={handleHelpSupport}
                onLogout={handleLogout}
              />
            )}
          </View>
        }
      />

      {/* Modals */}
      <EditProfileModal
        visible={editModalVisible}
        profile={profile}
        onClose={() => setEditModalVisible(false)}
        onSave={handleSaveProfile}
      />

      <ChangePasswordModal
        visible={changePasswordModalVisible}
        onClose={() => setChangePasswordModalVisible(false)}
        onChangePassword={handlePasswordChange}
      />

      {/* Toast Notification */}
      <Toast visible={toastVisible} message={toastMessage} type={toastType} onHide={() => setToastVisible(false)} />
    </SafeAreaView>
  );
}
