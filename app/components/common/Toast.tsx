import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Animated, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";
import { useTheme } from "../../context/theme-context";

export interface ToastProps {
  visible: boolean;
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  onHide: () => void;
}

export function Toast({ visible, message, type, duration = 3000, onHide }: ToastProps) {
  const { colors } = useTheme();
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: isDark ? "#059669" : "#10b981",
          borderColor: isDark ? "#047857" : "#059669",
        };
      case "error":
        return {
          backgroundColor: isDark ? "#dc2626" : "#ef4444",
          borderColor: isDark ? "#b91c1c" : "#dc2626",
        };
      case "info":
        return {
          backgroundColor: isDark ? "#1d4ed8" : "#3b82f6",
          borderColor: isDark ? "#1e40af" : "#2563eb",
        };
      default:
        return {
          backgroundColor: colors.accent,
          borderColor: colors.accent,
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check-circle";
      case "error":
        return "times-circle";
      case "info":
        return "info-circle";
      default:
        return "info-circle";
    }
  };

  if (!visible) return null;

  const toastStyle = getToastStyle();

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 60,
        left: 20,
        right: 20,
        zIndex: 1000,
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <View
        style={{
          backgroundColor: toastStyle.backgroundColor,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: toastStyle.borderColor,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <FontAwesome name={getIcon()} size={20} color="#FFFFFF" />
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontWeight: "600",
            flex: 1,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

export default Toast;




