import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { LineGraph } from "react-native-graph";

export default function SearchStock() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStockData = async (symbol: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://stockshub.duckdns.org:5001/timeseries/${symbol}`
      );
      setStockData(response.data);
    } catch (err) {
      setError("Stock data not found. Please check the symbol.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchStockData(searchTerm.trim().toUpperCase());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Enter stock symbol (e.g., AMD)"
        placeholderTextColor="#888"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={handleSearch} // Trigger search on Enter key
      />
      {loading && <ActivityIndicator size="large" color="blue" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {stockData && (
        <View style={styles.resultContainer}>
          <Text style={styles.stockTitle}>Stock: {stockData.symbol}</Text>
          <LineGraph
            style={styles.graph}
            points={stockData.timeseries.map((point: any) => ({
              x: new Date(point.timestamp).getTime(),
              y: point.value,
            }))}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
  resultContainer: {
    marginTop: 20,
  },
  stockTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  graph: {
    height: 200,
  },
});
