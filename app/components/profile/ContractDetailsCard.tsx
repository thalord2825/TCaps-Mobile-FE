import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface ContractDetailsCardProps {
  profile: ProfileData;
  onViewContract: () => void;
}

export function ContractDetailsCard({ profile, onViewContract }: ContractDetailsCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const getContractDuration = () => {
    const startDate = new Date(profile.joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} năm ${diffMonths % 12} tháng`;
    } else if (diffMonths > 0) {
      return `${diffMonths} tháng`;
    } else {
      return `${diffDays} ngày`;
    }
  };

  const getContractStatus = () => {
    // This would be calculated based on contract end date
    // For now, we'll assume all contracts are active
    return {
      status: "active",
      color: isDark ? "#4ade80" : "#16a34a",
      text: "Đang hoạt động",
      icon: "check-circle",
    };
  };

  const getRateDisplay = () => {
    if (profile.hourlyRate) {
      return `${formatCurrency(profile.hourlyRate)}/giờ`;
    } else if (profile.pieceRate) {
      return `${formatCurrency(profile.pieceRate)}/sản phẩm`;
    }
    return "Theo thỏa thuận";
  };

  const getBenefits = () => {
    const baseBenefits = ["Bảo hiểm xã hội", "Bảo hiểm y tế", "Bảo hiểm thất nghiệp"];

    if (profile.role === "Lead" || profile.role === "Admin") {
      baseBenefits.push("Phụ cấp quản lý", "Thưởng hiệu suất");
    }

    if (profile.role === "QC") {
      baseBenefits.push("Phụ cấp chất lượng", "Thưởng QC");
    }

    return baseBenefits;
  };

  const contractStatus = getContractStatus();
  const benefits = getBenefits();

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome name="file-text" size={16} color={isDark ? colors.textHigh : colors.accent} />
            </View>
            <View>
              <Text style={{ color: isDark ? "#fff" : colors.textHigh, fontSize: 18, fontWeight: "800" }}>
                Thông tin hợp đồng
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                }}
              >
                Chi tiết hợp đồng lao động
              </Text>
            </View>
          </View>

          <Pressable
            onPress={onViewContract}
            style={{
              backgroundColor: colors.accent,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 16,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              Xem chi tiết
            </Text>
          </Pressable>
        </View>

        {/* Contract Status */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.accent + "10",
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: contractStatus.color,
            alignItems: "center",
            gap: 8,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <FontAwesome name={contractStatus.icon as any} size={16} color={contractStatus.color} />
            <Text style={{ color: contractStatus.color, fontSize: 16, fontWeight: "700" }}>{contractStatus.text}</Text>
          </View>
          <Text
            style={{
              color: colors.textMedium,
              fontSize: 12,
              textAlign: "center",
              fontWeight: "400",
            }}
          >
            Thời gian làm việc: {getContractDuration()}
          </Text>
        </View>

        {/* Contract Details */}
        <View style={{ gap: 12 }}>
          <View
            style={{
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e2e8f0",
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Loại hợp đồng
            </Text>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 4,
              }}
            >
              {profile.contractType}
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              Bắt đầu: {formatDate(profile.joinDate)}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e2e8f0",
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Mức lương
            </Text>
            <Text
              style={{
                color: colors.textHigh,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 4,
              }}
            >
              {getRateDisplay()}
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
              }}
            >
              {profile.role === "Staff"
                ? "Theo sản phẩm hoàn thành"
                : profile.role === "QC"
                  ? "Theo giờ làm việc"
                  : "Theo giờ quản lý"}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: isDark ? "#1f2937" : "#f8fafc",
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e2e8f0",
            }}
          >
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                marginBottom: 8,
              }}
            >
              Phúc lợi
            </Text>
            <View style={{ gap: 6 }}>
              {benefits.map((benefit, index) => (
                <View key={index} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <FontAwesome name="check" size={12} color={isDark ? "#4ade80" : "#16a34a"} />
                  <Text
                    style={{
                      color: colors.textHigh,
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                  >
                    {benefit}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Additional Info */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="info-circle" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Hợp đồng được gia hạn tự động hàng năm
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="calendar" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Lương được thanh toán vào ngày 15 hàng tháng
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="shield" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 12,
                fontWeight: "500",
                flex: 1,
              }}
            >
              Tuân thủ Luật Lao động Việt Nam
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
              alignItems: "center",
              gap: 8,
            }}
          >
            <FontAwesome name="download" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "600",
              }}
            >
              Tải hợp đồng
            </Text>
          </Pressable>

          <Pressable
            onPress={onViewContract}
            style={{
              flex: 1,
              backgroundColor: colors.accent,
              paddingVertical: 12,
              paddingHorizontal: 16,
              borderRadius: 12,
              alignItems: "center",
              gap: 8,
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <FontAwesome name="eye" size={14} color="#FFFFFF" />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Xem chi tiết
            </Text>
          </Pressable>
        </View>
      </View>
    </SectionCard>
  );
}

export default ContractDetailsCard;
