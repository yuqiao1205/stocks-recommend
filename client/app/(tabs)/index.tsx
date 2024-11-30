import { StyleSheet, FlatList } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Stack } from "expo-router";

import top5 from "../../assets/dummy/top5.json";
import StockListItem from "@/components/StockListItem";

export default function TabOneScreen() {
  const stocks = Object.values(top5);
  return (
    <View style={styles.container}>
      <Stack screenOptions={{ title: "Stocks" }} />
      <FlatList
        data={stocks}
        renderItem={({ item }) => <StockListItem stock={item} />}
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
  },
});
