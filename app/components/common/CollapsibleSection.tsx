import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "../../context/theme-context";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  compact?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  headerRight?: React.ReactNode;
  previewContent?: React.ReactNode;
}

export function CollapsibleSection({
  title,
  children,
  defaultExpanded = false,
  compact = false,
  onExpand,
  onCollapse,
  headerRight,
  previewContent,
}: CollapsibleSectionProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const animatedHeight = useSharedValue(defaultExpanded ? 1 : 0);
  const animatedRotation = useSharedValue(defaultExpanded ? 1 : 0);

  const toggleExpanded = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);

    animatedHeight.value = withTiming(newExpanded ? 1 : 0, {
      duration: 300,
    });

    animatedRotation.value = withTiming(newExpanded ? 1 : 0, {
      duration: 300,
    });

    if (newExpanded && onExpand) {
      onExpand();
    } else if (!newExpanded && onCollapse) {
      onCollapse();
    }
  };

  const animatedContentStyle = useAnimatedStyle(() => {
    const height = interpolate(
      animatedHeight.value,
      [0, 1],
      [0, 1000], // Max height - adjust based on content
      Extrapolate.CLAMP
    );

    return {
      height,
      opacity: interpolate(animatedHeight.value, [0, 0.1, 1], [0, 0, 1], Extrapolate.CLAMP),
    };
  });

  const animatedChevronStyle = useAnimatedStyle(() => {
    const rotation = interpolate(animatedRotation.value, [0, 1], [0, 180], Extrapolate.CLAMP);

    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  if (compact) {
    return (
      <View
        style={{
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
          overflow: "hidden",
        }}
      >
        <Pressable
          onPress={toggleExpanded}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 14,
                fontWeight: "600",
                flex: 1,
              }}
            >
              {title}
            </Text>
            {previewContent && !isExpanded && <View style={{ flex: 1 }}>{previewContent}</View>}
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {headerRight}
            <Animated.View style={animatedChevronStyle}>
              <FontAwesome name="chevron-down" size={12} color={colors.textLow} />
            </Animated.View>
          </View>
        </Pressable>

        <Animated.View style={animatedContentStyle}>
          <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>{children}</View>
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <Pressable
        onPress={toggleExpanded}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: isDark ? "#7aa2ff20" : colors.accent,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name="chart-bar" size={16} color={isDark ? "#7aa2ff" : "#FFFFFF"} />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
              }}
            >
              {title}
            </Text>
            {previewContent && !isExpanded && <View style={{ marginTop: 4 }}>{previewContent}</View>}
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {headerRight}
          <Animated.View style={animatedChevronStyle}>
            <FontAwesome name="chevron-down" size={14} color={colors.textLow} />
          </Animated.View>
        </View>
      </Pressable>

      <Animated.View style={animatedContentStyle}>
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>{children}</View>
      </Animated.View>
    </View>
  );
}



