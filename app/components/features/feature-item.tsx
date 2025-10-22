import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

export interface FeatureItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
}

export function FeatureItem({ icon, label, onPress }: FeatureItemProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  return (
    <View style={{ alignItems: "center", width: "33%", marginBottom: 16 }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={10}
        onPress={onPress}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: isDark ? "#0B1420" : colors.surfaceVariant,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: isDark ? "#0E1A28" : colors.accent,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesome name={icon as any} color={isDark ? "#8fe3da" : "#FFFFFF"} size={20} />
        </View>
      </Pressable>
      <Text
        style={{
          color: isDark ? colors.textHigh : colors.textHigh,
          fontSize: 12,
          marginTop: 8,
          textAlign: "center",
          fontWeight: isDark ? "400" : "600",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default FeatureItem;
