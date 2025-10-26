import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "../../app/globals.css";
import { getAllowedTabs, getTabIcon, getTabTitle } from "../../config/route-rules";
import { useTheme } from "../context/theme-context";
import { useUser } from "../context/user-context";

export default function TabsLayout() {
  const { role } = useUser();
  const { colors, theme } = useTheme();
  const isDark = theme === "dark";
  const allowedTabs = getAllowedTabs(role);

  // Debug logging to verify role-based tab filtering
  console.log("🔧 TabsLayout - Current role:", role);
  console.log("🔧 TabsLayout - Allowed tabs:", allowedTabs);
  console.log("🔧 TabsLayout - Tab counts:", {
    Admin: getAllowedTabs("Admin").length,
    Lead: getAllowedTabs("Lead").length,
    QC: getAllowedTabs("QC").length,
    Staff: getAllowedTabs("Staff").length,
  });

  return (
    <Tabs
      key={role}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: isDark ? colors.border : colors.borderVariant,
        },
        tabBarActiveTintColor: isDark ? "#a9dfd8" : colors.accent,
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : colors.textMuted,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textHigh,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: getTabTitle("home"),
          tabBarIcon: ({ color, size }) => <FontAwesome name={getTabIcon("home") as any} size={size} color={color} />,
          href: allowedTabs.includes("home") ? "/" : null,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: getTabTitle("history"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={getTabIcon("history") as any} size={size} color={color} />
          ),
          href: allowedTabs.includes("history") ? "/history" : null,
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          headerShown: false,
          title: getTabTitle("inventory"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={getTabIcon("inventory") as any} size={size} color={color} />
          ),
          href: allowedTabs.includes("inventory") ? "/inventory" : null,
        }}
      />
      <Tabs.Screen
        name="request"
        options={{
          headerShown: false,
          title: getTabTitle("request"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={getTabIcon("request") as any} size={size} color={color} />
          ),
          href: allowedTabs.includes("request") ? "/request" : null,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          headerShown: false,
          title: getTabTitle("users"),
          tabBarIcon: ({ color, size }) => <FontAwesome name={getTabIcon("users") as any} size={size} color={color} />,
          href: allowedTabs.includes("users") ? "/users" : null,
        }}
      />
      <Tabs.Screen
        name="delivery"
        options={{
          headerShown: false,
          title: getTabTitle("delivery"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={getTabIcon("delivery") as any} size={size} color={color} />
          ),
          href: allowedTabs.includes("delivery") ? "/delivery" : null,
        }}
      />
      <Tabs.Screen
        name="work-manage"
        options={{
          headerShown: false,
          title: "Quản lý công việc",
          tabBarIcon: ({ color, size }) => <FontAwesome name="briefcase" size={size} color={color} />,
          href: allowedTabs.includes("workManage") ? "/work-manage" : null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: getTabTitle("profile"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name={getTabIcon("profile") as any} size={size} color={color} />
          ),
          href: allowedTabs.includes("profile") ? "/profile" : null,
        }}
      />
    </Tabs>
  );
}
