import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { ChartDataPoint, PieChartData } from "../../data/chart-data-generators";
import { AreaChart } from "./AreaChart";
import { BarChart } from "./BarChart";
import { DonutChart } from "./DonutChart";
import { LineChart } from "./LineChart";
import { PieChart } from "./PieChart";

interface InteractiveChartProps {
  type: "area" | "bar" | "donut" | "pie" | "line";
  title: string;
  overviewData: ChartDataPoint[] | PieChartData[];
  detailedData?: ChartDataPoint[] | PieChartData[];
  height?: number;
  color?: string;
  showExpandButton?: boolean;
  onExpand?: () => void;
  overviewTitle?: string;
  detailedTitle?: string;
}

export function InteractiveChart({
  type,
  title,
  overviewData,
  detailedData,
  height = 200,
  color,
  showExpandButton = true,
  onExpand,
  overviewTitle,
  detailedTitle,
}: InteractiveChartProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    if (showExpandButton && detailedData) {
      setIsExpanded(!isExpanded);
      onExpand?.();
    }
  };

  const currentData = isExpanded && detailedData ? detailedData : overviewData;
  const currentTitle = isExpanded && detailedTitle ? detailedTitle : overviewTitle || title;

  const renderChart = () => {
    const commonProps = {
      data: currentData,
      title: currentTitle,
      height: height,
      color: color,
    };

    switch (type) {
      case "area":
        return <AreaChart {...commonProps} data={currentData as ChartDataPoint[]} />;
      case "bar":
        return <BarChart {...commonProps} data={currentData as ChartDataPoint[]} />;
      case "donut":
        return <DonutChart {...commonProps} data={currentData as PieChartData[]} />;
      case "pie":
        return <PieChart {...commonProps} data={currentData as PieChartData[]} />;
      case "line":
        return <LineChart {...commonProps} data={currentData as ChartDataPoint[]} />;
      default:
        return <AreaChart {...commonProps} data={currentData as ChartDataPoint[]} />;
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
        opacity: showExpandButton ? 1 : 0.8,
      }}
    >
      {/* Header with expand button */}
      {showExpandButton && detailedData && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            {title}
          </Text>
          <View
            style={{
              backgroundColor: colors.accent,
              borderRadius: 20,
              width: 32,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome name={isExpanded ? "compress" : "expand"} size={14} color="#FFFFFF" />
          </View>
        </View>
      )}

      {/* Chart content */}
      {renderChart()}

      {/* Expand hint */}
      {showExpandButton && detailedData && !isExpanded && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 8,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <FontAwesome name="hand-pointer-o" size={12} color={colors.textLow} />
          <Text
            style={{
              color: colors.textLow,
              fontSize: 12,
              marginLeft: 6,
              fontStyle: "italic",
            }}
          >
            Nhấn để xem chi tiết
          </Text>
        </View>
      )}
    </Pressable>
  );
}
