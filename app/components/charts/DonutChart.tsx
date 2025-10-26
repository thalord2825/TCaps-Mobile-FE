import React from "react";
import { Text, View } from "react-native";
import { PieChart as GiftedPieChart } from "react-native-gifted-charts";
import { useTheme } from "../../context/theme-context";
import { PieChartData } from "../../data/chart-data-generators";

interface DonutChartProps {
  data: PieChartData[];
  title?: string;
  height?: number;
  showLabels?: boolean;
  centerText?: string;
}

export function DonutChart({ data, title, height = 200, showLabels = true, centerText }: DonutChartProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

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

      <View style={{ alignItems: "center", position: "relative" }}>
        <GiftedPieChart
          data={data}
          radius={height / 2 - 20}
          innerRadius={height * 0.3} // 30% inner radius for donut effect
          showText={false}
          textColor={isDark ? colors.textHigh : colors.textHigh}
          textSize={12}
          showTextBackground={false}
          textBackgroundRadius={26}
          showValuesAsLabels={false}
          animationDuration={1000}
        />

        {/* Center text */}
        {centerText && (
          <View
            style={{
              position: "absolute",
              top: height / 2 - 20,
              left: height / 2 - 40,
              width: 80,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 14,
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              {centerText}
            </Text>
          </View>
        )}
      </View>

      {/* Legend */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: 12,
          gap: 8,
        }}
      >
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 12,
              marginBottom: 4,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: item.color || colors.accent,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
