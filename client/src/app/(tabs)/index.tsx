import {
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";
import { useState } from "react";

import top5 from "../../../assets/dummy/top5.json";
import StockListItem from "@/components/StockListItem";
import GraphLostStock from "@/components/GraphLostStock"; // Import the graph component

export default function TabOneScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<string | null>(null); // State for selected stock symbol
  const [loadingSearch, setLoadingSearch] = useState(false);

  const stocks = Object.values(top5);

  // Filter stocks based on the search term
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search submission
  const handleSearch = (term: string) => {
    setLoadingSearch(true);
    setSearchTerm(term);
    setSelectedStock(term.toUpperCase()); // Update selected stock symbol
    setLoadingSearch(false);
  };

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ title: "Stocks" }} />
      <TextInput
        style={styles.searchBar}
        placeholder="Search stocks..."
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={() => handleSearch(searchTerm.trim())} // Trigger search on Enter
      />
      <Text style={styles.title}>Stocks List</Text>

      {loadingSearch && <ActivityIndicator size="large" color="blue" />}

      {/* Display the graph for the selected stock */}
      {selectedStock && (
        <View style={styles.graphContainer}>
          <GraphLostStock symbol={selectedStock} />
        </View>
      )}

      {/* Display the stock list */}
      <FlatList
        data={filteredStocks}
        renderItem={({ item }) => (
          <StockListItem
            stock={item}
            onPress={() => setSelectedStock(item.symbol)} // Set selected stock when a stock is clicked
          />
        )}
        contentContainerStyle={{ gap: 20, padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
    color: "orange",
  },
  searchBar: {
    height: 40,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "#333",
    backgroundColor: "#fff",
  },
  graphContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
