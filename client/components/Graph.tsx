import Colors from "../constants/Colors";
import { View, Text } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import { MonoText } from "./StyledText";
import { useState } from "react";

interface TimeSeriesData {
  datetime: string;
  close: string;
}

interface GraphProps {
  timeSeries: TimeSeriesData[];
}

const Graph = ({ timeSeries }: GraphProps) => {
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();

  // Transform the time-series data into the required `GraphPoint` format
  const points: GraphPoint[] = timeSeries.map((data) => ({
    date: new Date(data.datetime),
    value: parseFloat(data.close),
  }));

  const onPointSelected = (point: GraphPoint) => {
    setSelectedPoint(point);
  };

  return (
    <View>
      {selectedPoint ? (
        <>
          <MonoText
            style={{ fontSize: 20, fontWeight: "bold", color: "#017560" }}
          >
            ${selectedPoint.value.toFixed(2)}
          </MonoText>
          <Text style={{ color: "gray" }}>
            {selectedPoint.date.toDateString()}
          </Text>
        </>
      ) : (
        <Text style={{ color: "gray" }}>Select a point on the graph</Text>
      )}

      <LineGraph
        style={{ width: "100%", height: 300 }}
        points={points}
        animated={true}
        color="#017560"
        gradientFillColors={["#0175605D", "#7476df00"]}
        enablePanGesture
        onPointSelected={onPointSelected}
        enableIndicator
        indicatorPulsating
        enableFadeInMask
      />
    </View>
  );
};

export default Graph;
