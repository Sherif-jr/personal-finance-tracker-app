import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/components/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import useTransaction from "@/hooks/useTransaction";
import { Form, FormInput } from "@/components/Form";
import { TransactionInput } from "@/interfaces/transaction.interface";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import DateModal from "@/components/DateModal";
import Card from "@/components/Card";
import TrxTypeSelect from "@/components/TrxTypeSelect";
import { fixNumericalFields } from "@/helpers/utils";

const transaction = () => {
  const { id } = useLocalSearchParams();
  const { getTransaction, createTransaction, updateTransaction } =
    useTransaction();
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const transaction = id ? getTransaction(id as string) : undefined;

  return (
    <>
      <Form<TransactionInput>
        key={id?.toString() || Math.random()} //force rerender to avoid wrong initial data
        initialValues={{
          amount: transaction?.amount || 0,
          description: transaction?.description || "",
          date: transaction?.date || new Date().toISOString(),
          type: transaction?.type || "expense",
          category: transaction?.category || "",
        }}
        onSubmit={(values) => {
          if (transaction) {
            updateTransaction({
              ...fixNumericalFields(values, ["amount"]),
              id: transaction.id,
            });
          } else {
            createTransaction(fixNumericalFields(values, ["amount"]));
          }
          router.push("/transactionsList");
        }}
        validate={{
          amount: (value) => {
            if (!value) {
              return "Amount is required";
            }
            if (Number.isNaN(Number(value))) {
              return "Amount must be a number";
            }
            if (Number(value) < 0) {
              return "Amount must be positive";
            }
          },
          description: (value) => {
            if (!value) {
              return "Description is required";
            }
          },
          date: (value) => {
            if (!value) {
              return "Date is required";
            }
          },
          type: (value) => {
            if (!value) {
              return "Type is required";
            }
          },
          category: (value) => {
            if (!value) {
              return "Category is required";
            }
          },
        }}
      >
        {({ values, handleChange, handleSubmit, touched, errors }) => (
          <>
            <DateModal
              visible={dateModalVisible}
              date={values.date}
              onDateChange={handleChange("date")}
              onClose={() => setDateModalVisible(false)}
            />
            <ThemedView style={styles.pageTitleContianer}>
              <ThemedText type="subtitle">
                {transaction ? "Edit" : "Add"} Transaction
              </ThemedText>
            </ThemedView>
            <ScrollView>
              <View
                style={{
                  flexGrow: 1,
                  paddingHorizontal: 20,
                  paddingBottom: 20,
                  gap: 20,
                }}
              >
                <ThemedText type="subtitle">Transaction Details</ThemedText>
                <ThemedText type="default">Amount</ThemedText>
                <FormInput
                  placeholder="Amount"
                  onChangeText={handleChange("amount")}
                  value={values.amount.toString()}
                  error={
                    touched.amount && errors.amount ? errors.amount : undefined
                  }
                  keyboardType="number-pad"
                />
                <ThemedText type="default">Description</ThemedText>
                <FormInput
                  placeholder="Description"
                  onChangeText={handleChange("description")}
                  value={values.description}
                  error={
                    touched.description && errors.description
                      ? errors.description
                      : undefined
                  }
                />
                <ThemedText type="default">Date</ThemedText>
                <TouchableOpacity
                  onPress={() => {
                    setDateModalVisible(true);
                  }}
                >
                  <Card>
                    <ThemedText>
                      {new Date(values.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </ThemedText>
                  </Card>
                </TouchableOpacity>
                <ThemedText type="default">Type</ThemedText>
                <TrxTypeSelect
                  type={values.type}
                  onChange={handleChange("type")}
                />
                <ThemedText type="default">Category</ThemedText>
                <FormInput
                  placeholder="Category"
                  onChangeText={handleChange("category")}
                  value={values.category}
                  error={
                    touched.category && errors.category
                      ? errors.category
                      : undefined
                  }
                />
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={{
                    backgroundColor: Colors.light.tint,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                  onPress={handleSubmit}
                >
                  <ThemedText
                    type="subtitle"
                    darkColor="#fffƒ"
                    style={{ textAlign: "center" }}
                  >
                    {transaction ? "Edit" : "Add"} Transaction
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        )}
      </Form>
    </>
  );
};

export default transaction;

const styles = StyleSheet.create({
  pageTitleContianer: {
    padding: 20,
    elevation: 2,
    marginBottom: 20,
  },
});
