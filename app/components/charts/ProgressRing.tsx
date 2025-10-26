import React from "react";
import { Text, View } from "react-native";
import { PieChart as GiftedPieChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  label?: string;
  showPercentage?: boolean;
}

export function ProgressRing({
  percentage,
  size = 80,
  strokeWidth = 8,
  color,
  backgroundColor,
  label,
  showPercentage = true,
}: ProgressRingProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const chartColor = color || colors.accent;
  const bgColor = backgroundColor || (isDark ? colors.borderVariant : colors.border);

  // Create data for the progress ring
  const progressData = [
    { value: percentage, color: chartColor },
    { value: 100 - percentage, color: bgColor },
  ];

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ position: "relative", width: size, height: size }}>
        <GiftedPieChart
          data={progressData}
          radius={size / 2 - 10}
          innerRadius={size * 0.4}
          showText={false}
          animationDuration={1000}
        />

        {/* Center content */}
        <View
          style={{
            position: "absolute",
            top: size / 2 - 20,
            left: size / 2 - 30,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showPercentage && (
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              {percentage}%
            </Text>
          )}
          {label && (
            <Text
              style={{
                color: colors.textLow,
                fontSize: 10,
                fontWeight: "500",
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {label}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}
