import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import { FC, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
interface FormInputProps extends TextInputProps {
  containerProps?: ViewProps;
  inputWrapperProps?: ViewProps;
  error?: string;
  password?: boolean;
}
const FormInput: FC<FormInputProps> = ({
  password,
  error,
  containerProps,
  inputWrapperProps,
  ...props
}) => {
  const backgroundColor = useThemeColor({}, "cardBackground");
  const borderColor = useThemeColor({}, "cardBorder");
  const textColor = useThemeColor({}, "cardText");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={[styles.inputContainer, containerProps]}>
      <View
        style={[
          styles.input,
          {
            backgroundColor,
            borderColor: error ? "red" : borderColor,
          },
          inputWrapperProps,
        ]}
      >
        <TextInput
          {...props}
          style={[
            {
              flexGrow: 1,
              paddingHorizontal: 20,
              color: textColor,
            },
            props.style,
          ]}
          placeholderTextColor={`${textColor}60`}
          secureTextEntry={password && showPassword}
        />
        {password && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              setShowPassword(!showPassword);
            }}
            style={styles.toggleButton}
          >
            <MaterialCommunityIcons
              name={!showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  input: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 3,
    paddingStart: 10,
  },
  toggleButton: {
    padding: 8,
    marginEnd: 10,
  },
});
