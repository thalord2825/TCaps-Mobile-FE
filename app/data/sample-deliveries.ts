export interface Delivery {
  id: string;
  batchId: string;
  batchName: string;
  destination: string;
  address: string;
  contactName: string;
  contactPhone: string;
  status: "pending" | "in_transit" | "delivered" | "failed" | "returned";
  priority: "low" | "medium" | "high" | "urgent";
  assignedCourier: string;
  courierPhone: string;
  vehicleType: "motorcycle" | "truck" | "van";
  estimatedDelivery: string;
  actualDelivery?: string;
  notes?: string;
  items: {
    productCode: string;
    quantity: number;
    weight: number;
  }[];
  route: {
    distance: number; // in km
    estimatedTime: number; // in minutes
    waypoints: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export const sampleDeliveries: Delivery[] = [
  {
    id: "1",
    batchId: "B001",
    batchName: "Lô mũ bóng chày N001",
    destination: "Cửa hàng ABC",
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    contactName: "Nguyễn Văn A",
    contactPhone: "0901234567",
    status: "in_transit",
    priority: "high",
    assignedCourier: "HOANG VAN COURIER",
    courierPhone: "0901234571",
    vehicleType: "motorcycle",
    estimatedDelivery: "2024-12-19T14:00:00Z",
    items: [{ productCode: "N001", quantity: 50, weight: 25.5 }],
    route: {
      distance: 15.2,
      estimatedTime: 45,
      waypoints: ["Kho chính", "Cầu Sài Gòn", "Quận 1"],
    },
    createdAt: "2024-12-19T08:00:00Z",
    updatedAt: "2024-12-19T10:30:00Z",
  },
  {
    id: "2",
    batchId: "B002",
    batchName: "Lô mũ lưỡi trai N002",
    destination: "Cửa hàng XYZ",
    address: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    contactName: "Trần Thị B",
    contactPhone: "0901234568",
    status: "pending",
    priority: "medium",
    assignedCourier: "HOANG VAN COURIER",
    courierPhone: "0901234571",
    vehicleType: "motorcycle",
    estimatedDelivery: "2024-12-19T16:00:00Z",
    items: [{ productCode: "N002", quantity: 30, weight: 18.0 }],
    route: {
      distance: 22.5,
      estimatedTime: 60,
      waypoints: ["Kho chính", "Quận 3"],
    },
    createdAt: "2024-12-19T09:15:00Z",
    updatedAt: "2024-12-19T09:15:00Z",
  },
  {
    id: "3",
    batchId: "B003",
    batchName: "Lô mũ bucket N003",
    destination: "Nhà phân phối DEF",
    address: "789 Đường Cách Mạng Tháng 8, Quận 10, TP.HCM",
    contactName: "Lê Văn C",
    contactPhone: "0901234569",
    status: "delivered",
    priority: "low",
    assignedCourier: "HOANG VAN COURIER",
    courierPhone: "0901234571",
    vehicleType: "truck",
    estimatedDelivery: "2024-12-18T15:00:00Z",
    actualDelivery: "2024-12-18T14:45:00Z",
    items: [{ productCode: "N003", quantity: 100, weight: 45.0 }],
    route: {
      distance: 35.8,
      estimatedTime: 90,
      waypoints: ["Kho chính", "Quận 10"],
    },
    createdAt: "2024-12-18T10:00:00Z",
    updatedAt: "2024-12-18T14:45:00Z",
  },
  {
    id: "4",
    batchId: "B004",
    batchName: "Lô mũ snapback N004",
    destination: "Cửa hàng GHI",
    address: "321 Đường Võ Văn Tần, Quận 3, TP.HCM",
    contactName: "Phạm Thị D",
    contactPhone: "0901234570",
    status: "failed",
    priority: "urgent",
    assignedCourier: "HOANG VAN COURIER",
    courierPhone: "0901234571",
    vehicleType: "motorcycle",
    estimatedDelivery: "2024-12-17T11:00:00Z",
    notes: "Khách hàng không có mặt, hẹn giao lại",
    items: [{ productCode: "N004", quantity: 25, weight: 12.5 }],
    route: {
      distance: 18.7,
      estimatedTime: 50,
      waypoints: ["Kho chính", "Quận 3"],
    },
    createdAt: "2024-12-17T08:30:00Z",
    updatedAt: "2024-12-17T11:30:00Z",
  },
  {
    id: "5",
    batchId: "B005",
    batchName: "Lô mũ trucker N005",
    destination: "Cửa hàng JKL",
    address: "654 Đường Điện Biên Phủ, Quận Bình Thạnh, TP.HCM",
    contactName: "Vũ Văn E",
    contactPhone: "0901234571",
    status: "returned",
    priority: "medium",
    assignedCourier: "HOANG VAN COURIER",
    courierPhone: "0901234571",
    vehicleType: "van",
    estimatedDelivery: "2024-12-16T13:00:00Z",
    actualDelivery: "2024-12-16T13:00:00Z",
    notes: "Sản phẩm bị lỗi, khách hàng từ chối nhận",
    items: [{ productCode: "N005", quantity: 40, weight: 20.0 }],
    route: {
      distance: 28.3,
      estimatedTime: 75,
      waypoints: ["Kho chính", "Quận Bình Thạnh"],
    },
    createdAt: "2024-12-16T09:00:00Z",
    updatedAt: "2024-12-16T15:30:00Z",
  },
];

export const getDeliveryStats = () => {
  const totalDeliveries = sampleDeliveries.length;
  const pendingDeliveries = sampleDeliveries.filter((d) => d.status === "pending").length;
  const inTransitDeliveries = sampleDeliveries.filter((d) => d.status === "in_transit").length;
  const deliveredDeliveries = sampleDeliveries.filter((d) => d.status === "delivered").length;
  const failedDeliveries = sampleDeliveries.filter((d) => d.status === "failed").length;
  const returnedDeliveries = sampleDeliveries.filter((d) => d.status === "returned").length;

  const priorityDistribution = sampleDeliveries.reduce(
    (acc, delivery) => {
      acc[delivery.priority] = (acc[delivery.priority] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const totalDistance = sampleDeliveries.reduce((sum, delivery) => sum + delivery.route.distance, 0);
  const totalItems = sampleDeliveries.reduce(
    (sum, delivery) => sum + delivery.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
    0
  );

  return {
    totalDeliveries,
    pendingDeliveries,
    inTransitDeliveries,
    deliveredDeliveries,
    failedDeliveries,
    returnedDeliveries,
    priorityDistribution,
    totalDistance,
    totalItems,
  };
};




