import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { Stack } from "expo-router";
import GraphLostStock from "@/components/GraphLostStock";

export default function StockDetailScreen({ route }: { route: any }) {
  const { symbol } = route.params;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `${symbol} Details` }} />
      <Text style={styles.title}>{symbol} Stock Details</Text>
      <GraphLostStock symbol={symbol} />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>
          Displaying the time-series graph for {symbol}.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "orange",
  },
  detailsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
