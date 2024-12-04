import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Text,
} from "react-native";
import { View } from "@/components/Themed";
import { Stack } from "expo-router";
// import { BACKEND_URL } from "@env"; // Uncomment this if using environment variables

import DailyLoserListItem from "@/components/DailyLoserListItem";

export default function TabTwoScreen() {
  const [stocks, setStocks] = useState([]); // Removed generics here
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://stockshub.duckdns.org:5001/fin"); // Adjust if hosted remotely
        const response = await fetch(
          "https://stocks-backend-flask.vercel.app/fin"
        );

        // Adjust if hosted remotely
        // const response = await fetch(`${BACKEND_URL}/fin`); // Adjust if hosted remotely
        const data = await response.json();
        setStocks(data.daily_losers);
      } catch (error) {
        console.error("Error fetching daily losers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ title: "Stocks" }} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Recommend Stock TO Buy Now</Text>
        {stocks.map((stock, index) => (
          <DailyLoserListItem key={index} stock={stock} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 20,
    gap: 20, // Space between items
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});
