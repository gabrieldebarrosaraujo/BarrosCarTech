import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { List, Divider, Switch } from "react-native-paper";
import { connectToOBD } from "../services/obdService";

interface Device {
  id: string;
}

export default function Configuracoes() {
  const [modoEscuro, setModoEscuro] = useState(false);
  const [corFundo, setCorFundo] = useState<string>("white"); 
  const [mostrarCores, setMostrarCores] = useState(false); 


  const cores = [
    { id: "1", nome: "Branco", cor: "white" },
    { id: "2", nome: "Preto", cor: "black" },
    { id: "3", nome: "Azul", cor: "blue" },
    { id: "4", nome: "Verde", cor: "green" },
    { id: "5", nome: "Amarelo", cor: "yellow" },
    { id: "6", nome: "Vermelho", cor: "red" },
    { id: "7", nome: "Rosa", cor: "pink" },
    { id: "8", nome: "Cinza", cor: "gray" },
    { id: "9", nome: "Laranja", cor: "orange" },
    { id: "10", nome: "Roxo", cor: "purple" },
    { id: "11", nome: "Bege", cor: "beige" },
    { id: "12", nome: "Marrom", cor: "brown" },
    { id: "13", nome: "Ciano", cor: "cyan" },
    { id: "14", nome: "Lima", cor: "lime" },
    { id: "15", nome: "Indigo", cor: "indigo" },
    { id: "16", nome: "Turquesa", cor: "turquoise" },
    { id: "17", nome: "Azul Claro", cor: "lightblue" },
    { id: "18", nome: "Verde Claro", cor: "lightgreen" },
    { id: "19", nome: "Cinza Claro", cor: "lightgray" },
    { id: "20", nome: "Amarelo Claro", cor: "lightyellow" },
    { id: "21", nome: "Azul Escuro", cor: "darkblue" },
    { id: "22", nome: "Verde Escuro", cor: "darkgreen" },
    { id: "23", nome: "Marrom Escuro", cor: "darkbrown" },
    { id: "24", nome: "Preto Escuro", cor: "darkslategray" },
  ];

  async function conectar() {
    try {
      const device: Device = await connectToOBD();
      Alert.alert("Conectado ao OBD: " + device.id);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao conectar: " + error.message);
      } else {
        Alert.alert("Erro desconhecido ao conectar.");
      }
    }
  }

  const selecionarCor = (cor: string) => {
    setCorFundo(cor); 
    Alert.alert(`Cor de fundo alterada para ${cor}`);
  };

  const toggleCores = () => {
    setMostrarCores(!mostrarCores); 
  };

  return (
    <View style={[{ flex: 1, padding: 10 }, { backgroundColor: corFundo }]}>
      <List.Section>
        <List.Subheader>Configurações do Aplicativo</List.Subheader>

        <List.Item
          title="Carros"
          description="Gerencie seus veículos"
          left={(props) => <List.Icon {...props} icon="car" />}
          onPress={() => Alert.alert("Opção 'Carros' selecionada")}
        />

        <List.Item
          title="Aparelho Bluetooth"
          description="Dispositivo conectado"
          left={(props) => <List.Icon {...props} icon="bluetooth" />}
          onPress={conectar}
        />

        <List.Item
          title="Interface"
          description="Ajustes visuais"
          left={(props) => <List.Icon {...props} icon="palette" />}
          onPress={toggleCores} 
        />

        <Divider />

        
        {mostrarCores && (
          <>
            <Text style={styles.sectionTitle}>Selecione a Cor de Fundo:</Text>
            <FlatList
              data={cores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selecionarCor(item.cor)} style={styles.colorItem}>
                  <View
                    style={[styles.colorBox, { backgroundColor: item.cor }]}
                  />
                  <Text style={styles.colorName}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          </>
        )}

        <Divider />

        <List.Item
          title="Modo Escuro"
          description={modoEscuro ? "Ativado" : "Desativado"}
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch value={modoEscuro} onValueChange={setModoEscuro} />
          )}
        />

        <Divider />

        <List.Item
          title="Avaliar App"
          description="Deixe sua opinião na loja"
          left={(props) => <List.Icon {...props} icon="star" />}
          onPress={() => Alert.alert("Opção 'Avaliar App' selecionada")}
        />

        <List.Item
          title="Informações do App"
          description="Versão, desenvolvedor e termos"
          left={(props) => <List.Icon {...props} icon="information" />}
          onPress={() => Alert.alert("Opção 'Informações do App' selecionada")}
        />

        <List.Item
          title="Contatar Desenvolvedor"
          description="Suporte ou sugestões"
          left={(props) => <List.Icon {...props} icon="email" />}
          onPress={() => Alert.alert("Opção 'Contatar Desenvolvedor' selecionada")}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  colorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  colorName: {
    fontSize: 16,
  },
});
