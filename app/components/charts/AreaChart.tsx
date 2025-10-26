import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";
import { ChartDataPoint } from "../../data/chart-data-generators";

interface AreaChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  color?: string;
  showGrid?: boolean;
}

export function AreaChart({ data, title, height = 200, color, showGrid = true }: AreaChartProps) {
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

      <LineChart
        data={data}
        height={height}
        width={300}
        color={chartColor}
        thickness={2}
        showVerticalLines={showGrid}
        animateOnDataChange
        animationDuration={1000}
        noOfSections={4}
        backgroundColor={isDark ? colors.surfaceVariant : colors.surfaceVariant}
        rulesColor={isDark ? colors.borderVariant : colors.border}
        textColor={isDark ? colors.textLow : colors.textLow}
        areaChart={true}
        startFillColor={chartColor}
        endFillColor={chartColor}
        startOpacity={0.3}
        endOpacity={0.1}
        dataPointsRadius={0}
        dataPointsColor="transparent"
      />
    </View>
  );
}
