import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { PieChart } from "react-native-gifted-charts";
import Legend from "@/components/UI/Legend";
import Card from "@/components/Card";
import MonthSelect from "@/components/UI/MonthSelect";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/constants/Colors";
import useTransaction from "@/hooks/useTransaction";
import { useMemo, useState } from "react";
import { IChartItem } from "@/interfaces/chart.interface";
import { Link } from "expo-router";

export default function SummaryView() {
  const chartBackgroundColor = useThemeColor({}, "cardBackground");
  const { transactions } = useTransaction();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const chartData: IChartItem[] = useMemo(() => {
    const expense = transactions.filter(
      (t) =>
        t.type === "expense" && new Date(t.date).getMonth() === selectedMonth
    );
    const income = transactions.filter(
      (t) =>
        t.type === "income" && new Date(t.date).getMonth() === selectedMonth
    );

    const expenseTotal = expense.reduce((acc, t) => acc + t.amount, 0);
    const incomeTotal = income.reduce((acc, t) => acc + t.amount, 0);
    return [
      {
        key: "expenses",
        color: Colors.chart.expense,
        label: "Expenses",
        value: expenseTotal,
      },
      {
        key: "income",
        color: Colors.chart.income,
        label: "Income",
        value: incomeTotal,
      },
    ];
  }, [transactions, selectedMonth]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card>
          <View style={styles.pieContainer}>
            <ThemedText type="subtitle">Monthly Summary</ThemedText>
            <MonthSelect
              selectedMonth={selectedMonth}
              onChangeMonth={(month) => setSelectedMonth(month)}
            />
            {chartData.every((item) => item.value === 0) && (
              <View
                style={{
                  paddingVertical: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ThemedText type="subtitle">No transactions found</ThemedText>
                <ThemedText type="link">
                  <Link href="/(tabs)/transactionsList">Add transactions</Link>
                </ThemedText>
              </View>
            )}
            <PieChart
              donut
              showText
              innerCircleBorderWidth={6}
              innerCircleBorderColor="lightgray"
              textColor="black"
              radius={100}
              textSize={20}
              showGradient
              isAnimated
              animationDuration={5000}
              focusOnPress
              backgroundColor={chartBackgroundColor}
              data={chartData}
            />
          </View>
          <View style={styles.legendContainer}>
            <Legend
              data={chartData}
              numOfColumns={2}
              flatListProps={{
                scrollEnabled: false,
                style: {
                  backgroundColor: "green",
                },
              }}
            />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20,
  },
  pieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 20,
  },
  legendContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});
