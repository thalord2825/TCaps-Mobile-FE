import { Stack } from "expo-router";
import { AdminAnalyticsScreen } from "../components/analytics/AdminAnalyticsScreen";

export default function AdminAnalyticsRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Phân tích tổng quan" }} />
      <AdminAnalyticsScreen />
    </>
  );
}


