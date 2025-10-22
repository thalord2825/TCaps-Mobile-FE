import { FontAwesome } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, TextInput, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import { sampleHistoryBatches, type HistoryBatchItem } from "../../data/sample-history-batches";
import { HistoryBatchCard } from "./HistoryBatchCard";
import { HistoryDateRangePicker, type DateRange } from "./HistoryDateRangePicker";
import { HistoryFilterSort } from "./HistoryFilterSort";
import { HistoryPerformanceChart } from "./HistoryPerformanceChart";
import { HistoryStatsCard } from "./HistoryStatsCard";

interface HistoryDashboardProps {
  onViewDetails?: (batchId: string) => void;
}

export function HistoryDashboard({ onViewDetails }: HistoryDashboardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // State management
  const [batches] = useState<HistoryBatchItem[]>(sampleHistoryBatches);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    label: "Dữ liệu mẫu",
  });
  const [selectedProductCodes, setSelectedProductCodes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedFactories, setSelectedFactories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("date-desc");
  const [refreshing, setRefreshing] = useState(false);

  // Filter and sort batches
  const filteredBatches = batches
    .filter((batch) => {
      const batchDate = new Date(batch.completionDate);
      const startDate = new Date(selectedRange.startDate);
      const endDate = new Date(selectedRange.endDate);
      const inDateRange = batchDate >= startDate && batchDate <= endDate;

      const matchesSearch =
        searchQuery === "" ||
        batch.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.stages.some((stage) => stage.factory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesProductCode = selectedProductCodes.length === 0 || selectedProductCodes.includes(batch.productCode);
      const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(batch.status);
      const matchesFactory =
        selectedFactories.length === 0 || batch.stages.some((stage) => selectedFactories.includes(stage.factory));

      return inDateRange && matchesSearch && matchesProductCode && matchesStatus && matchesFactory;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case "date-desc":
          return new Date(b.completionDate).getTime() - new Date(a.completionDate).getTime();
        case "date-asc":
          return new Date(a.completionDate).getTime() - new Date(b.completionDate).getTime();
        case "quantity-desc":
          return b.totalQty - a.totalQty;
        case "quantity-asc":
          return a.totalQty - b.totalQty;
        case "duration-asc":
          return (
            new Date(a.completionDate).getTime() -
            new Date(a.startDate).getTime() -
            (new Date(b.completionDate).getTime() - new Date(b.startDate).getTime())
          );
        case "duration-desc":
          return (
            new Date(b.completionDate).getTime() -
            new Date(b.startDate).getTime() -
            (new Date(a.completionDate).getTime() - new Date(a.startDate).getTime())
          );
        case "cost-desc":
          return b.totalCost - a.totalCost;
        case "cost-asc":
          return a.totalCost - b.totalCost;
        default:
          return 0;
      }
    });

  const handleViewDetails = useCallback(
    (batchId: string) => {
      onViewDetails?.(batchId);
    },
    [onViewDetails]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.surface,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: isDark ? colors.border : colors.borderVariant,
          }}
        >
          <FontAwesome name="search" size={16} color={colors.textMedium} style={{ marginRight: 12 }} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Tìm kiếm theo mã lô, sản phẩm, xưởng..."
            placeholderTextColor={colors.textMedium}
            style={{
              flex: 1,
              color: colors.textHigh,
              fontSize: 16,
            }}
          />
        </View>
      </View>

      <FlatList
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 100,
        }}
        data={[{ key: "content" }]}
        renderItem={() => null}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={
          <View style={{ gap: isDark ? 12 : 16 }}>
            {/* Date Range Picker */}
            <HistoryDateRangePicker selectedRange={selectedRange} onRangeChange={setSelectedRange} />

            {/* Stats Card */}
            <HistoryStatsCard batches={filteredBatches} />

            {/* Performance Chart */}
            <HistoryPerformanceChart batches={filteredBatches} />

            {/* Filter & Sort */}
            <HistoryFilterSort
              selectedProductCodes={selectedProductCodes}
              selectedStatuses={selectedStatuses}
              selectedFactories={selectedFactories}
              selectedSort={selectedSort}
              onProductCodeChange={setSelectedProductCodes}
              onStatusChange={setSelectedStatuses}
              onFactoryChange={setSelectedFactories}
              onSortChange={setSelectedSort}
            />

            {/* Results Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Kết quả ({filteredBatches.length})
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                }}
              >
                {selectedRange.label}
              </Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ gap: isDark ? 12 : 16, marginTop: 16 }}>
            {filteredBatches.map((batch) => (
              <HistoryBatchCard key={batch.id} item={batch} onViewDetails={handleViewDetails} />
            ))}

            {filteredBatches.length === 0 && (
              <View
                style={{
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  padding: 32,
                  alignItems: "center",
                  gap: 12,
                  marginTop: 40,
                }}
              >
                <FontAwesome name="clipboard" size={48} color={colors.textMedium} />
                <Text
                  style={{
                    color: isDark ? "#fff" : colors.textHigh,
                    fontSize: 18,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Không tìm thấy lô hàng
                </Text>
                <Text
                  style={{
                    color: colors.textMedium,
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Thử điều chỉnh bộ lọc hoặc khoảng thời gian
                </Text>
              </View>
            )}
          </View>
        }
      />
    </View>
  );
}
