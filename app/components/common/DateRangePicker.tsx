import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

interface DateRangePickerProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  compact?: boolean;
}

const PRESET_RANGES: DateRange[] = [
  {
    start: new Date(),
    end: new Date(),
    label: "Hôm nay",
  },
  {
    start: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    end: new Date(),
    label: "7 ngày qua",
  },
  {
    start: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
    end: new Date(),
    label: "30 ngày qua",
  },
  {
    start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    end: new Date(),
    label: "Tháng này",
  },
];

export function DateRangePicker({ selectedRange, onRangeChange, compact = false }: DateRangePickerProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePresetSelect = (preset: DateRange) => {
    onRangeChange(preset);
    setIsModalVisible(false);
  };

  const formatDateRange = (range: DateRange) => {
    const startStr = range.start.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });
    const endStr = range.end.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" });

    if (range.start.getTime() === range.end.getTime()) {
      return startStr;
    }
    return `${startStr} - ${endStr}`;
  };

  if (compact) {
    return (
      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        <FontAwesome name="calendar" size={12} color={colors.textLow} />
        <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>{selectedRange.label}</Text>
        <FontAwesome name="chevron-down" size={10} color={colors.textLow} />
      </Pressable>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        <FontAwesome name="calendar" size={14} color={colors.accent} />
        <View style={{ flex: 1 }}>
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>{selectedRange.label}</Text>
          <Text style={{ color: colors.textLow, fontSize: 12 }}>{formatDateRange(selectedRange)}</Text>
        </View>
        <FontAwesome name="chevron-down" size={12} color={colors.textLow} />
      </Pressable>

      <Modal visible={isModalVisible} transparent animationType="fade" onRequestClose={() => setIsModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: isDark ? colors.background : "#FFFFFF",
              borderRadius: 12,
              padding: 20,
              width: "100%",
              maxWidth: 400,
              maxHeight: "80%",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}
            >
              <Text style={{ color: colors.textHigh, fontSize: 18, fontWeight: "700" }}>Chọn khoảng thời gian</Text>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="times" size={12} color={colors.textLow} />
              </Pressable>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              <View style={{ gap: 8 }}>
                {PRESET_RANGES.map((preset, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handlePresetSelect(preset)}
                    style={{
                      backgroundColor:
                        selectedRange.label === preset.label
                          ? colors.accent
                          : isDark
                          ? colors.surfaceVariant
                          : colors.surfaceVariant,
                      padding: 12,
                      borderRadius: 8,
                      borderWidth: selectedRange.label === preset.label ? 0 : 1,
                      borderColor: isDark ? colors.borderVariant : colors.border,
                    }}
                  >
                    <Text
                      style={{
                        color: selectedRange.label === preset.label ? "#FFFFFF" : colors.textHigh,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {preset.label}
                    </Text>
                    <Text
                      style={{
                        color: selectedRange.label === preset.label ? "#FFFFFF" : colors.textLow,
                        fontSize: 12,
                        marginTop: 2,
                      }}
                    >
                      {formatDateRange(preset)}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>Hủy</Text>
              </Pressable>
              <Pressable
                onPress={() => setIsModalVisible(false)}
                style={{
                  flex: 1,
                  backgroundColor: colors.accent,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "600" }}>Áp dụng</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}



