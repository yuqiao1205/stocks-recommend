import { View, Text } from "./Themed";
import { LineGraph } from "react-native-graph";
import Colors from "../constants/Colors";

const Graph = () => {
  return (
    <View>
      <Text>Graph</Text>
      <LineGraph points={[]} animated={false} color={Colors.light.tint} />
    </View>
  );
};
export default Graph;
