import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FC } from "react";
import { Colors } from "@/constants/Colors";
import { Transaction } from "@/interfaces/transaction.interface";
interface TrxTypeSelectProps {
  type: Transaction["type"];
  onChange?: (type: Transaction["type"]) => void;
}
const TrxTypeSelect: FC<TrxTypeSelectProps> = ({ type, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => {
            onChange?.("expense");
          }}
        >
          <View
            style={[
              styles.option,
              {
                backgroundColor: Colors.chart.expense,
                borderWidth: type === "expense" ? 3 : 0,
                transform: [
                  {
                    scale: type === "expense" ? 1.1 : 1,
                  },
                ],
              },
            ]}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: type === "expense" ? "bold" : "400",
              }}
            >
              Expense
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => {
            onChange?.("income");
          }}
        >
          <View
            style={[
              styles.option,
              {
                backgroundColor: Colors.chart.income,
                borderWidth: type === "income" ? 3 : 0,
                transform: [
                  {
                    scale: type === "income" ? 1.1 : 1,
                  },
                ],
              },
            ]}
          >
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontWeight: type === "income" ? "bold" : "400",
              }}
            >
              Income
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TrxTypeSelect;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  optionContainer: {
    flexBasis: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  option: {
    padding: 10,
    borderRadius: 10,
    width: 120,
    borderColor: "#CCC",
  },
});
