import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "../components/common/theme-toggle";
import { InventoryDashboard } from "../components/inventory/InventoryDashboard";
import { useTheme } from "../context/theme-context";

export default function Inventory() {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const handleViewHistory = useCallback((materialId: string) => {
    // TODO: Navigate to material history screen
    console.log("View history for material:", materialId);
  }, []);

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
          Kho nguyên liệu
        </Text>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <ThemeToggle />
          <Pressable>
            <FontAwesome name="qrcode" size={20} color={isDark ? "#fff" : colors.textHigh} />
          </Pressable>
        </View>
      </View>

      {/* Inventory Dashboard */}
      <InventoryDashboard onViewHistory={handleViewHistory} />
    </SafeAreaView>
  );
}
