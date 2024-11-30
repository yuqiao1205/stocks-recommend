import { AntDesign } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { MonoText } from "./StyledText";

type Stock = {
  name: string;
  close: string;
  symbol: string;
  percent_change: string;
};

type StockListItem = {
  stock: Stock;
};

export default function StockListItem({ stock }: { stock: Stock }) {
  const change = Number.parseFloat(stock.percent_change);
  return (
    <View style={styles.container}>
      {/*left side*/}
      <View style={{ flex: 1, gap: 20 }}>
        <Text style={styles.symbol}>
          {stock.symbol}
          <AntDesign name="staro" size={18} color="gray" />
        </Text>
        <Text style={{ color: "gray" }}>{stock.name}</Text>
      </View>
      {/*right side*/}
      <View style={{ alignItems: "flex-end" }}>
        <MonoText>{Number.parseFloat(stock.close).toFixed(2)}</MonoText>
        <MonoText style={{ color: change > 0 ? "green" : "red" }}>
          {change.toFixed(1)}%{change > 0 ? " ▲" : " ▼"}
        </MonoText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});
