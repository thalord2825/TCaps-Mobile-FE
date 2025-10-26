import React from "react";
import { Text, View } from "react-native";
import { LineChart as GiftedLineChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";
import { ChartDataPoint } from "../../data/chart-data-generators";

interface MiniSparklineProps {
  data: ChartDataPoint[];
  color?: string;
  height?: number;
  width?: number;
  showTrend?: boolean;
}

export function MiniSparkline({ data, color, height = 40, width = 120, showTrend = true }: MiniSparklineProps) {
  const { colors } = useTheme();

  const chartColor = color || colors.accent;

  // Calculate trend
  const trend = data.length > 1 ? data[data.length - 1].y - data[0].y : 0;

  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <View style={{ alignItems: "center" }}>
      <GiftedLineChart
        data={data}
        height={height}
        width={width}
        color={chartColor}
        thickness={2}
        dataPointsColor={chartColor}
        dataPointsRadius={2}
        showVerticalLines={false}
        animateOnDataChange
        animationDuration={1000}
        noOfSections={2}
        backgroundColor="transparent"
        hideYAxisText
        hideAxesAndRules
        hideDataPoints={false}
      />

      {showTrend && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 4,
            gap: 4,
          }}
        >
          <Text
            style={{
              color: isPositive ? colors.success : isNegative ? colors.error : colors.textLow,
              fontSize: 10,
              fontWeight: "600",
            }}
          >
            {isPositive ? "↗" : isNegative ? "↘" : "→"}
          </Text>
          <Text
            style={{
              color: colors.textLow,
              fontSize: 10,
              fontWeight: "500",
            }}
          >
            {Math.abs(trend).toFixed(1)}
          </Text>
        </View>
      )}
    </View>
  );
}
