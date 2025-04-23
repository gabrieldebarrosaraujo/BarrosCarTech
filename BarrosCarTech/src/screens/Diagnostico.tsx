import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

// Props para receber o device já conectado
interface DiagnosticoScreenProps {
  device: Device;
}

const DiagnosticoScreen: React.FC<DiagnosticoScreenProps> = ({ device }) => {
  const [dtcErrors, setDtcErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const serviceUUID = "0000fff0-0000-1000-8000-00805f9b34fb";
  const characteristicUUID = "0000fff1-0000-1000-8000-00805f9b34fb";

  const decodeDTC = (raw: string): string[] => {
    const cleaned = raw.replace(/\s/g, "").substring(4);
    const codes = [];

    for (let i = 0; i < cleaned.length; i += 4) {
      const chunk = cleaned.substring(i, i + 4);
      if (chunk.length === 4) {
        const firstChar = parseInt(chunk[0], 16);
        const dtcType = ["P", "C", "B", "U"][(firstChar & 0b1100) >> 2];
        const dtc = dtcType + ((firstChar & 0b0011).toString()) + chunk.substring(1);
        codes.push(dtc);
      }
    }

    return codes;
  };

  const sendCommand = async (command: string) => {
    const base64 = Buffer.from(command).toString("base64");
    await device.writeCharacteristicWithResponseForService(serviceUUID, characteristicUUID, base64);
  };

  const readErrors = async () => {
    try {
      setLoading(true);
      await sendCommand("03\r");

      const response = await device.readCharacteristicForService(serviceUUID, characteristicUUID);
      const rawData = Buffer.from(response.value!, "base64").toString("utf8");

      const codes = decodeDTC(rawData);
      const descriptions = codes.map((code) => ({
        id: code,
        description: "Código detectado",
        icon: "error-outline",
      }));

      setDtcErrors(descriptions);
    } catch (err) {
      Alert.alert("Erro", "Falha ao ler os códigos DTC");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearErrors = async () => {
    try {
      setLoading(true);
      await sendCommand("04\r");
      setDtcErrors([]);
      Alert.alert("Sucesso", "Erros apagados e luz da injeção desligada");
    } catch (err) {
      Alert.alert("Erro", "Falha ao apagar os códigos DTC");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Erros DTC Detectados</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={readErrors}>
          <Text style={styles.buttonText}>Ler Erros</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearErrors}>
          <Text style={styles.buttonText}>Limpar Erros</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <FlatList
          data={dtcErrors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.errorItem}>
              <MaterialIcons name={item.icon as any} size={24} color="red" />
              <Text style={styles.errorText}>{item.id} - {item.description}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center" }}>Nenhum erro encontrado 🎉</Text>}
        />
      )}
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF5C5C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: "#5C9EFF",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
