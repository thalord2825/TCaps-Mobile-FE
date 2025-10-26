import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

export interface FilterOption {
  id: string;
  label: string;
  value: string;
  color?: string;
}

export interface FilterCategory {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
}

interface FilterBarProps {
  categories: FilterCategory[];
  selectedFilters: Record<string, string[]>;
  onFiltersChange: (filters: Record<string, string[]>) => void;
  compact?: boolean;
}

export function FilterBar({ categories, selectedFilters, onFiltersChange, compact = false }: FilterBarProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterToggle = (categoryId: string, optionValue: string) => {
    const currentSelection = selectedFilters[categoryId] || [];
    const category = categories.find((cat) => cat.id === categoryId);

    if (!category) return;

    let newSelection: string[];

    if (category.multiSelect) {
      // Multi-select: toggle option
      if (currentSelection.includes(optionValue)) {
        newSelection = currentSelection.filter((val) => val !== optionValue);
      } else {
        newSelection = [...currentSelection, optionValue];
      }
    } else {
      // Single-select: replace selection
      newSelection = currentSelection.includes(optionValue) ? [] : [optionValue];
    }

    onFiltersChange({
      ...selectedFilters,
      [categoryId]: newSelection,
    });
  };

  const isOptionSelected = (categoryId: string, optionValue: string) => {
    return selectedFilters[categoryId]?.includes(optionValue) || false;
  };

  const getActiveFiltersCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  if (compact) {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 6,
          borderWidth: 1,
          borderColor: isDark ? colors.borderVariant : colors.border,
        }}
      >
        <FontAwesome name="filter" size={12} color={colors.textLow} />
        <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>
          {getActiveFiltersCount() > 0 ? `${getActiveFiltersCount()} bộ lọc` : "Bộ lọc"}
        </Text>
        <FontAwesome name="chevron-down" size={10} color={colors.textLow} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: isDark ? colors.borderVariant : colors.border,
        overflow: "hidden",
      }}
    >
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <FontAwesome name="filter" size={14} color={colors.accent} />
          <Text style={{ color: colors.textHigh, fontSize: 14, fontWeight: "600" }}>Bộ lọc</Text>
          {getActiveFiltersCount() > 0 && (
            <View
              style={{
                backgroundColor: colors.accent,
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#FFFFFF", fontSize: 10, fontWeight: "600" }}>{getActiveFiltersCount()}</Text>
            </View>
          )}
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {getActiveFiltersCount() > 0 && (
            <Pressable
              onPress={clearAllFilters}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: isDark ? colors.background : "#FFFFFF",
                borderRadius: 4,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.textLow, fontSize: 12, fontWeight: "600" }}>Xóa tất cả</Text>
            </Pressable>
          )}
          <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={12} color={colors.textLow} />
        </View>
      </Pressable>

      {isExpanded && (
        <View style={{ paddingHorizontal: 12, paddingBottom: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              {categories.map((category) => (
                <View key={category.id} style={{ gap: 6 }}>
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 12,
                      fontWeight: "600",
                      marginBottom: 4,
                    }}
                  >
                    {category.label}
                  </Text>
                  <View style={{ flexDirection: "row", gap: 6, flexWrap: "wrap" }}>
                    {category.options.map((option) => {
                      const isSelected = isOptionSelected(category.id, option.value);
                      return (
                        <Pressable
                          key={option.id}
                          onPress={() => handleFilterToggle(category.id, option.value)}
                          style={{
                            backgroundColor: isSelected
                              ? option.color || colors.accent
                              : isDark
                              ? colors.background
                              : "#FFFFFF",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 6,
                            borderWidth: 1,
                            borderColor: isSelected
                              ? option.color || colors.accent
                              : isDark
                              ? colors.borderVariant
                              : colors.border,
                          }}
                        >
                          <Text
                            style={{
                              color: isSelected ? "#FFFFFF" : colors.textHigh,
                              fontSize: 12,
                              fontWeight: "600",
                            }}
                          >
                            {option.label}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}



