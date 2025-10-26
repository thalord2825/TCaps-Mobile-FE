import { Stack } from "expo-router";
import { LeadAnalyticsScreen } from "../components/analytics/LeadAnalyticsScreen";

export default function LeadAnalyticsRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Báo cáo sản xuất - Lead" }} />
      <LeadAnalyticsScreen />
    </>
  );
}


