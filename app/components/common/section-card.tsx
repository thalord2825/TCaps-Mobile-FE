import { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme-context";

export interface SectionCardProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function SectionCard({ children, style }: SectionCardProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 16,
        padding: 16,
        gap: 12,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: "#000",
        shadowOpacity: isDark ? 0.25 : 0.1,
        shadowRadius: 12,
        elevation: 4,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

export default SectionCard;
