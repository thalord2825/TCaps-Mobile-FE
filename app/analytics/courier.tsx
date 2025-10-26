import { Stack } from "expo-router";
import { CourierAnalyticsScreen } from "../components/analytics/CourierAnalyticsScreen";

export default function CourierAnalyticsRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Báo cáo sản xuất - Courier" }} />
      <CourierAnalyticsScreen />
    </>
  );
}


