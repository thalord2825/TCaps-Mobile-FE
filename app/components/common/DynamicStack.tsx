import { Stack } from "expo-router";
import { useTheme } from "../../context/theme-context";

export function DynamicStack() {
  const { colors } = useTheme();

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="analytics" options={{ headerShown: false }} />
    </Stack>
  );
}
