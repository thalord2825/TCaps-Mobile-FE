import React from "react";
import { Text, View } from "react-native";
import { LineChart as GiftedLineChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";
import { ChartDataPoint } from "../../data/chart-data-generators";

interface LineChartProps {
  data: ChartDataPoint[];
  title?: string;
  height?: number;
  showGrid?: boolean;
  color?: string;
  showDataPoints?: boolean;
}

export function LineChart({
  data,
  title,
  height = 200,
  showGrid = true,
  color,
  showDataPoints = true,
}: LineChartProps) {
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

      <GiftedLineChart
        data={data}
        height={height}
        width={300}
        color={chartColor}
        thickness={3}
        dataPointsColor={showDataPoints ? chartColor : "transparent"}
        dataPointsRadius={showDataPoints ? 4 : 0}
        showVerticalLines={showGrid}
        animateOnDataChange
        animationDuration={1000}
        noOfSections={4}
        backgroundColor={isDark ? colors.surfaceVariant : colors.surfaceVariant}
        rulesColor={isDark ? colors.borderVariant : colors.border}
        textColor1={isDark ? colors.textLow : colors.textLow}
        textColor2={isDark ? colors.textLow : colors.textLow}
      />
    </View>
  );
}
