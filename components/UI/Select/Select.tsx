import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { capitalize } from "@/helpers/utils";
interface SelectProps<T> {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  labelExtractor: (item: T, index: number) => string;
  onSelect?: (item: T) => void;
}
const Select = <T,>({
  data,
  keyExtractor,
  labelExtractor,

  onSelect,
}: SelectProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | undefined>();
  const pickerRef = useRef<Picker<any>>(null);
  return (
    <TouchableOpacity style={styles.container}>
      <Picker
        ref={pickerRef}
        style={{
          width: "100%",
        }}
        onValueChange={(val) => {
          setSelectedItem(val);
          if (onSelect) {
            onSelect(val);
          }
        }}
        selectedValue={selectedItem}
      >
        {data.map((item, index) => (
          <Picker.Item
            key={keyExtractor(item, index)}
            label={capitalize(labelExtractor(item, index))}
            value={item}
            style={{
              textTransform: "capitalize",
            }}
          />
        ))}
      </Picker>
    </TouchableOpacity>
  );
};

export default Select;

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
