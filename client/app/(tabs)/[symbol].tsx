import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import top5 from "../../assets/dummy/top5.json";
import StockListItem from "@/components/StockListItem";

export default function StockDetails() {
  const { symbol } = useLocalSearchParams();
  const router = useRouter(); // Use router for navigation
  const stock = Object.values(top5).find((stock) => stock.symbol === symbol);

  return (
    <View style={styles.container}>
      {/* Custom Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      {/* Stock Details */}
      {stock ? <StockListItem stock={stock} /> : <Text>Stock not found</Text>}
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
});
