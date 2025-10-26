import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

interface DateRangeContextType {
  selectedRange: DateRange;
  setSelectedRange: (range: DateRange) => void;
  isLoading: boolean;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

const DEFAULT_RANGE: DateRange = {
  start: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
  end: new Date(),
  label: "7 ngày qua",
};

const STORAGE_KEY = "@date_range";

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [selectedRange, setSelectedRangeState] = useState<DateRange>(DEFAULT_RANGE);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved date range on mount
  useEffect(() => {
    loadSavedRange();
  }, []);

  // Save date range when it changes
  useEffect(() => {
    if (!isLoading) {
      saveRange(selectedRange);
    }
  }, [selectedRange, isLoading]);

  const loadSavedRange = async () => {
    try {
      const savedRange = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedRange) {
        const parsedRange = JSON.parse(savedRange);
        // Convert date strings back to Date objects
        const range: DateRange = {
          start: new Date(parsedRange.start),
          end: new Date(parsedRange.end),
          label: parsedRange.label,
        };
        setSelectedRangeState(range);
      }
    } catch (error) {
      console.error("Error loading saved date range:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRange = async (range: DateRange) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(range));
    } catch (error) {
      console.error("Error saving date range:", error);
    }
  };

  const setSelectedRange = (range: DateRange) => {
    setSelectedRangeState(range);
  };

  return (
    <DateRangeContext.Provider
      value={{
        selectedRange,
        setSelectedRange,
        isLoading,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}



