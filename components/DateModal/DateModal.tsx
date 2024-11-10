import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { FC, useState } from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { DatePickerSingleProps } from "react-native-ui-datepicker/lib/typescript/src/DateTimePicker";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import Entypo from "@expo/vector-icons/Entypo";
import dayjs from "dayjs";

interface DateModalProps {
  visible?: boolean;
  onClose?: () => void;
  date?: string;
  onDateChange?: (date: string) => void;
  dateComponentProps?: DatePickerSingleProps;
}
const DateModal: FC<DateModalProps> = ({
  visible,
  onClose,
  date,
  onDateChange,
  dateComponentProps,
}) => {
  const textColor = useThemeColor({}, "cardText");

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.contentContainer}>
          <ThemedView style={styles.dateContainer}>
            <DateTimePicker
              mode="single"
              height={200}
              date={date}
              onChange={(params) =>
                onDateChange?.(dayjs(params.date).toISOString())
              }
              {...dateComponentProps}
              calendarTextStyle={{
                color: textColor,
              }}
              headerTextStyle={{
                color: textColor,
              }}
              weekDaysTextStyle={{
                color: textColor,
              }}
              buttonNextIcon={
                <Entypo name="chevron-right" size={24} color={textColor} />
              }
              buttonPrevIcon={
                <Entypo name="chevron-left" size={24} color={textColor} />
              }
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  paddingHorizontal: 30,
                  paddingVertical: 10,
                  borderRadius: 10,
                  backgroundColor: Colors.light.tint,
                }}
                onPress={onClose}
              >
                <ThemedText lightColor="#fff" style={{ fontSize: 12 }}>
                  Close
                </ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DateModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dateContainer: {
    maxWidth: "80%",
    maxHeight: 350,
    borderRadius: 10,
    gap: 10,
    padding: 20,
  },
});
