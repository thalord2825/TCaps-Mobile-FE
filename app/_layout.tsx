import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./context/theme-context";
import { UserProvider } from "./context/user-context";
import "./globals.css";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ contentStyle: { backgroundColor: "#070A12" } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
