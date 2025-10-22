import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { materialCategories, sortOptions } from "../../data/sample-materials";

export interface InventoryFilterSortProps {
  selectedCategory: string;
  selectedSort: string;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
}

export function InventoryFilterSort({
  selectedCategory,
  selectedSort,
  onCategoryChange,
  onSortChange,
}: InventoryFilterSortProps) {
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  return (
    <View
      style={{
        backgroundColor: C.card,
        borderRadius: 18,
        padding: 16,
        gap: 16,
      }}
    >
      <Text
        style={{
          color: isDark ? "#fff" : C.dark,
          fontSize: 16,
          fontWeight: "700",
        }}
      >
        Bộ lọc & Sắp xếp
      </Text>

      <View style={{ gap: 12 }}>
        {/* Category Filter */}
        <View>
          <Text
            style={{
              color: C.darkGrey,
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 8,
            }}
          >
            Danh mục
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {materialCategories.map((category) => (
              <Pressable
                key={category}
                onPress={() => onCategoryChange(category)}
                style={{
                  backgroundColor: selectedCategory === category ? C.primary : isDark ? "#2A2D35" : "#F3F4F6",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedCategory === category ? C.primary : isDark ? "#3A3D44" : "#E5E7EB",
                }}
              >
                <Text
                  style={{
                    color: selectedCategory === category ? "#FFFFFF" : isDark ? C.dark : C.darkGrey,
                    fontSize: 12,
                    fontWeight: selectedCategory === category ? "700" : "500",
                  }}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Sort Options */}
        <View>
          <Text
            style={{
              color: C.darkGrey,
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
                  backgroundColor: selectedSort === option.value ? C.primary : isDark ? "#2A2D35" : "#F3F4F6",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: selectedSort === option.value ? C.primary : isDark ? "#3A3D44" : "#E5E7EB",
                }}
              >
                <Text
                  style={{
                    color: selectedSort === option.value ? "#FFFFFF" : isDark ? C.dark : C.darkGrey,
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
    </View>
  );
}

export default InventoryFilterSort;

