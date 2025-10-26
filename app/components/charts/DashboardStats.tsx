import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";
import {
  generateComprehensiveMockData,
  generateDefectTypesFrequency,
  generateDetailedBatchStatus,
  generateMaterialUsage,
  generateProductionAnalytics,
  generateTaskCompletionStatus,
} from "../../data/chart-data-generators";
import { InteractiveChart } from "./InteractiveChart";

interface DashboardStatsProps {
  role: "admin" | "lead" | "qc" | "staff";
  showCharts?: boolean;
}

export function DashboardStats({ role, showCharts = true }: DashboardStatsProps) {
  const { theme, colors } = useTheme();
  const isDark = theme === "dark";

  if (!showCharts) {
    // Fallback to simple stats cards
    return (
      <View style={{ gap: 12 }}>
        <Text style={{ color: colors.textHigh, fontSize: 18, fontWeight: "800" }}>Tổng quan hệ thống</Text>
        {/* Simple stats cards would go here */}
      </View>
    );
  }

  const getChartsForRole = () => {
    const comprehensiveData = generateComprehensiveMockData();
    const detailedBatchData = generateDetailedBatchStatus();
    const productionAnalytics = generateProductionAnalytics();

    switch (role) {
      case "admin":
        return [
          {
            type: "donut" as const,
            title: "Phân bố trạng thái lô hàng",
            overviewData: detailedBatchData.statusDistribution,
            detailedData: detailedBatchData.statusDistribution.map((item) => ({
              ...item,
              value: item.value * 1.5, // More detailed data
            })),
            overviewTitle: "Trạng thái lô hàng",
            detailedTitle: "Chi tiết phân bố lô hàng",
          },
          {
            type: "area" as const,
            title: "Xu hướng sản xuất",
            overviewData: comprehensiveData.productionTrends.slice(0, 7), // Last 7 days
            detailedData: comprehensiveData.productionTrends, // Full 30 days
            overviewTitle: "Sản xuất 7 ngày",
            detailedTitle: "Xu hướng sản xuất 30 ngày",
          },
          {
            type: "bar" as const,
            title: "Hiệu suất nhà máy",
            overviewData: productionAnalytics.factoryEfficiency,
            detailedData: productionAnalytics.factoryEfficiency,
            overviewTitle: "Top nhà máy",
            detailedTitle: "Hiệu suất chi tiết từng nhà máy",
          },
          {
            type: "pie" as const,
            title: "Sử dụng nguyên liệu",
            overviewData: generateMaterialUsage(),
            detailedData: generateMaterialUsage(),
            overviewTitle: "Nguyên liệu",
            detailedTitle: "Chi tiết sử dụng nguyên liệu",
          },
          {
            type: "line" as const,
            title: "Hiệu suất theo giờ",
            overviewData: comprehensiveData.timeSeriesData.slice(0, 12), // First 12 hours
            detailedData: comprehensiveData.timeSeriesData, // Full 24 hours
            overviewTitle: "Hiệu suất 12h đầu",
            detailedTitle: "Hiệu suất 24 giờ",
          },
        ];

      case "lead":
        return [
          {
            type: "pie" as const,
            title: "Trạng thái chất lượng",
            overviewData: detailedBatchData.qualityBreakdown,
            detailedData: detailedBatchData.qualityBreakdown,
            overviewTitle: "QC Overview",
            detailedTitle: "Chi tiết chất lượng",
          },
          {
            type: "line" as const,
            title: "Tiến độ sản xuất",
            overviewData: comprehensiveData.productionTrends.slice(0, 7),
            detailedData: comprehensiveData.productionTrends,
            overviewTitle: "Tiến độ tuần",
            detailedTitle: "Tiến độ 30 ngày",
          },
          {
            type: "donut" as const,
            title: "Năng suất theo ca",
            overviewData: comprehensiveData.operationalData,
            detailedData: comprehensiveData.operationalData,
            overviewTitle: "Ca làm việc",
            detailedTitle: "Chi tiết năng suất ca",
          },
          {
            type: "bar" as const,
            title: "Tiến độ giai đoạn",
            overviewData: detailedBatchData.stageProgress,
            detailedData: detailedBatchData.stageProgress,
            overviewTitle: "Giai đoạn",
            detailedTitle: "Chi tiết tiến độ giai đoạn",
          },
        ];

      case "qc":
        return [
          {
            type: "donut" as const,
            title: "Kết quả kiểm tra",
            overviewData: detailedBatchData.qualityBreakdown,
            detailedData: detailedBatchData.qualityBreakdown,
            overviewTitle: "QC Results",
            detailedTitle: "Chi tiết kiểm tra",
          },
          {
            type: "bar" as const,
            title: "Điểm chất lượng",
            overviewData: comprehensiveData.qualityMetrics,
            detailedData: comprehensiveData.qualityMetrics,
            overviewTitle: "Quality Scores",
            detailedTitle: "Điểm chất lượng chi tiết",
          },
          {
            type: "bar" as const,
            title: "Loại lỗi phổ biến",
            overviewData: generateDefectTypesFrequency(),
            detailedData: generateDefectTypesFrequency(),
            overviewTitle: "Defect Types",
            detailedTitle: "Chi tiết các loại lỗi",
          },
          {
            type: "line" as const,
            title: "Hiệu suất kiểm tra",
            overviewData: comprehensiveData.timeSeriesData.slice(8, 16), // Working hours
            detailedData: comprehensiveData.timeSeriesData,
            overviewTitle: "Hiệu suất 8h",
            detailedTitle: "Hiệu suất 24h",
          },
        ];

      case "staff":
        return [
          {
            type: "area" as const,
            title: "Thu nhập cá nhân",
            overviewData: comprehensiveData.financialData,
            detailedData: comprehensiveData.financialData,
            overviewTitle: "Earnings Trend",
            detailedTitle: "Chi tiết thu nhập",
          },
          {
            type: "donut" as const,
            title: "Trạng thái công việc",
            overviewData: generateTaskCompletionStatus(),
            detailedData: generateTaskCompletionStatus(),
            overviewTitle: "Task Status",
            detailedTitle: "Chi tiết công việc",
          },
          {
            type: "bar" as const,
            title: "Hiệu suất cá nhân",
            overviewData: comprehensiveData.performanceMetrics,
            detailedData: comprehensiveData.performanceMetrics,
            overviewTitle: "Personal Performance",
            detailedTitle: "Chi tiết hiệu suất cá nhân",
          },
          {
            type: "line" as const,
            title: "Tiến độ công việc",
            overviewData: detailedBatchData.completionRates,
            detailedData: detailedBatchData.completionRates,
            overviewTitle: "Tiến độ tuần",
            detailedTitle: "Chi tiết tiến độ",
          },
        ];

      default:
        return [];
    }
  };

  const charts = getChartsForRole();

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          style={{
            color: colors.textHigh,
            fontSize: 18,
            fontWeight: "800",
          }}
        >
          Biểu đồ phân tích
        </Text>
        <View
          style={{
            backgroundColor: colors.accent,
            paddingHorizontal: isDark ? 8 : 12,
            paddingVertical: isDark ? 4 : 6,
            borderRadius: isDark ? 6 : 12,
            shadowColor: colors.accent,
            shadowOpacity: 0.3,
            shadowRadius: isDark ? 8 : 8,
            elevation: 3,
          }}
        >
          <Text
            style={{
              color: isDark ? "#0b1020" : "#FFFFFF",
              fontSize: isDark ? 10 : 11,
              fontWeight: "700",
            }}
          >
            TƯƠNG TÁC
          </Text>
        </View>
      </View>

      <View style={{ gap: 12 }}>
        {charts.map((chart, index) => (
          <InteractiveChart
            key={index}
            type={chart.type}
            title={chart.title}
            overviewData={chart.overviewData}
            detailedData={chart.detailedData}
            overviewTitle={chart.overviewTitle}
            detailedTitle={chart.detailedTitle}
            height={180}
            color={colors.accent}
            showExpandButton={true}
            onExpand={() => console.log(`Expanded ${chart.title}`)}
          />
        ))}
      </View>
    </View>
  );
}
