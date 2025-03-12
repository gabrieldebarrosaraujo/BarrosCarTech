import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const accelerationData = [
  { id: "0-100", label: "0 a 100 km/h", time: 10.5 },
  { id: "100-200", label: "100 a 200 km/h", time: 14.0 },
  { id: "200-300", label: "200 a 300 km/h", time: 0 }, 
  { id: "0-200", label: "0 a 200 km/h", time: 24.5 },
  { id: "0-300", label: "0 a 300 km/h", time: 0 },
  { id: "100-300", label: "100 a 300 km/h", time: 0 }, 
];

const SensoresScreen: React.FC = () => {
  const [sensorReadings, setSensorReadings] = useState(accelerationData);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorReadings((prevReadings) =>
        prevReadings.map((item) => ({
          ...item,
          time: item.time > 0 ? parseFloat((item.time + (Math.random() * 0.2 - 0.1)).toFixed(2)) : 0, 
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leituras de Aceleração</Text>
      {sensorReadings.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.time > 0 ? `${item.time} s` : "N/A"}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
});

export default SensoresScreen;
