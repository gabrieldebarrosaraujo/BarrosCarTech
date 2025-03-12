import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ProgressBar, MD3Colors } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons"; 

const performanceData = [
  { id: "throttle", label: "Abertura da Borboleta", value: 75, unit: "%" },
  { id: "rpm", label: "RPM do Veículo", value: 3200, unit: "RPM" },
  { id: "boost", label: "Pressão da Turbina", value: 1.2, unit: "bar" },
  { id: "oilTemp", label: "Temperatura do Óleo", value: 90, unit: "°C" },
  { id: "waterTemp", label: "Temperatura da Água", value: 85, unit: "°C" },
  { id: "lambda", label: "Sonda Lambda", value: 0.85, unit: "λ" },
];

const PerformanceScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desempenho do Veículo</Text>

      {performanceData.map((item) => (
        <View key={item.id} style={styles.card}>
          <FontAwesome5 name="tachometer-alt" size={20} color="#333" />
          <View style={styles.info}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>
              {item.value} {item.unit}
            </Text>
            {item.unit === "%" && (
              <ProgressBar progress={item.value / 100} color={MD3Colors.primary70} style={styles.progress} />
            )}
          </View>
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
  info: {
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    color: "#333",
  },
  progress: {
    height: 8,
    borderRadius: 4,
    marginTop: 5,
  },
});

export default PerformanceScreen;
