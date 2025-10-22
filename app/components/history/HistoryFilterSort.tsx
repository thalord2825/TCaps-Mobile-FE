import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import { factories, productCodes, sortOptions } from "../../data/sample-history-batches";

export interface HistoryFilterSortProps {
  selectedProductCodes: string[];
  selectedStatuses: string[];
  selectedFactories: string[];
  selectedSort: string;
  onProductCodeChange: (codes: string[]) => void;
  onStatusChange: (statuses: string[]) => void;
  onFactoryChange: (factories: string[]) => void;
  onSortChange: (sort: string) => void;
}

const statusOptions = [
  { label: "Hoàn thành", value: "Completed", color: "#10b981" },
  { label: "Hủy bỏ", value: "Cancelled", color: "#ef4444" },
  { label: "Trả về", value: "Returned", color: "#f59e0b" },
];

export function HistoryFilterSort({
  selectedProductCodes,
  selectedStatuses,
  selectedFactories,
  selectedSort,
  onProductCodeChange,
  onStatusChange,
  onFactoryChange,
  onSortChange,
}: HistoryFilterSortProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleProductCode = (code: string) => {
    const newCodes = selectedProductCodes.includes(code)
      ? selectedProductCodes.filter((c) => c !== code)
      : [...selectedProductCodes, code];
    onProductCodeChange(newCodes);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    onStatusChange(newStatuses);
  };

  const toggleFactory = (factory: string) => {
    const newFactories = selectedFactories.includes(factory)
      ? selectedFactories.filter((f) => f !== factory)
      : [...selectedFactories, factory];
    onFactoryChange(newFactories);
  };

  const getActiveFilterCount = () => {
    return selectedProductCodes.length + selectedStatuses.length + selectedFactories.length;
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
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: isExpanded ? 16 : 0,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <FontAwesome name="filter" size={16} color={colors.accent} />
          <Text
            style={{
              color: colors.textHigh,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Bộ lọc & Sắp xếp
          </Text>
          {getActiveFilterCount() > 0 && (
            <View
              style={{
                backgroundColor: colors.accent,
                borderRadius: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
                minWidth: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  fontWeight: "700",
                }}
              >
                {getActiveFilterCount()}
              </Text>
            </View>
          )}
        </View>
        <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={14} color={colors.textMedium} />
      </Pressable>

      {isExpanded && (
        <View style={{ gap: 16 }}>
          {/* Product Code Filter */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Mã sản phẩm
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {productCodes.map((code) => (
                <Pressable
                  key={code}
                  onPress={() => toggleProductCode(code)}
                  style={{
                    backgroundColor: selectedProductCodes.includes(code)
                      ? colors.accent
                      : isDark
                        ? colors.surfaceVariant
                        : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedProductCodes.includes(code)
                      ? colors.accent
                      : isDark
                        ? colors.borderVariant
                        : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: selectedProductCodes.includes(code) ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedProductCodes.includes(code) ? "700" : "500",
                    }}
                  >
                    {code}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Status Filter */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Trạng thái
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {statusOptions.map((status) => (
                <Pressable
                  key={status.value}
                  onPress={() => toggleStatus(status.value)}
                  style={{
                    backgroundColor: selectedStatuses.includes(status.value)
                      ? status.color
                      : isDark
                        ? colors.surfaceVariant
                        : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedStatuses.includes(status.value)
                      ? status.color
                      : isDark
                        ? colors.borderVariant
                        : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: selectedStatuses.includes(status.value) ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedStatuses.includes(status.value) ? "700" : "500",
                    }}
                  >
                    {status.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Factory Filter */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Xưởng sản xuất
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {factories.slice(0, 8).map((factory) => (
                <Pressable
                  key={factory}
                  onPress={() => toggleFactory(factory)}
                  style={{
                    backgroundColor: selectedFactories.includes(factory)
                      ? colors.accent
                      : isDark
                        ? colors.surfaceVariant
                        : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedFactories.includes(factory)
                      ? colors.accent
                      : isDark
                        ? colors.borderVariant
                        : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: selectedFactories.includes(factory) ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedFactories.includes(factory) ? "700" : "500",
                    }}
                    numberOfLines={1}
                  >
                    {factory.replace("Xưởng ", "").replace("Kho ", "")}
                  </Text>
                </Pressable>
              ))}
              {factories.length > 8 && (
                <View
                  style={{
                    backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: colors.textMedium,
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    +{factories.length - 8} khác
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Sort Options */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Sắp xếp theo
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {sortOptions.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => onSortChange(option.value)}
                  style={{
                    backgroundColor:
                      selectedSort === option.value
                        ? colors.accent
                        : isDark
                          ? colors.surfaceVariant
                          : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor:
                      selectedSort === option.value ? colors.accent : isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: selectedSort === option.value ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedSort === option.value ? "700" : "500",
                    }}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

export default HistoryFilterSort;


