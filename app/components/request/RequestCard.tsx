import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import type { RequestItem } from "../../data/sample-requests";

export interface RequestCardProps {
  item: RequestItem;
  onApprove?: (requestId: string) => void;
  onDeny?: (requestId: string) => void;
  onDistribute?: (requestId: string) => void;
  onViewDetails?: (requestId: string) => void;
  onLongPress?: (requestId: string) => void;
  isSelected?: boolean;
}

export function RequestCard({
  item,
  onApprove,
  onDeny,
  onDistribute,
  onViewDetails,
  onLongPress,
  isSelected,
}: RequestCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const [isExpanded, setIsExpanded] = useState(false);

  const handleLongPress = () => {
    onLongPress?.(item.id);
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case "material":
        return "Vật liệu";
      case "correction":
        return "Sửa chữa";
      case "quality":
        return "Chất lượng";
      case "urgent":
        return "Khẩn cấp";
      default:
        return "Khác";
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case "pending":
        return "#f59e0b";
      case "approved":
        return "#10b981";
      case "denied":
        return "#ef4444";
      default:
        return colors.textMedium;
    }
  };

  const getStatusLabel = () => {
    switch (item.status) {
      case "pending":
        return "Chờ duyệt";
      case "approved":
        return "Đã duyệt";
      case "denied":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Vừa xong";
    if (diffInHours < 24) return `${diffInHours} giờ trước`;
    return date.toLocaleDateString("vi-VN");
  };

  const isNew = () => {
    const createdDate = new Date(item.createdDate);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return createdDate > oneHourAgo;
  };

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPress={() => setIsExpanded(!isExpanded)}
      style={({ pressed }) => [
        {
          backgroundColor: isSelected ? colors.accent + "20" : colors.surface,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: isSelected ? colors.accent : isDark ? colors.border : colors.borderVariant,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 2,
        },
        pressed && {
          opacity: 0.8,
          transform: [{ scale: 0.98 }],
        },
      ]}
    >
      {/* Title */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <Text
          style={{
            color: colors.textHigh,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {item.id} - {getTypeLabel()}
        </Text>
        {isNew() && (
          <View
            style={{
              backgroundColor: "#ef4444",
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: "700",
              }}
            >
              MỚI
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <Text
        style={{
          color: colors.textMedium,
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        {item.factory} • {item.requestedBy.name} • {formatDate(item.createdDate)}
      </Text>

      {/* Optional Description */}
      {item.notes && (
        <Text
          style={{
            color: colors.textMedium,
            fontSize: 12,
            marginBottom: 12,
            fontStyle: "italic",
          }}
        >
          {item.notes}
        </Text>
      )}

      {/* Status and Actions Row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: getStatusColor() + "20",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: getStatusColor(),
          }}
        >
          <Text
            style={{
              color: getStatusColor(),
              fontSize: 10,
              fontWeight: "700",
            }}
          >
            {getStatusLabel()}
          </Text>
        </View>

        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Text
            style={{
              color: colors.accent,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            {isExpanded ? "Ẩn chi tiết" : "Xem chi tiết"}
          </Text>
          <FontAwesome name={isExpanded ? "chevron-up" : "chevron-down"} size={12} color={colors.accent} />
        </Pressable>
      </View>

      {/* Expandable Content - Hidden Actions */}
      {isExpanded && (
        <View
          style={{
            marginTop: 16,
            paddingTop: 16,
            borderTopWidth: 1,
            borderTopColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          {/* Material Request Details */}
          {item.type === "material" && item.materials && (
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 8,
                }}
              >
                Vật liệu yêu cầu ({item.materials.length} loại)
              </Text>
              {item.materials.map((material, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: 6,
                    borderBottomWidth: index < item.materials!.length - 1 ? 1 : 0,
                    borderBottomColor: isDark ? colors.borderVariant : colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {material.materialName}
                    </Text>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                      }}
                    >
                      {material.materialId}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        color: colors.textHigh,
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {material.requestedQty} {material.unit}
                    </Text>
                    <Text
                      style={{
                        color: colors.textMedium,
                        fontSize: 10,
                      }}
                    >
                      Tồn: {material.currentStock}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Action Buttons - Only shown in details */}
          {item.status === "pending" && (
            <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
              {item.type === "material" && (
                <Pressable
                  onPress={() => onDistribute?.(item.id)}
                  style={{
                    flex: 1,
                    backgroundColor: colors.accent,
                    paddingVertical: 10,
                    borderRadius: 8,
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
                    Phân phối
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={() => onApprove?.(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "#10b981",
                  paddingVertical: 10,
                  borderRadius: 8,
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
                  Duyệt
                </Text>
              </Pressable>
              <Pressable
                onPress={() => onDeny?.(item.id)}
                style={{
                  flex: 1,
                  backgroundColor: "transparent",
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#ef4444",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#ef4444",
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  Từ chối
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
}

export default RequestCard;
