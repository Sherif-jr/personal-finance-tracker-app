import { StyleSheet, View, ViewProps } from "react-native";
import { FC } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

interface CardProps extends ViewProps {
  borderRadius?: number;
  variant?: "outlined" | "solid";
}

const Card: FC<CardProps> = ({
  borderRadius = 10,
  variant = "solid",
  style,
  ...props
}) => {
  const backgroundColor = useThemeColor(
    {
      light: "",
      dark: "",
    },
    "cardBackground"
  );
  const borderColor = useThemeColor(
    {
      light: "",
      dark: "",
    },
    "cardBorder"
  );

  return (
    <View
      style={[
        styles.card,
        {
          borderRadius,
          backgroundColor:
            variant === "solid" ? backgroundColor : "transparent",
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor,
        },
        style,
      ]}
      {...props}
    />
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#CCC",
    padding: 10,
    borderRadius: 10,
  },
});
