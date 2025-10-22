import React, { createContext, ReactNode, useContext, useState } from "react";

export type Theme = "dark" | "light";

export interface ThemeColors {
  // Background colors
  background: string;
  surface: string;
  surfaceVariant: string;

  // Text colors
  textHigh: string;
  textMedium: string;
  textLow: string;
  textMuted: string;

  // Accent colors
  accent: string;
  accentSecondary: string;

  // Border colors
  border: string;
  borderVariant: string;

  // Semantic colors
  success: string;
  warning: string;
  error: string;
  info: string;

  // Status colors
  statusActive: string;
  statusInactive: string;
}

const darkTheme: ThemeColors = {
  // Background colors
  background: "#070A12",
  surface: "#0E0A16",
  surfaceVariant: "#0B0F18",

  // Text colors
  textHigh: "#FFFFFF",
  textMedium: "#E5E7EB",
  textLow: "#B6B8C3",
  textMuted: "#A3B1D1",

  // Accent colors
  accent: "#7aa2ff",
  accentSecondary: "#5A7BD8",

  // Border colors
  border: "#152033",
  borderVariant: "#182235",

  // Semantic colors
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Status colors
  statusActive: "#10b981",
  statusInactive: "#6B7280",
};

const lightTheme: ThemeColors = {
  // Background colors
  background: "#F8F9FA",
  surface: "#FFFFFF",
  surfaceVariant: "#F8F9FA",

  // Text colors
  textHigh: "#2C3E50",
  textMedium: "#34495E",
  textLow: "#6C757D",
  textMuted: "#ADB5BD",

  // Accent colors
  accent: "#2C3E50",
  accentSecondary: "#34495E",

  // Border colors
  border: "#E9ECEF",
  borderVariant: "#DEE2E6",

  // Semantic colors
  success: "#27AE60",
  warning: "#F39C12",
  error: "#E74C3C",
  info: "#3498DB",

  // Status colors
  statusActive: "#27AE60",
  statusInactive: "#95A5A6",
};

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  const colors = theme === "dark" ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
