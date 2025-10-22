import { Text, View } from "react-native";
import { useTheme } from "../../context/theme-context";

export function BatchSectionHeader() {
  const { colors } = useTheme();
  return (
    <View style={{ paddingHorizontal: 4, paddingBottom: 8 }}>
      <Text style={{ color: colors.textHigh, fontWeight: "800" }}>Lô hàng</Text>
    </View>
  );
}

export default BatchSectionHeader;
