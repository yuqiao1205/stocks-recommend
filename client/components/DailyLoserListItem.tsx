import { AntDesign } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { MonoText } from "./StyledText";

type Stock = {
  name: string;
  symbol: string;
  change_percent: number;
  market_cap: number;
};

type DailyLoserStockListItem = {
  stock: Stock;
};

export default function DailyLoserListItem({ stock }: DailyLoserStockListItem) {
  const change = stock.change_percent;

  return (
    <View style={styles.container}>
      {/* Left side */}
      <View style={{ flex: 1, gap: 10 }}>
        <Text style={styles.symbol}>
          {stock.symbol}
          <AntDesign name="staro" size={18} color="gray" />
        </Text>
        <Text style={{ color: "gray" }}>{stock.name}</Text>
      </View>

      {/* Right side */}
      <View style={{ alignItems: "flex-end" }}>
        <MonoText style={{ fontSize: 16 }}>
          Market Cap: ${stock.market_cap.toFixed(2)}B
        </MonoText>
        <MonoText style={{ color: change > 0 ? "green" : "red", fontSize: 16 }}>
          {change.toFixed(2)}%{change > 0 ? " ▲" : " ▼"}
        </MonoText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
});
