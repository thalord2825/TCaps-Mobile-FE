import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { Alert, FlatList, Pressable, RefreshControl, Text, TextInput, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "../components/common/Toast";
import { BatchActionBar } from "../components/request/BatchActionBar";
import { MaterialDistributionModal } from "../components/request/MaterialDistributionModal";
import { RequestCard } from "../components/request/RequestCard";
import { RequestFilterSort } from "../components/request/RequestFilterSort";
import { RequestQuickActions } from "../components/request/RequestQuickActions";
import { useTheme } from "../context/theme-context";
import { sampleRequests, type MaterialItem, type RequestItem } from "../data/sample-requests";

export default function Request() {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  // State management
  const [requests] = useState<RequestItem[]>(sampleRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedFactories, setSelectedFactories] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState("date-desc");
  const [selectedQuickAction, setSelectedQuickAction] = useState("all");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [distributionModalVisible, setDistributionModalVisible] = useState(false);
  const [selectedRequestForDistribution, setSelectedRequestForDistribution] = useState<RequestItem | null>(null);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

  // Filter and sort requests
  const filteredRequests = useMemo(() => {
    return requests
      .filter((request) => {
        // Search filter
        const matchesSearch =
          searchQuery === "" ||
          request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.factory.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.requestedBy.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Type filter
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(request.type);

        // Status filter
        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(request.status);

        // Priority filter
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(request.priority);

        // Factory filter
        const matchesFactory = selectedFactories.length === 0 || selectedFactories.includes(request.factory);

        // Quick action filter
        let matchesQuickAction = true;
        if (selectedQuickAction !== "all") {
          switch (selectedQuickAction) {
            case "urgent":
              matchesQuickAction = request.priority === "urgent" && request.status === "pending";
              break;
            case "today":
              const today = new Date().toISOString().split("T")[0];
              matchesQuickAction = request.createdDate.split("T")[0] === today;
              break;
            case "pending":
              matchesQuickAction = request.status === "pending";
              break;
            case "material":
              matchesQuickAction = request.type === "material";
              break;
            case "correction":
              matchesQuickAction = request.type === "correction";
              break;
            default:
              matchesQuickAction = true;
          }
        }

        return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesFactory && matchesQuickAction;
      })
      .sort((a, b) => {
        switch (selectedSort) {
          case "date-desc":
            return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          case "date-asc":
            return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
          case "priority-desc":
            const priorityOrderDesc = { urgent: 4, high: 3, medium: 2, low: 1 };
            return (
              priorityOrderDesc[b.priority as keyof typeof priorityOrderDesc] -
              priorityOrderDesc[a.priority as keyof typeof priorityOrderDesc]
            );
          case "priority-asc":
            const priorityOrderAsc = { urgent: 4, high: 3, medium: 2, low: 1 };
            return (
              priorityOrderAsc[a.priority as keyof typeof priorityOrderAsc] -
              priorityOrderAsc[b.priority as keyof typeof priorityOrderAsc]
            );
          case "due-desc":
            return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          case "due-asc":
            return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
          case "factory-asc":
            return a.factory.localeCompare(b.factory);
          case "factory-desc":
            return b.factory.localeCompare(a.factory);
          default:
            return 0;
        }
      });
  }, [
    requests,
    searchQuery,
    selectedTypes,
    selectedStatuses,
    selectedPriorities,
    selectedFactories,
    selectedSort,
    selectedQuickAction,
  ]);

  // Calculate stats for quick actions
  const urgentCount = requests.filter((r) => r.priority === "urgent" && r.status === "pending").length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const todayCount = requests.filter((r) => {
    const today = new Date().toISOString().split("T")[0];
    return r.createdDate.split("T")[0] === today;
  }).length;

  const handleViewDetails = useCallback((requestId: string) => {
    // TODO: Navigate to request detail screen
    console.log("View details for request:", requestId);
  }, []);

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  const handleApprove = useCallback((requestId: string) => {
    Alert.alert("Phê duyệt yêu cầu", "Bạn có chắc chắn muốn phê duyệt yêu cầu này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Phê duyệt",
        style: "default",
        onPress: () => {
          // TODO: Implement approve logic
          console.log("Approved request:", requestId);
          showToast(`✓ Đã phê duyệt yêu cầu ${requestId}`, "success");
        },
      },
    ]);
  }, []);

  const handleDeny = useCallback((requestId: string) => {
    Alert.alert("Từ chối yêu cầu", "Bạn có chắc chắn muốn từ chối yêu cầu này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Từ chối",
        style: "destructive",
        onPress: () => {
          // TODO: Implement deny logic
          console.log("Denied request:", requestId);
          showToast(`✗ Đã từ chối yêu cầu ${requestId}`, "error");
        },
      },
    ]);
  }, []);

  const handleDistribute = useCallback(
    (requestId: string) => {
      const request = requests.find((r) => r.id === requestId);
      if (request) {
        setSelectedRequestForDistribution(request);
        setDistributionModalVisible(true);
      }
    },
    [requests]
  );

  const handleConfirmDistribution = useCallback((requestId: string, distributedMaterials: MaterialItem[]) => {
    // TODO: Implement distribution logic
    console.log("Distributed materials for request:", requestId, distributedMaterials);
    showToast(`✓ Đã phân phối vật liệu cho ${requestId}`, "success");
    setDistributionModalVisible(false);
    setSelectedRequestForDistribution(null);
  }, []);

  const handleBatchApprove = useCallback(() => {
    Alert.alert("Phê duyệt hàng loạt", `Bạn có chắc chắn muốn phê duyệt ${selectedRequests.length} yêu cầu?`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Phê duyệt",
        style: "default",
        onPress: () => {
          // TODO: Implement batch approve logic
          console.log("Batch approved requests:", selectedRequests);
          showToast(`✓ Đã phê duyệt ${selectedRequests.length} yêu cầu`, "success");
          setSelectedRequests([]);
          setIsMultiSelectMode(false);
        },
      },
    ]);
  }, [selectedRequests]);

  const handleMarkViewed = useCallback(() => {
    // TODO: Implement mark as viewed logic
    console.log("Marked as viewed:", selectedRequests);
    setSelectedRequests([]);
    setIsMultiSelectMode(false);
  }, [selectedRequests]);

  const handleExport = useCallback(() => {
    // TODO: Implement export logic
    console.log("Exporting requests:", selectedRequests);
  }, [selectedRequests]);

  const handleClearSelection = useCallback(() => {
    setSelectedRequests([]);
    setIsMultiSelectMode(false);
  }, []);

  const toggleRequestSelection = useCallback((requestId: string) => {
    setSelectedRequests((prev) => {
      if (prev.includes(requestId)) {
        const newSelection = prev.filter((id) => id !== requestId);
        if (newSelection.length === 0) {
          setIsMultiSelectMode(false);
        }
        return newSelection;
      } else {
        setIsMultiSelectMode(true);
        return [...prev, requestId];
      }
    });
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const canApproveAll = useMemo(() => {
    return selectedRequests.every((id) => {
      const request = requests.find((r) => r.id === id);
      return request?.status === "pending";
    });
  }, [selectedRequests, requests]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style={isDark ? "light" : "dark"} />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? colors.border : colors.borderVariant,
        }}
      >
        <Pressable>
          <FontAwesome name="bars" size={20} color={isDark ? "#fff" : colors.textHigh} />
        </Pressable>
        <Text
          style={{
            color: isDark ? "#fff" : colors.textHigh,
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Quản lý yêu cầu
        </Text>
        <View style={{ position: "relative" }}>
          <FontAwesome name="bell" size={20} color={isDark ? "#fff" : colors.textHigh} />
          {pendingCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                backgroundColor: "#ef4444",
                borderRadius: 8,
                paddingHorizontal: 4,
                paddingVertical: 2,
                minWidth: 16,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 10,
                  fontWeight: "700",
                }}
              >
                {pendingCount > 99 ? "99+" : pendingCount}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Search Bar */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 16,
        }}
      >
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
            placeholder="Tìm kiếm theo mã, xưởng, nhân viên..."
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
          paddingBottom: isMultiSelectMode ? 100 : 100,
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
            {/* Quick Actions */}
            <RequestQuickActions
              selectedAction={selectedQuickAction}
              onActionChange={setSelectedQuickAction}
              urgentCount={urgentCount}
              pendingCount={pendingCount}
              todayCount={todayCount}
            />

            {/* Filter & Sort */}
            <RequestFilterSort
              selectedTypes={selectedTypes}
              selectedStatuses={selectedStatuses}
              selectedPriorities={selectedPriorities}
              selectedFactories={selectedFactories}
              selectedSort={selectedSort}
              onTypeChange={setSelectedTypes}
              onStatusChange={setSelectedStatuses}
              onPriorityChange={setSelectedPriorities}
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
                Kết quả ({filteredRequests.length})
              </Text>
              {(selectedTypes.length > 0 ||
                selectedStatuses.length > 0 ||
                selectedPriorities.length > 0 ||
                selectedFactories.length > 0) && (
                <View
                  style={{
                    backgroundColor: colors.accent,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: "700",
                    }}
                  >
                    Đã lọc
                  </Text>
                </View>
              )}
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={{ marginTop: 16 }}>
            {/* Request Cards Container */}
            <View
              style={{
                backgroundColor: colors.surface,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: isDark ? colors.border : colors.borderVariant,
              }}
            >
              {filteredRequests.map((request, index) => (
                <View key={request.id}>
                  <RequestCard
                    item={request}
                    onApprove={handleApprove}
                    onDeny={handleDeny}
                    onDistribute={handleDistribute}
                    onViewDetails={handleViewDetails}
                    onLongPress={toggleRequestSelection}
                    isSelected={selectedRequests.includes(request.id)}
                  />
                  {index < filteredRequests.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: isDark ? colors.border : colors.borderVariant,
                        marginVertical: 12,
                      }}
                    />
                  )}
                </View>
              ))}

              {filteredRequests.length === 0 && (
                <View
                  style={{
                    backgroundColor: colors.surfaceVariant,
                    borderRadius: 12,
                    padding: 32,
                    alignItems: "center",
                    gap: 12,
                    marginTop: 20,
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
                    Không có yêu cầu nào
                  </Text>
                  <Text
                    style={{
                      color: colors.textMedium,
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    Thử điều chỉnh bộ lọc hoặc tìm kiếm
                  </Text>
                </View>
              )}
            </View>
          </View>
        }
      />

      {/* Batch Action Bar */}
      <BatchActionBar
        visible={isMultiSelectMode}
        selectedCount={selectedRequests.length}
        onApproveAll={handleBatchApprove}
        onMarkViewed={handleMarkViewed}
        onExport={handleExport}
        onClearSelection={handleClearSelection}
        canApproveAll={canApproveAll}
      />

      {/* Material Distribution Modal */}
      <MaterialDistributionModal
        visible={distributionModalVisible}
        request={selectedRequestForDistribution}
        onClose={() => {
          setDistributionModalVisible(false);
          setSelectedRequestForDistribution(null);
        }}
        onConfirm={handleConfirmDistribution}
      />

      {/* Toast Notification */}
      <Toast visible={toastVisible} message={toastMessage} type={toastType} onHide={() => setToastVisible(false)} />
    </SafeAreaView>
  );
}
