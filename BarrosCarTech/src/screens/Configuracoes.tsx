import React, { useState } from "react";
import { View, Alert, Switch } from "react-native";
import { List, Divider, Button } from "react-native-paper";
import { connectToOBD } from "../services/obdService";

interface Device {
  id: string;
}

export default function Configuracoes() {
  const [modoEscuro, setModoEscuro] = useState(false);

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

  return (
    <View style={{ flex: 1, padding: 10 }}>
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
          onPress={() => Alert.alert("Opção 'Interface' selecionada")}
        />

        <List.Item
          title="Unidades de Medida"
          description="Alterar unidades (km/h, mph, etc.)"
          left={(props) => <List.Icon {...props} icon="ruler" />}
          onPress={() => Alert.alert("Opção 'Unidades de Medida' selecionada")}
        />

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
