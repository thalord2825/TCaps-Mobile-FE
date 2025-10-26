import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
// Note: react-native-view-shot needs to be installed: npm install react-native-view-shot
// import ViewShot from "react-native-view-shot";
import { useTheme } from "../../context/theme-context";

interface ExportChartProps {
  children: React.ReactNode;
  title: string;
  fileName?: string;
  compact?: boolean;
}

export function ExportChart({ children, title, fileName, compact = false }: ExportChartProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";
  // const viewShotRef = useRef<ViewShot>(null);

  const handleExport = async (format: "png" | "pdf") => {
    try {
      // Note: This requires react-native-view-shot to be installed
      Alert.alert("Thông báo", "Chức năng xuất biểu đồ cần cài đặt thêm thư viện react-native-view-shot");

      // Example implementation when ViewShot is available:
      // if (!viewShotRef.current) return;
      // const uri = await viewShotRef.current.capture();
      // await Share.share({
      //   url: uri,
      //   title: `${title} - ${new Date().toLocaleDateString("vi-VN")}`,
      //   message: `Biểu đồ: ${title}`,
      // });
    } catch (error) {
      console.error("Export error:", error);
      Alert.alert("Lỗi", "Không thể xuất biểu đồ. Vui lòng thử lại.");
    }
  };

  if (compact) {
    return (
      <View style={{ position: "relative" }}>
        {children}

        <Pressable
          onPress={() => handleExport("png")}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: isDark ? colors.background : "#FFFFFF",
            padding: 6,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <FontAwesome name="download" size={12} color={colors.accent} />
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ gap: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={{ color: colors.textHigh, fontSize: 16, fontWeight: "700" }}>{title}</Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => handleExport("png")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
            }}
          >
            <FontAwesome name="download" size={12} color={colors.accent} />
            <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>PNG</Text>
          </Pressable>

          <Pressable
            onPress={() => handleExport("pdf")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
              backgroundColor: isDark ? colors.surfaceVariant : colors.surfaceVariant,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: isDark ? colors.borderVariant : colors.border,
            }}
          >
            <FontAwesome name="file-pdf-o" size={12} color={colors.error} />
            <Text style={{ color: colors.textHigh, fontSize: 12, fontWeight: "600" }}>PDF</Text>
          </Pressable>
        </View>
      </View>

      {children}
    </View>
  );
}
