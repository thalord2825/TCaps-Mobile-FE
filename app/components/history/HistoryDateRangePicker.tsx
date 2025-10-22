import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";

export interface DateRange {
  startDate: string;
  endDate: string;
  label: string;
}

interface HistoryDateRangePickerProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const presetRanges = [
  { label: "Hôm nay", days: 0 },
  { label: "7 ngày qua", days: 7 },
  { label: "30 ngày qua", days: 30 },
  { label: "Tháng này", days: -1 }, // Special case for current month
  { label: "Dữ liệu mẫu", days: -3 }, // Special case for sample data
  { label: "Tùy chỉnh", days: -2 }, // Special case for custom
];

export function HistoryDateRangePicker({ selectedRange, onRangeChange }: HistoryDateRangePickerProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [showCustomModal, setShowCustomModal] = useState(false);

  const getDateRange = (days: number): DateRange => {
    const today = new Date();
    const startDate = new Date(today);

    if (days === -1) {
      // Current month
      startDate.setDate(1);
      return {
        startDate: startDate.toISOString().split("T")[0],
        endDate: today.toISOString().split("T")[0],
        label: "Tháng này",
      };
    }

    if (days === -2) {
      // Custom - return current selection
      return selectedRange;
    }

    if (days === -3) {
      // Sample data range
      return {
        startDate: "2024-09-01",
        endDate: "2024-12-31",
        label: "Dữ liệu mẫu",
      };
    }

    startDate.setDate(today.getDate() - days);
    return {
      startDate: startDate.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
      label: presetRanges.find((p) => p.days === days)?.label || "Tùy chỉnh",
    };
  };

  const handlePresetSelect = (days: number) => {
    if (days === -2) {
      setShowCustomModal(true);
      return;
    }

    const range = getDateRange(days);
    onRangeChange(range);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: isDark ? colors.border : colors.borderVariant,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesome name="calendar" size={16} color={colors.accent} />
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Khoảng thời gian
          </Text>
        </View>
        <Text
          style={{
            color: colors.textMedium,
            fontSize: 12,
            backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "20",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
          }}
        >
          {selectedRange.label}
        </Text>
      </View>

      {/* Selected Range Display */}
      <View
        style={{
          backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.accent + "30",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesome name="calendar-o" size={14} color={colors.accent} />
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {formatDate(selectedRange.startDate)} - {formatDate(selectedRange.endDate)}
          </Text>
        </View>
      </View>

      {/* Preset Buttons */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {presetRanges.map((preset) => (
          <Pressable
            key={preset.label}
            onPress={() => handlePresetSelect(preset.days)}
            style={{
              backgroundColor:
                selectedRange.label === preset.label
                  ? colors.accent
                  : isDark
                    ? colors.surfaceVariant
                    : colors.surfaceVariant,
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor:
                selectedRange.label === preset.label ? colors.accent : isDark ? colors.borderVariant : colors.border,
            }}
          >
            <Text
              style={{
                color: selectedRange.label === preset.label ? "#FFFFFF" : colors.textMedium,
                fontSize: 12,
                fontWeight: selectedRange.label === preset.label ? "700" : "500",
              }}
            >
              {preset.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Custom Date Picker Modal */}
      <Modal
        visible={showCustomModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCustomModal(false)}
      >
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
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 24,
              width: "100%",
              maxWidth: 400,
              borderWidth: 1,
              borderColor: isDark ? colors.border : colors.borderVariant,
            }}
          >
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 18,
                fontWeight: "700",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Chọn khoảng thời gian
            </Text>

            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Tính năng chọn ngày tùy chỉnh sẽ được phát triển trong phiên bản tiếp theo
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <Pressable
                onPress={() => setShowCustomModal(false)}
                style={{
                  flex: 1,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  Đóng
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default HistoryDateRangePicker;
