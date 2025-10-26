import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Role-specific home components
import { AdminHomeContent } from "../components/home/AdminHomeContent";
import { CourierHomeContent } from "../components/home/CourierHomeContent";
import { LeadHomeContent } from "../components/home/LeadHomeContent";
import { QCHomeContent } from "../components/home/QCHomeContent";
import { StaffHomeContent } from "../components/home/StaffHomeContent";

import { RoleSwitcher } from "../components/common/role-switcher";
import { ThemeToggle } from "../components/common/theme-toggle";
import { useTheme } from "../context/theme-context";
import { useUser } from "../context/user-context";

export default function Index() {
  const user = useUser();
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  // State management
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  // Render role-specific home content
  const renderHomeContent = () => {
    switch (user.role) {
      case "Admin":
        return <AdminHomeContent />;
      case "Lead":
        return <LeadHomeContent />;
      case "QC":
        return <QCHomeContent />;
      case "Courier":
        return <CourierHomeContent />;
      case "Staff":
        return <StaffHomeContent />;
      default:
        return <LeadHomeContent />; // Default fallback
    }
  };

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
          Trang chủ
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
          paddingBottom: 100,
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
          <View style={{ gap: 12 }}>
            {/* Role Switcher - Developer Mode */}
            <RoleSwitcher />

            {/* Role-specific home content */}
            {renderHomeContent()}
          </View>
        }
      />
    </SafeAreaView>
  );
}
