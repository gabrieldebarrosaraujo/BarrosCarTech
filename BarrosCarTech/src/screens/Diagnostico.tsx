import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 

const dtcErrors = [
  { id: "P0135", description: "Erro na sonda lambda", icon: "error-outline" },
  { id: "B2502", description: "Farol queimado", icon: "lightbulb-outline" },
  { id: "P0101", description: "Erro no sensor MAF", icon: "air" },
  { id: "C1234", description: "Pneu com baixa pressão", icon: "report" },
  { id: "B1235", description: "Capô aberto", icon: "car-repair" },
];

const DiagnosticoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erros DTC Detectados</Text>

      <FlatList
        data={dtcErrors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.errorItem}>
            <MaterialIcons name={item.icon as any} size={24} color="red" />
            <Text style={styles.errorText}>{item.id} - {item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  errorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  errorText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "500",
  },
});

export default DiagnosticoScreen;
