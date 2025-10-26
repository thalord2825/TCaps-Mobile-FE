import { Stack } from "expo-router";
import { QCAnalyticsScreen } from "../components/analytics/QCAnalyticsScreen";

export default function QCAnalyticsRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Báo cáo sản xuất - QC" }} />
      <QCAnalyticsScreen />
    </>
  );
}


