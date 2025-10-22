import { Text, View } from "react-native";

export interface BadgeProps {
  value?: number;
  color?: string;
}

export function Badge({ value = 0, color = "#FF3B30" }: BadgeProps) {
  if (!value) return null;
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 999,
        minWidth: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 2,
      }}
    >
      <Text style={{ color: "white", fontSize: 10, fontWeight: "700" }}>{value > 99 ? "99+" : value}</Text>
    </View>
  );
}

export default Badge;
