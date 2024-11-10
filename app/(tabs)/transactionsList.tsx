import { StyleSheet, FlatList, Alert, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import {
  Transaction,
  TransactionInput,
} from "@/interfaces/transaction.interface";
import TransactionCard from "@/components/TransactionCard";
import { useMemo, useState } from "react";
import useTransaction from "@/hooks/useTransaction";
import { router } from "expo-router";
import Select from "@/components/UI/Select";

export default function TabTwoScreen() {
  const [sortfield, setSortField] = useState<keyof TransactionInput>("date");
  const [selectedCategory, setSelectedCategory] = useState<string | "all">(
    "all"
  );
  const { sortedTransactions, deleteTransaction } = useTransaction({
    field: sortfield,
    order: "desc",
  });
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    sortedTransactions.forEach((transaction) => {
      categories.add(transaction.category);
    });
    return ["all", ...Array.from(categories)];
  }, [sortedTransactions]);

  const filteredTransactions = useMemo(() => {
    if (selectedCategory === "all") return sortedTransactions;
    return sortedTransactions.filter(
      (transaction) => transaction.category === selectedCategory
    );
  }, [sortedTransactions, selectedCategory]);

  const handleEditTransaction = (id: string) => {
    router.push({
      pathname: "/transaction",
      params: {
        id,
      },
    });
  };

  const handleDeleteTransaction = (id: string) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteTransaction(id);
          },
        },
      ]
    );
  };
  const sortableFields: (keyof TransactionInput)[] = ["date", "type", "amount"];
  return (
    <>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <ThemedText>Sort by:</ThemedText>
          <Select
            data={sortableFields}
            keyExtractor={(item) => item}
            labelExtractor={(item) => item}
            onSelect={setSortField}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ThemedText>Category:</ThemedText>
          <Select
            data={allCategories}
            keyExtractor={(item) => item}
            labelExtractor={(item) => item}
            onSelect={setSelectedCategory}
          />
        </View>
      </View>
      <FlatList<Transaction>
        data={filteredTransactions}
        renderItem={({ item: transaction, index }) => (
          <TransactionCard
            transaction={transaction}
            onEdit={() => handleEditTransaction(transaction.id)}
            onDelete={() => handleDeleteTransaction(transaction.id)}
          />
        )}
        keyExtractor={(transaction) => transaction.id}
        contentContainerStyle={{
          gap: 20,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
