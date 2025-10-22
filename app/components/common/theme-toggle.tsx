import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useTheme } from "../../context/theme-context";

export function ThemeToggle() {
  const { theme, colors, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Switch to ${isDark ? "light" : "dark"} mode`}
      onPress={toggleTheme}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
      }}
    >
      <FontAwesome name={isDark ? "sun-o" : "moon-o"} color={isDark ? "#f59e0b" : "#2C3E50"} size={16} />
      <Text
        style={{
          color: isDark ? "#f59e0b" : "#2C3E50",
          fontSize: 12,
          fontWeight: "600",
        }}
      >
        {isDark ? "Light" : "Dark"}
      </Text>
    </Pressable>
  );
}

export default ThemeToggle;
