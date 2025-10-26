/**
 * TCaps Mobile - Formatting Utilities
 *
 * Utility functions for formatting dates, times, currencies, and other display data
 */

/**
 * Format relative time (e.g., "5 phút trước", "2 giờ trước")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "vừa xong";
  if (diffMins < 60) return `${diffMins} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays < 7) return `${diffDays} ngày trước`;
  return `${Math.floor(diffDays / 7)} tuần trước`;
}

/**
 * Format currency in Vietnamese currency format
 */
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} VNĐ`;
}

/**
 * Format currency in compact format (e.g., 1.5K, 2.3M)
 */
export function formatCompactCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M VNĐ`;
  }
  if (amount >= 1000) {
    return `${Math.round(amount / 1000)}K VNĐ`;
  }
  return `${amount} VNĐ`;
}

/**
 * Calculate time remaining until deadline
 */
export function getTimeRemaining(deadline: Date): { hours: number; minutes: number; display: string } {
  const now = new Date();
  const diffMs = deadline.getTime() - now.getTime();

  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, display: "Đã quá hạn" };
  }

  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);

  let display = "";
  if (hours > 0) display = `còn ${hours} giờ`;
  else if (minutes > 0) display = `còn ${minutes} phút`;
  else display = "còn vài giây";

  return { hours, minutes, display };
}

/**
 * Get urgency color for time remaining
 */
export function getUrgencyColor(hours: number): string {
  if (hours < 6) return "#ef4444"; // Red - urgent
  if (hours < 12) return "#f59e0b"; // Yellow - important
  return "#3b82f6"; // Blue - normal
}

/**
 * Format percentage with decimal places
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

/**
 * Format time for display
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

/**
 * Format date and time for display
 */
export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Format large numbers with K/M suffix
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${Math.round(num / 1000)}K`;
  }
  return num.toString();
}

/**
 * Get status color based on status string
 */
export function getStatusColor(status: string, isDark: boolean): string {
  const statusMap: Record<string, { light: string; dark: string }> = {
    pending: { light: "#fbbf24", dark: "#fbbf24" },
    in_progress: { light: "#3b82f6", dark: "#3b82f6" },
    completed: { light: "#4ade80", dark: "#4ade80" },
    failed: { light: "#ef4444", dark: "#ef4444" },
    cancelled: { light: "#9ca3af", dark: "#9ca3af" },
    urgent: { light: "#ef4444", dark: "#ef4444" },
    high: { light: "#f59e0b", dark: "#f59e0b" },
    medium: { light: "#3b82f6", dark: "#3b82f6" },
    low: { light: "#10b981", dark: "#10b981" },
  };

  const colors = statusMap[status.toLowerCase()] || { light: "#6b7280", dark: "#9ca3af" };
  return isDark ? colors.dark : colors.light;
}
