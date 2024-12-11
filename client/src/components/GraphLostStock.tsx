import Colors from "../constants/Colors";
import { View, Text } from "./Themed";
import { LineGraph, GraphPoint } from "react-native-graph";
import { MonoText } from "./StyledText";
import { useState, useEffect } from "react";
import axios from "axios";

interface TimeSeriesData {
  date: string;
  close: string;
  //   close: string;
  //   open: string;
  //   high: string;
  //   low: string;
}

interface GraphProps {
  symbol: string;
}

const GraphLostStock = ({ symbol }: GraphProps) => {
  const [timeSeries, setTimeSeries] = useState<TimeSeriesData[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch time series data from the API
  useEffect(() => {
    const fetchTimeSeries = async () => {
      setLoading(true);
      setError(null);
      try {
        // const response = await axios.get(
        //   `https://stocks-backend-flask.vercel.app/timeseries/${symbol}` // Use the dynamic symbol
        // );
        const response = await axios.get(
          `http://stockshub.duckdns.org:5001/timeseries/${symbol}` // Use the dynamic symbol localhost
        );
        setTimeSeries(response.data.data); // Assuming API response directly provides the array
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimeSeries();
  }, [symbol]); // Re-fetch data if the symbol changes

  // Transform the time-series data into the required `GraphPoint` format
  const points: GraphPoint[] = timeSeries.map((data) => ({
    // "date":"2024-12-06" (parse as Date)
    date: new Date(data.date),
    value: parseFloat(data.close),
    // x: parseFloat(data.close),
    //value3: parseFloat(data.high),
    //value4: parseFloat(data.low),
  }));

  console.log(points);

  const onPointSelected = (point: GraphPoint) => {
    setSelectedPoint(point);
  };

  if (loading) {
    return <Text>Loading data...</Text>;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

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
        animated={false}
        color="#017560"
        gradientFillColors={["#0175605D", "#7476df00"]}
        // enablePanGesture
        // onPointSelected={onPointSelected}
        // enableIndicator
        // indicatorPulsating
        enableFadeInMask
      />
    </View>
  );
};

export default GraphLostStock;
