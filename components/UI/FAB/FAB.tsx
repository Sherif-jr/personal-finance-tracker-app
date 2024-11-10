import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { FC } from "react";
import { Colors } from "@/constants/Colors";
import { Href, usePathname } from "expo-router";
interface FABProps extends ViewProps {
  onPress?: () => void;
  color?: string;
  hideInPaths?: Href<string>[];
}
const FAB: FC<FABProps> = ({ color, children, onPress, hideInPaths }) => {
  const pathName = usePathname();
  if (hideInPaths && hideInPaths.includes(pathName as Href<string>)) {
    return null;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: color ? color : Colors.light.tint,
        },
      ]}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 50,
    right: 0,
    margin: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
