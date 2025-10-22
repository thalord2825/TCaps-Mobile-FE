import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import { factories, priorityOptions, requestTypes, sortOptions, statusOptions } from "../../data/sample-requests";

export interface RequestFilterSortProps {
  selectedTypes: string[];
  selectedStatuses: string[];
  selectedPriorities: string[];
  selectedFactories: string[];
  selectedSort: string;
  onTypeChange: (types: string[]) => void;
  onStatusChange: (statuses: string[]) => void;
  onPriorityChange: (priorities: string[]) => void;
  onFactoryChange: (factories: string[]) => void;
  onSortChange: (sort: string) => void;
}

export function RequestFilterSort({
  selectedTypes,
  selectedStatuses,
  selectedPriorities,
  selectedFactories,
  selectedSort,
  onTypeChange,
  onStatusChange,
  onPriorityChange,
  onFactoryChange,
  onSortChange,
}: RequestFilterSortProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleType = (type: string) => {
    const newTypes = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type];
    onTypeChange(newTypes);
  };

  const toggleStatus = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    onStatusChange(newStatuses);
  };

  const togglePriority = (priority: string) => {
    const newPriorities = selectedPriorities.includes(priority)
      ? selectedPriorities.filter((p) => p !== priority)
      : [...selectedPriorities, priority];
    onPriorityChange(newPriorities);
  };

  const toggleFactory = (factory: string) => {
    const newFactories = selectedFactories.includes(factory)
      ? selectedFactories.filter((f) => f !== factory)
      : [...selectedFactories, factory];
    onFactoryChange(newFactories);
  };

  const getActiveFilterCount = () => {
    return selectedTypes.length + selectedStatuses.length + selectedPriorities.length + selectedFactories.length;
  };

  const clearAllFilters = () => {
    onTypeChange([]);
    onStatusChange([]);
    onPriorityChange([]);
    onFactoryChange([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "material":
        return "cube";
      case "correction":
        return "wrench";
      case "quality":
        return "shield";
      case "urgent":
        return "bell";
      default:
        return "list";
    }
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
          {/* Request Type Filter */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Loại yêu cầu
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {requestTypes.map((type) => (
                <Pressable
                  key={type.value}
                  onPress={() => toggleType(type.value)}
                  style={{
                    backgroundColor: selectedTypes.includes(type.value)
                      ? colors.accent
                      : isDark
                        ? colors.surfaceVariant
                        : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedTypes.includes(type.value)
                      ? colors.accent
                      : isDark
                        ? colors.borderVariant
                        : colors.border,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <FontAwesome
                    name={getTypeIcon(type.value) as any}
                    size={12}
                    color={selectedTypes.includes(type.value) ? "#FFFFFF" : colors.textMedium}
                  />
                  <Text
                    style={{
                      color: selectedTypes.includes(type.value) ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedTypes.includes(type.value) ? "700" : "500",
                    }}
                  >
                    {type.label}
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

          {/* Priority Filter */}
          <View>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
                marginBottom: 8,
              }}
            >
              Mức độ ưu tiên
            </Text>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {priorityOptions.map((priority) => (
                <Pressable
                  key={priority.value}
                  onPress={() => togglePriority(priority.value)}
                  style={{
                    backgroundColor: selectedPriorities.includes(priority.value)
                      ? priority.color
                      : isDark
                        ? colors.surfaceVariant
                        : colors.surfaceVariant,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: selectedPriorities.includes(priority.value)
                      ? priority.color
                      : isDark
                        ? colors.borderVariant
                        : colors.border,
                  }}
                >
                  <Text
                    style={{
                      color: selectedPriorities.includes(priority.value) ? "#FFFFFF" : colors.textMedium,
                      fontSize: 12,
                      fontWeight: selectedPriorities.includes(priority.value) ? "700" : "500",
                    }}
                  >
                    {priority.label}
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

          {/* Clear All Button */}
          {getActiveFilterCount() > 0 && (
            <Pressable
              onPress={clearAllFilters}
              style={{
                backgroundColor: "transparent",
                paddingVertical: 12,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  fontWeight: "600",
                }}
              >
                Xóa tất cả bộ lọc
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

export default RequestFilterSort;




