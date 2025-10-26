import React from "react";
import { Text, View } from "react-native";
import { BarChart as GiftedBarChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";
import { ChartDataPoint } from "../../data/chart-data-generators";

interface BarChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  horizontal?: boolean;
  color?: string;
  showLabels?: boolean;
}

export function BarChart({ data, title, height = 200, horizontal = false, color, showLabels = true }: BarChartProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  const chartColor = color || colors.accent;

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
      }}
    >
      {title && (
        <Text
          style={{
            color: colors.textHigh,
            fontSize: 16,
            fontWeight: "700",
            marginBottom: 12,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      )}

      <GiftedBarChart
        data={data}
        height={height}
        width={300}
        barWidth={40}
        color={chartColor}
        showValuesAsTopLabel={showLabels}
        topLabelTextStyle={{
          color: isDark ? colors.textHigh : colors.textHigh,
          fontSize: 10,
          fontWeight: "600",
        }}
        animationDuration={1000}
        noOfSections={4}
        backgroundColor={isDark ? colors.surfaceVariant : colors.surfaceVariant}
        rulesColor={isDark ? colors.borderVariant : colors.border}
        spacing={20}
      />
    </View>
  );
}
