import { StyleSheet, useColorScheme } from "react-native";
import Colors from "./Colors";

export function useDefaultStyles() {
  const scheme = useColorScheme();
  const C = scheme === "dark" ? Colors.Dark : Colors.Light;
  return StyleSheet.create({
    btn: {
      backgroundColor: C.primary,
      height: 62,
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
    btnOutline: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: C.grey,
      height: 62,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    inputField: {
      height: 58,
      borderWidth: 1,
      borderColor: "#ABABAB",
      borderRadius: 8,
      padding: 10,
      backgroundColor: "#fff",
    },
    card: {
      borderRadius: 18,
      backgroundColor: C.card,
    },
    shadow: {
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.12,
      shadowRadius: 8,
      shadowOffset: { width: 1, height: 1 },
    },
    shadowStrong: {
      elevation: 4,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: { width: 2, height: 2 },
    },
  });
}
