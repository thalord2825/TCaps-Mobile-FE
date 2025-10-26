// Chart data generator functions for time-series and trend data

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface PieChartData {
  value: number;
  label: string;
  color?: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
  label?: string;
}

export interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

// Helper function to filter data by date range
export function filterDataByDateRange<T extends { date?: string; x?: string | number }>(
  data: T[],
  dateRange: DateRange
): T[] {
  const startTime = dateRange.start.getTime();
  const endTime = dateRange.end.getTime();

  return data.filter((item) => {
    let itemDate: Date;

    if (item.date) {
      itemDate = new Date(item.date);
    } else if (typeof item.x === "string") {
      // Try to parse date from x value
      itemDate = new Date(item.x);
    } else {
      // For numeric x values, assume it's days from now
      const daysAgo = typeof item.x === "number" ? item.x : 0;
      itemDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    }

    const itemTime = itemDate.getTime();
    return itemTime >= startTime && itemTime <= endTime;
  });
}

// Generate weekly production trend data (7 days) - More realistic data
export function generateWeeklyProductionTrend(dateRange?: DateRange): ChartDataPoint[] {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const baseValues = [85, 92, 78, 95, 88, 75, 45]; // Realistic production values

  const data = days.map((day, index) => ({
    x: day,
    y: baseValues[index],
    label: `${day}: ${baseValues[index]} sản phẩm`,
  }));

  // If date range is provided, filter the data
  if (dateRange) {
    return filterDataByDateRange(data, dateRange);
  }

  return data;
}

// Generate comprehensive production analytics data
export function generateProductionAnalytics(dateRange?: DateRange): {
  dailyProduction: ChartDataPoint[];
  weeklyTrend: ChartDataPoint[];
  monthlyComparison: ChartDataPoint[];
  factoryEfficiency: ChartDataPoint[];
} {
  // Daily production for 30 days
  const dailyProduction = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayName = date.toLocaleDateString("vi-VN", { weekday: "short" });
    const baseValue = 80 + Math.sin(i * 0.2) * 20 + Math.random() * 15;

    return {
      x: dayName,
      y: Math.round(baseValue),
      label: `${dayName}: ${Math.round(baseValue)} sản phẩm`,
    };
  });

  // Weekly trend for 12 weeks
  const weeklyTrend = Array.from({ length: 12 }, (_, i) => {
    const weekNumber = i + 1;
    const baseValue = 500 + Math.sin(i * 0.3) * 100 + Math.random() * 50;

    return {
      x: `Tuần ${weekNumber}`,
      y: Math.round(baseValue),
      label: `Tuần ${weekNumber}: ${Math.round(baseValue)} sản phẩm`,
    };
  });

  // Monthly comparison
  const monthlyComparison = [
    { x: "Tháng 1", y: 3200, label: "Tháng 1: 3,200 sản phẩm" },
    { x: "Tháng 2", y: 2800, label: "Tháng 2: 2,800 sản phẩm" },
    { x: "Tháng 3", y: 3500, label: "Tháng 3: 3,500 sản phẩm" },
    { x: "Tháng 4", y: 4200, label: "Tháng 4: 4,200 sản phẩm" },
    { x: "Tháng 5", y: 3800, label: "Tháng 5: 3,800 sản phẩm" },
    { x: "Tháng 6", y: 4500, label: "Tháng 6: 4,500 sản phẩm" },
  ];

  // Factory efficiency
  const factoryEfficiency = [
    { x: "Cắt Vải", y: 92, label: "Cắt Vải: 92% hiệu suất" },
    { x: "Thêu", y: 88, label: "Thêu: 88% hiệu suất" },
    { x: "In", y: 85, label: "In: 85% hiệu suất" },
    { x: "May Vành", y: 90, label: "May Vành: 90% hiệu suất" },
    { x: "Ủi", y: 87, label: "Ủi: 87% hiệu suất" },
    { x: "Đóng gói", y: 94, label: "Đóng gói: 94% hiệu suất" },
  ];

  return {
    dailyProduction,
    weeklyTrend,
    monthlyComparison,
    factoryEfficiency,
  };
}

// Generate daily batch completion trend (14 days) - More realistic data
export function generateBatchCompletionTrend(): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const baseValues = [12, 15, 8, 18, 14, 9, 6, 16, 11, 13, 7, 19, 10, 5]; // Realistic batch counts

  for (let i = 13; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayName = date.toLocaleDateString("vi-VN", { weekday: "short" });

    data.push({
      x: dayName,
      y: baseValues[13 - i],
      label: `${dayName}: ${baseValues[13 - i]} lô`,
    });
  }

  return data;
}

// Generate factory performance data - More realistic percentages
export function generateFactoryPerformance(): ChartDataPoint[] {
  const factories = [
    { name: "Cắt Vải", performance: 92 },
    { name: "Thêu", performance: 88 },
    { name: "In", performance: 85 },
    { name: "May Vành", performance: 90 },
    { name: "Ủi", performance: 87 },
  ];

  return factories.map((factory) => ({
    x: factory.name,
    y: factory.performance,
    label: `${factory.name}: ${factory.performance}%`,
  }));
}

// Generate batch status distribution - More realistic numbers
export function generateBatchStatusDistribution(): PieChartData[] {
  return [
    { value: 18, label: "Đang sản xuất", color: "#fbbf24" },
    { value: 12, label: "Hoàn thành", color: "#4ade80" },
    { value: 6, label: "Chờ QC", color: "#f87171" },
    { value: 3, label: "Tạm dừng", color: "#6b7280" },
  ];
}

// Generate quality status breakdown - More realistic percentages
export function generateQualityStatusBreakdown(): PieChartData[] {
  return [
    { value: 78, label: "Đạt", color: "#4ade80" },
    { value: 15, label: "Không đạt", color: "#ef4444" },
    { value: 7, label: "Chờ kiểm tra", color: "#fbbf24" },
  ];
}

// Generate daily inspection trend (pass/fail rates) - More realistic data
export function generateInspectionTrend(): { pass: ChartDataPoint[]; fail: ChartDataPoint[] } {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const passValues = [22, 28, 19, 31, 25, 18, 8]; // Realistic pass counts
  const failValues = [3, 2, 4, 1, 3, 5, 2]; // Realistic fail counts

  const pass = days.map((day, index) => ({
    x: day,
    y: passValues[index],
    label: `${day} - Đạt: ${passValues[index]}`,
  }));

  const fail = days.map((day, index) => ({
    x: day,
    y: failValues[index],
    label: `${day} - Không đạt: ${failValues[index]}`,
  }));

  return { pass, fail };
}

// Generate defect types frequency - More realistic defect data
export function generateDefectTypesFrequency(): ChartDataPoint[] {
  const defectTypes = [
    { name: "Lỗi may", count: 8 },
    { name: "Lỗi màu sắc", count: 5 },
    { name: "Lỗi kích thước", count: 12 },
    { name: "Lỗi chất liệu", count: 3 },
    { name: "Lỗi khác", count: 2 },
  ];

  return defectTypes.map((type) => ({
    x: type.name,
    y: type.count,
    label: `${type.name}: ${type.count} lỗi`,
  }));
}

// Generate earnings trend (7 days) - More realistic earnings
export function generateEarningsTrend(): ChartDataPoint[] {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const earnings = [450000, 520000, 380000, 580000, 490000, 350000, 180000]; // Realistic earnings

  return days.map((day, index) => ({
    x: day,
    y: earnings[index],
    label: `${day}: ${earnings[index].toLocaleString("vi-VN")} VNĐ`,
  }));
}

// Generate task completion status - More realistic percentages
export function generateTaskCompletionStatus(): PieChartData[] {
  return [
    { value: 72, label: "Đã hoàn thành", color: "#4ade80" },
    { value: 20, label: "Đang làm", color: "#fbbf24" },
    { value: 8, label: "Chưa bắt đầu", color: "#6b7280" },
  ];
}

// Generate daily quality scores - More realistic scores
export function generateDailyQualityScores(): ChartDataPoint[] {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const scores = [88, 92, 85, 94, 89, 82, 76]; // Realistic quality scores

  return days.map((day, index) => ({
    x: day,
    y: scores[index],
    label: `${day}: ${scores[index]}/100`,
  }));
}

// Generate delivery trend data - More realistic delivery data
export function generateDeliveryTrend(): {
  delivered: ChartDataPoint[];
  failed: ChartDataPoint[];
  returned: ChartDataPoint[];
} {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const deliveredValues = [18, 22, 15, 25, 20, 12, 8];
  const failedValues = [2, 1, 3, 1, 2, 4, 1];
  const returnedValues = [1, 0, 2, 0, 1, 1, 0];

  const delivered = days.map((day, index) => ({
    x: day,
    y: deliveredValues[index],
    label: `${day} - Giao thành công: ${deliveredValues[index]}`,
  }));

  const failed = days.map((day, index) => ({
    x: day,
    y: failedValues[index],
    label: `${day} - Giao thất bại: ${failedValues[index]}`,
  }));

  const returned = days.map((day, index) => ({
    x: day,
    y: returnedValues[index],
    label: `${day} - Trả về: ${returnedValues[index]}`,
  }));

  return { delivered, failed, returned };
}

// Generate delivery status distribution - More realistic percentages
export function generateDeliveryStatusDistribution(): PieChartData[] {
  return [
    { value: 82, label: "Đã giao", color: "#4ade80" },
    { value: 12, label: "Đang giao", color: "#fbbf24" },
    { value: 4, label: "Thất bại", color: "#ef4444" },
    { value: 2, label: "Trả về", color: "#6b7280" },
  ];
}

// Generate distance covered per day - More realistic distances
export function generateDistanceCovered(): ChartDataPoint[] {
  const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const distances = [45, 52, 38, 58, 42, 28, 15]; // Realistic distances in km

  return days.map((day, index) => ({
    x: day,
    y: distances[index],
    label: `${day}: ${distances[index]} km`,
  }));
}

// Generate stage-wise batch distribution - More realistic batch counts
export function generateStageDistribution(): ChartDataPoint[] {
  const stages = [
    { name: "Cắt vải", batches: 8 },
    { name: "Thêu", batches: 6 },
    { name: "In", batches: 5 },
    { name: "May vành", batches: 7 },
    { name: "Ủi", batches: 4 },
  ];

  return stages.map((stage) => ({
    x: stage.name,
    y: stage.batches,
    label: `${stage.name}: ${stage.batches} lô`,
  }));
}

// Generate factory completion percentages - More realistic completion rates
export function generateFactoryCompletionPercentages(): { factory: string; percentage: number; color: string }[] {
  const factories = [
    { name: "Cắt Vải", percentage: 88, color: "#3b82f6" },
    { name: "Thêu", percentage: 92, color: "#4ade80" },
    { name: "In", percentage: 85, color: "#fbbf24" },
    { name: "May Vành", percentage: 90, color: "#ef4444" },
    { name: "Ủi", percentage: 87, color: "#8b5cf6" },
  ];

  return factories.map((factory) => ({
    factory: factory.name,
    percentage: factory.percentage,
    color: factory.color,
  }));
}

// Generate time-based performance metrics - More realistic performance data
export function generateTimeBasedPerformance(): { time: string; efficiency: number; quality: number }[] {
  const times = [
    { time: "8h", efficiency: 85, quality: 88 },
    { time: "10h", efficiency: 92, quality: 91 },
    { time: "12h", efficiency: 78, quality: 82 },
    { time: "14h", efficiency: 89, quality: 87 },
    { time: "16h", efficiency: 86, quality: 89 },
    { time: "18h", efficiency: 82, quality: 85 },
  ];

  return times.map((item) => ({
    time: item.time,
    efficiency: item.efficiency,
    quality: item.quality,
  }));
}

// Generate material usage data - New realistic data
export function generateMaterialUsage(): ChartDataPoint[] {
  const materials = [
    { name: "Vải cotton", usage: 45 },
    { name: "Vải polyester", usage: 32 },
    { name: "Chỉ may", usage: 28 },
    { name: "Keo dán", usage: 15 },
    { name: "Nhãn mác", usage: 8 },
  ];

  return materials.map((material) => ({
    x: material.name,
    y: material.usage,
    label: `${material.name}: ${material.usage}%`,
  }));
}

// Generate productivity by shift - New realistic data
export function generateProductivityByShift(): PieChartData[] {
  return [
    { value: 45, label: "Ca sáng (6h-14h)", color: "#4ade80" },
    { value: 35, label: "Ca chiều (14h-22h)", color: "#fbbf24" },
    { value: 20, label: "Ca đêm (22h-6h)", color: "#6b7280" },
  ];
}

// Generate cost analysis - New realistic data
export function generateCostAnalysis(): ChartDataPoint[] {
  const costCategories = [
    { name: "Nguyên liệu", cost: 65 },
    { name: "Nhân công", cost: 25 },
    { name: "Máy móc", cost: 7 },
    { name: "Khác", cost: 3 },
  ];

  return costCategories.map((category) => ({
    x: category.name,
    y: category.cost,
    label: `${category.name}: ${category.cost}%`,
  }));
}

// Generate comprehensive mock data for all chart types
export function generateComprehensiveMockData(): {
  productionTrends: ChartDataPoint[];
  qualityMetrics: ChartDataPoint[];
  financialData: ChartDataPoint[];
  operationalData: ChartDataPoint[];
  timeSeriesData: ChartDataPoint[];
  performanceMetrics: ChartDataPoint[];
} {
  // Production trends over 30 days
  const productionTrends = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dayName = date.toLocaleDateString("vi-VN", { weekday: "short" });
    const baseValue = 70 + Math.sin(i * 0.15) * 25 + Math.random() * 20;

    return {
      x: dayName,
      y: Math.round(baseValue),
      label: `${dayName}: ${Math.round(baseValue)} sản phẩm`,
    };
  });

  // Quality metrics
  const qualityMetrics = [
    { x: "Đạt chuẩn", y: 78, label: "Đạt chuẩn: 78%" },
    { x: "Cần sửa", y: 15, label: "Cần sửa: 15%" },
    { x: "Loại bỏ", y: 7, label: "Loại bỏ: 7%" },
  ];

  // Financial data
  const financialData = [
    { x: "Doanh thu", y: 12500000, label: "Doanh thu: 12.5M VNĐ" },
    { x: "Chi phí", y: 8500000, label: "Chi phí: 8.5M VNĐ" },
    { x: "Lợi nhuận", y: 4000000, label: "Lợi nhuận: 4M VNĐ" },
  ];

  // Operational data
  const operationalData = [
    { x: "Ca sáng", y: 45, label: "Ca sáng: 45% năng suất" },
    { x: "Ca chiều", y: 35, label: "Ca chiều: 35% năng suất" },
    { x: "Ca đêm", y: 20, label: "Ca đêm: 20% năng suất" },
  ];

  // Time series data (hourly performance)
  const timeSeriesData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const baseValue = 50 + Math.sin(i * 0.3) * 30 + Math.random() * 15;

    return {
      x: `${hour}:00`,
      y: Math.round(baseValue),
      label: `${hour}:00 - ${Math.round(baseValue)}% hiệu suất`,
    };
  });

  // Performance metrics
  const performanceMetrics = [
    { x: "Tốc độ", y: 92, label: "Tốc độ: 92%" },
    { x: "Chất lượng", y: 88, label: "Chất lượng: 88%" },
    { x: "Hiệu suất", y: 85, label: "Hiệu suất: 85%" },
    { x: "An toàn", y: 96, label: "An toàn: 96%" },
  ];

  return {
    productionTrends,
    qualityMetrics,
    financialData,
    operationalData,
    timeSeriesData,
    performanceMetrics,
  };
}

// Generate detailed batch status data
export function generateDetailedBatchStatus(): {
  statusDistribution: PieChartData[];
  stageProgress: ChartDataPoint[];
  completionRates: ChartDataPoint[];
  qualityBreakdown: PieChartData[];
} {
  const statusDistribution = [
    { value: 25, label: "Đang sản xuất", color: "#fbbf24" },
    { value: 18, label: "Hoàn thành", color: "#4ade80" },
    { value: 12, label: "Chờ QC", color: "#f87171" },
    { value: 8, label: "Tạm dừng", color: "#6b7280" },
    { value: 5, label: "Hủy bỏ", color: "#ef4444" },
  ];

  const stageProgress = [
    { x: "Cắt vải", y: 95, label: "Cắt vải: 95% hoàn thành" },
    { x: "Thêu", y: 88, label: "Thêu: 88% hoàn thành" },
    { x: "In", y: 82, label: "In: 82% hoàn thành" },
    { x: "May vành", y: 90, label: "May vành: 90% hoàn thành" },
    { x: "Ủi", y: 85, label: "Ủi: 85% hoàn thành" },
    { x: "Đóng gói", y: 92, label: "Đóng gói: 92% hoàn thành" },
  ];

  const completionRates = [
    { x: "Tuần 1", y: 78, label: "Tuần 1: 78% hoàn thành" },
    { x: "Tuần 2", y: 85, label: "Tuần 2: 85% hoàn thành" },
    { x: "Tuần 3", y: 82, label: "Tuần 3: 82% hoàn thành" },
    { x: "Tuần 4", y: 88, label: "Tuần 4: 88% hoàn thành" },
  ];

  const qualityBreakdown = [
    { value: 75, label: "Xuất sắc", color: "#4ade80" },
    { value: 15, label: "Tốt", color: "#22c55e" },
    { value: 8, label: "Trung bình", color: "#fbbf24" },
    { value: 2, label: "Kém", color: "#ef4444" },
  ];

  return {
    statusDistribution,
    stageProgress,
    completionRates,
    qualityBreakdown,
  };
}
