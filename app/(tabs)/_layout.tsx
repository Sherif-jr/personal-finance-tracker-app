import { router, Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import FAB from "@/components/UI/FAB";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
      }}
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Summary",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "pie-chart" : "pie-chart-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transactionsList"
          options={{
            title: "Transactions",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "swap-horizontal" : "swap-horizontal-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="transaction"
          options={{
            title: "Transaction",
            href: null,
          }}
        />
      </Tabs>
      <FAB
        hideInPaths={["/transaction"]}
        onPress={() => {
          router.push("/transaction");
        }}
      >
        <Ionicons name="add" size={24} color="white" />
      </FAB>
    </SafeAreaView>
  );
}
