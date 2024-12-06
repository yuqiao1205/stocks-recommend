import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import axios from "axios";
// import StockListItem from "@/components/StockListItem";
import GraphLostStock from "@/components/GraphLostStock"; // Correct import
import DailyLoserListItem from "@/components/DailyLoserListItem";

interface Stock {
  change_percent: number;
  exchange: string;
  market_cap: number;
  name: string;
  regularMarketPreviousClose: number;
  symbol: string;
}

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch stock details
  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://stockshub.duckdns.org:5001/fin"
        );
        const dailyLosers: Stock[] = response.data.daily_losers;

        // Find the stock matching the symbol
        const foundStock = dailyLosers.find((stock) => stock.symbol === symbol);
        if (foundStock) {
          setStock(foundStock);
        } else {
          setError("Stock not found");
        }
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      fetchStockData();
    }
  }, [symbol]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading stock details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      {/* Stock Details */}
      {stock ? (
        <>
          <DailyLoserListItem stock={stock} />
          {/* Pass the symbol dynamically to the graph */}
          <GraphLostStock symbol={symbol as string} />
        </>
      ) : (
        <Text style={styles.errorText}>Stock not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: "#007bff",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
