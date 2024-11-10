import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import React, { FC } from "react";
import { Transaction } from "@/interfaces/transaction.interface";
import { ThemedView } from "../ThemedView";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ThemedText";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface TransactionCardProps extends ViewProps {
  transaction: Transaction;
  onEdit?: () => void;
  onDelete?: () => void;
}

const TransactionCard: FC<TransactionCardProps> = ({
  transaction,
  onEdit,
  onDelete,
  ...OtherViewProps
}) => {
  return (
    <ThemedView
      darkColor={Colors.dark.cardBackground}
      lightColor={Colors.light.cardBackground}
      style={[
        styles.cardContainer,
        {
          borderTopColor: `${
            transaction.type === "income"
              ? Colors.chart.income
              : Colors.chart.expense
          }75`,
          borderTopWidth: 2,
        },
        OtherViewProps.style,
      ]}
      {...OtherViewProps}
    >
      <View>
        <ThemedText
          type="defaultSemiBold"
          style={{
            fontSize: 16,
            color:
              transaction.type === "income"
                ? Colors.chart.income
                : Colors.chart.expense,
          }}
        >
          {transaction.amount}
        </ThemedText>
        <ThemedText
          type="default"
          style={{
            fontSize: 12,
          }}
        >
          {new Date(transaction.date).toLocaleString()}
        </ThemedText>
        <ThemedText
          type="default"
          style={{
            fontSize: 12,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {transaction.description}
        </ThemedText>
        <View
          style={{
            backgroundColor: Colors.light.tint,
            borderRadius: 10,
            padding: 5,
            marginTop: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {transaction.category}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 20,
        }}
      >
        <TouchableOpacity onPress={onEdit}>
          <Feather name="edit-2" size={24} color="#00AAFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <MaterialCommunityIcons name="delete" size={24} color="#FF7000" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
});
