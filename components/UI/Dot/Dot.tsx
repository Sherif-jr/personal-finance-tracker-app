import { View } from "react-native";
import { FC } from "react";

export interface DotProps {
  color?: string;
  size?: number;
}
const Dot: FC<DotProps> = ({ color = "black", size = 10 }) => {
  return (
    <View
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
        backgroundColor: color,
      }}
    />
  );
};

export default Dot;
