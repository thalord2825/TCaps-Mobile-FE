import { Pressable, Text, useColorScheme, View } from "react-native";
import Colors from "../../../constants/Colors";

export interface FloatingAddButtonProps {
  onPress: () => void;
}

export function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  const isDark = scheme === "dark";

  return (
    <View
      style={{
        position: "absolute",
        bottom: 24,
        right: 24,
        zIndex: 1000,
      }}
    >
      <Pressable
        onPress={onPress}
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: C.primary,
          alignItems: "center",
          justifyContent: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 24,
            fontWeight: "300",
            lineHeight: 24,
          }}
        >
          +
        </Text>
      </Pressable>
    </View>
  );
}

export default FloatingAddButton;

