import { AntDesign } from "@expo/vector-icons";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { MonoText } from "./StyledText";
import { Link } from "expo-router";

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
  const changeColor = change > 0 ? "green" : change < 0 ? "red" : "black"; // Determine color based on value

  return (
    <Link href={`/details/${stock.symbol}` as const} asChild>
      <Pressable
        style={styles.container}
        onPress={() => console.log("Pressable pressed!")}
      >
        {/* Left side */}
        <View style={{ flex: 1, gap: 20 }}>
          <Text style={styles.symbol}>
            {stock.symbol}
            <AntDesign name="staro" size={18} color="gray" />
          </Text>
          <Text style={{ color: "gray" }}>{stock.name}</Text>
        </View>

        {/* Right side */}
        <View style={{ alignItems: "flex-end" }}>
          <MonoText>{Number.parseFloat(stock.close).toFixed(2)}</MonoText>
          <MonoText style={{ color: changeColor }}>
            {change.toFixed(1)}%{change > 0 ? " ▲" : change < 0 ? " ▼" : " ●"}
          </MonoText>
        </View>
      </Pressable>
    </Link>
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
