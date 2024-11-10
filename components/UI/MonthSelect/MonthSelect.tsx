import { StyleSheet, TouchableOpacity } from "react-native";
import { FC, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { MonthsNames } from "@/constants";
interface MonthSelectProps {
  onChangeMonth?: (monthIndex: number) => void;
  selectedMonth?: number;
  // monthIndex?: number;
}
const MonthSelect: FC<MonthSelectProps> = ({
  onChangeMonth,
  selectedMonth,
}) => {
  const currentMonth = new Date().getMonth();

  const pickerRef = useRef<Picker<any>>(null);
  return (
    <TouchableOpacity style={styles.container}>
      <Picker
        ref={pickerRef}
        style={{
          width: "100%",
        }}
        onValueChange={(val) => {
          onChangeMonth?.(val);
        }}
        selectedValue={selectedMonth || currentMonth}
      >
        {MonthsNames.map((month, index) => (
          <Picker.Item key={month} label={month} value={index} />
        ))}
      </Picker>
    </TouchableOpacity>
  );
};

export default MonthSelect;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
