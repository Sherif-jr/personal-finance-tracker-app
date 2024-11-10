import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC } from "react";
import Dot, { DotProps } from "../Dot";
import { ThemedText } from "@/components/ThemedText";
interface LegendItem {
  key: string;
  color: string;
  label: string;
  value: number;
}
interface LegendProps {
  data: LegendItem[];
  numOfColumns?: number;
  dotProps?: DotProps;
  flatListProps?: Omit<
    FlatListProps<LegendItem>,
    "data" | "renderItem" | "numColumns" | "keyExtractor"
  >;
}
const Legend: FC<LegendProps> = ({
  data,
  numOfColumns = 1,
  dotProps,
  flatListProps,
}) => {
  const renderLegendItem: ListRenderItem<LegendItem> = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Dot {...dotProps} color={item.color} />

        <ThemedText style={{ flexGrow: 1 }}>
          {item.label} {item.value}
        </ThemedText>
      </View>
    );
  };
  return (
    <FlatList
      {...flatListProps}
      data={data}
      numColumns={numOfColumns}
      keyExtractor={({ key }) => key}
      renderItem={renderLegendItem}
      style={{
        width: "100%",
      }}
    />
  );
};

export default Legend;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    flexGrow: 1,
  },
});
