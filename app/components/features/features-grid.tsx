import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { features } from "../../data/features";
import SectionCard from "../common/section-card";
import { FeatureItem } from "./feature-item";

export interface FeaturesGridProps {
  onPressItem?: (id: string) => void;
  onCustomize?: () => void;
  onViewAll?: () => void;
}

export function FeaturesGrid({ onPressItem, onCustomize, onViewAll }: FeaturesGridProps) {
  const { colors } = useTheme();
  return (
    <SectionCard>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: colors.textHigh, fontWeight: "800" }}>Chức năng khác</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onCustomize}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <Text style={{ color: colors.accent, fontWeight: "700" }}>Tùy chỉnh</Text>
          <FontAwesome name="sliders" color={colors.accent} size={14} />
        </Pressable>
      </View>

      {/* Grid - 3 columns, center when only two items */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* Spacer to center two items in first row */}
        {features.length === 2 ? <View style={{ width: "16.5%" }} /> : null}
        {features.map((f) => (
          <FeatureItem key={f.id} icon={f.icon} label={f.label} onPress={() => onPressItem?.(f.id)} />
        ))}
        {features.length === 2 ? <View style={{ width: "16.5%" }} /> : null}
      </View>

      {/* Footer */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <View style={{ width: 18, height: 6, borderRadius: 3, backgroundColor: colors.accent }} />
          <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border }} />
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={onViewAll}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <Text style={{ color: colors.accent, fontWeight: "700" }}>Xem tất cả</Text>
          <FontAwesome name="arrow-right" color={colors.accent} size={12} />
        </Pressable>
      </View>
    </SectionCard>
  );
}

export default FeaturesGrid;
