import { SafeAreaProvider } from "react-native-safe-area-context";
import { DynamicStack } from "./components/common/DynamicStack";
import { DateRangeProvider } from "./context/date-range-context";
import { ThemeProvider } from "./context/theme-context";
import { UserProvider } from "./context/user-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <DateRangeProvider>
          <SafeAreaProvider>
            <DynamicStack />
          </SafeAreaProvider>
        </DateRangeProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
