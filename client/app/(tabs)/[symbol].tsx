import { View, Text } from "@/components/Themed";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import top5 from "../../assets/dummy/top5.json";
import StockListItem from "@/components/StockListItem";

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();
  const stock = Object.values(top5).find((stock) => stock.symbol === symbol);
  return (
    <View>
      {stock ? <StockListItem stock={stock} /> : <Text>Stock not found</Text>}
    </View>
  );
}
