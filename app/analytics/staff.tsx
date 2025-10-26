import { Stack } from "expo-router";
import { StaffAnalyticsScreen } from "../components/analytics/StaffAnalyticsScreen";

export default function StaffAnalyticsRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Báo cáo sản xuất - Staff" }} />
      <StaffAnalyticsScreen />
    </>
  );
}


