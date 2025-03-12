import React, { useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { TabParamList } from "../navigation/AppNavigation";

type Props = BottomTabScreenProps<TabParamList, "Home">;

const brands = [
  { name: "Toyota", image: require("../../assets/brands/toyota.png"), models: ["Corolla", "Hilux", "Yaris", "Etios", "SW4"] },
  { name: "Nissan", image: require("../../assets/brands/nissan.png"), models: ["Kicks", "Versa", "Sentra", "Frontier", "March"] },
  { name: "Volkswagen", image: require("../../assets/brands/volkswagen.png"), models: ["Gol", "Polo", "Virtus", "T-Cross", "Nivus"] },
  { name: "Fiat", image: require("../../assets/brands/fiat.png"), models: ["Uno", "Argo", "Mobi", "Toro", "Strada"] },
  { name: "Chevrolet", image: require("../../assets/brands/chevrolet.png"), models: ["Onix", "Tracker", "S10", "Cruze", "Spin"] },
];

export default function Home({ navigation }: Props) {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o veículo</Text>

      {/* Lista de Marcas */}
      <FlatList
        data={brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.brandBox} onPress={() => handleSelectBrand(item.name)}>
            <Image source={item.image} style={styles.brandImage} />
            <Text style={styles.brandText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Lista de Modelos */}
      {selectedBrand && (
        <View style={styles.modelContainer}>
          <Text style={styles.modelTitle}>Modelos de {selectedBrand}</Text>
          <FlatList
            data={brands.find((brand) => brand.name === selectedBrand)?.models || []}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.modelBox}>
                <Text style={styles.modelText}>{item}</Text>
              </View>
            )}
          />
        </View>
      )}

      <Button title="LER OBD2 VEICULO" onPress={() => navigation.navigate("Diagnóstico")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  brandBox: {
    alignItems: "center",
    padding: 10,
    marginRight: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  brandText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  modelContainer: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
  },
  modelTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modelBox: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  modelText: {
    fontSize: 16,
  },
});

