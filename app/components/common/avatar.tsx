import { Image, View } from "react-native";

export interface AvatarProps {
  size?: number;
  uri?: string;
}

export function Avatar({ size = 36, uri }: AvatarProps) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#3B3E54",
        backgroundColor: "#232738",
      }}
    >
      {uri ? <Image source={{ uri }} style={{ width: "100%", height: "100%" }} /> : null}
    </View>
  );
}

export default Avatar;
