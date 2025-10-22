import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";
import type { ProfileData } from "../../data/sample-profile";
import { SectionCard } from "../common/section-card";

export interface ProfileHeaderCardProps {
  profile: ProfileData;
  onEditProfile: () => void;
}

export function ProfileHeaderCard({ profile, onEditProfile }: ProfileHeaderCardProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Staff":
        return isDark ? "#3b82f6" : "#2563eb";
      case "QC":
        return isDark ? "#10b981" : "#059669";
      case "Lead":
        return isDark ? "#f59e0b" : "#d97706";
      case "Admin":
        return isDark ? "#8b5cf6" : "#7c3aed";
      default:
        return colors.accent;
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Staff":
        return "user";
      case "QC":
        return "check-circle";
      case "Lead":
        return "users";
      case "Admin":
        return "cog";
      default:
        return "user";
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) {
      return `${diffYears} năm`;
    } else if (diffMonths > 0) {
      return `${diffMonths} tháng`;
    } else {
      return `${diffDays} ngày`;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <SectionCard>
      <View style={{ gap: 20 }}>
        {/* Header with Avatar and Edit Button */}
        <View style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 16, flex: 1 }}>
            {/* Avatar */}
            <View style={{ position: "relative" }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 3,
                  borderColor: getRoleColor(profile.role),
                  shadowColor: getRoleColor(profile.role),
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                {profile.avatarUri ? (
                  <Text style={{ color: colors.textHigh, fontSize: 32, fontWeight: "700" }}>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Text>
                ) : (
                  <FontAwesome name="user" size={32} color={colors.textMedium} />
                )}
              </View>

              {/* Role Badge */}
              <View
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -2,
                  backgroundColor: getRoleColor(profile.role),
                  borderRadius: 12,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderWidth: 2,
                  borderColor: isDark ? C.background : "#FFFFFF",
                }}
              >
                <FontAwesome name={getRoleIcon(profile.role) as any} size={12} color="#FFFFFF" />
              </View>
            </View>

            {/* Name and Role */}
            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text
                style={{
                  color: isDark ? "#fff" : colors.textHigh,
                  fontSize: 20,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {profile.name}
              </Text>
              <View
                style={{
                  backgroundColor: getRoleColor(profile.role),
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 16,
                  alignSelf: "flex-start",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  {profile.role}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                ID: {profile.employeeId}
              </Text>
            </View>
          </View>

          {/* Edit Button */}
          <Pressable
            onPress={onEditProfile}
            style={{
              backgroundColor: colors.accent,
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 3,
              marginTop: 8,
            }}
          >
            <FontAwesome name="edit" size={16} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Contact Info */}
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="envelope" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "500",
                flex: 1,
              }}
            >
              {profile.email}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <FontAwesome name="phone" size={14} color={colors.textMedium} />
            <Text
              style={{
                color: colors.textMedium,
                fontSize: 14,
                fontWeight: "500",
                flex: 1,
              }}
            >
              {profile.phone}
            </Text>
          </View>
        </View>

        {/* Quick Stats Row */}
        <View
          style={{
            backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
            borderRadius: 12,
            padding: 16,
            borderWidth: 1,
            borderColor: isDark ? colors.borderVariant : colors.border,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {/* Tenure */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                {formatJoinDate(profile.joinDate)}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Thâm niên
              </Text>
            </View>

            {/* Divider */}
            <View
              style={{
                width: 1,
                height: 40,
                backgroundColor: isDark ? colors.borderVariant : colors.border,
                marginHorizontal: 16,
              }}
            />

            {/* Factory/Assigned Factories */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 4,
                  textAlign: "center",
                }}
                numberOfLines={2}
              >
                {profile.role === "Lead" && profile.assignedFactories
                  ? `${profile.assignedFactories.length} xưởng`
                  : profile.factory}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {profile.role === "Lead" ? "Quản lý" : "Xưởng"}
              </Text>
            </View>

            {/* Divider */}
            <View
              style={{
                width: 1,
                height: 40,
                backgroundColor: isDark ? colors.borderVariant : colors.border,
                marginHorizontal: 16,
              }}
            />

            {/* Monthly Earnings (if available) */}
            <View style={{ alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  color: colors.textHigh,
                  fontSize: 14,
                  fontWeight: "700",
                  marginBottom: 4,
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {profile.totalEarnings ? formatCurrency(profile.totalEarnings) : "N/A"}
              </Text>
              <Text
                style={{
                  color: colors.textMedium,
                  fontSize: 12,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Thu nhập
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SectionCard>
  );
}

export default ProfileHeaderCard;
