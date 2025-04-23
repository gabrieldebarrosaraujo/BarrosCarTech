import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";

const initialData = [
  { id: "rpm", label: "RPM", value: 3200, unit: "RPM" },
  { id: "throttle", label: "Borboleta", value: 75, unit: "%" },
  { id: "boost", label: "Boost", value: 1.2, unit: "bar" },
  { id: "waterTemp", label: "Água", value: 90, unit: "°C" },
  { id: "oilTemp", label: "Óleo", value: 85, unit: "°C" },
  { id: "lambda", label: "Lambda", value: 0.85, unit: "λ" },
];

const PerformanceScreen: React.FC = () => {
  const [params, setParams] = useState(
    initialData.map((item) => ({
      ...item,
      mode: "digital", // ou "analog"
      theme: "light",  // ou "dark"
    }))
  );

  const toggleMode = (id: string) => {
    setParams((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextTheme = item.theme === "light" ? "dark" : "light";
          const nextMode = item.mode === "digital" ? "analog" : "digital";
          return { ...item, theme: nextTheme, mode: nextMode };
        }
        return item;
      })
    );
  };

  const renderGauge = (item: typeof params[0]) => {
    const needleAngle = (item.value / 100) * 180 - 90;
    const themeStyles = item.theme === "dark" ? styles.dark : styles.light;

    return (
      <TouchableOpacity style={[styles.block, themeStyles]} onPress={() => toggleMode(item.id)}>
        <Text style={styles.label}>{item.label}</Text>
        {item.mode === "digital" ? (
          <Text style={styles.value}>{item.value} {item.unit}</Text>
        ) : (
          <Svg height="100" width="100">
            <Circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="4" fill="none" />
            <Line
              x1="50"
              y1="50"
              x2={50 + 40 * Math.cos((needleAngle * Math.PI) / 180)}
              y2={50 + 40 * Math.sin((needleAngle * Math.PI) / 180)}
              stroke="red"
              strokeWidth="3"
            />
          </Svg>
        )}
        <Text style={styles.unit}>{item.unit}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={params}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => renderGauge(item)}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#eee",
  },
  block: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
  },
  unit: {
    marginTop: 6,
    fontSize: 14,
  },
  light: {
    backgroundColor: "#fff",
  },
  dark: {
    backgroundColor: "#1c1c1e",
  },
});

export default PerformanceScreen;
