import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, ActivityIndicator } from "react-native";
import { BleManager, Device } from "react-native-ble-plx";
import { requestPermissions } from "../hooks/useBLE";

const bleManager = new BleManager();


interface ConnectScreenProps {
  onDeviceConnected: (device: Device) => void;
}

const ConnectScreen: React.FC<ConnectScreenProps> = ({ onDeviceConnected }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [device, setDevice] = useState<Device | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert("Permissões necessárias", "Ative as permissões para usar o Bluetooth.");
      }
    };

    checkPermissions();
  }, []);

  const startScan = async () => {
    setIsScanning(true);
    setDevice(null);

    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log("Erro ao escanear:", error);
        Alert.alert("Erro", "Não foi possível escanear dispositivos.");
        setIsScanning(false);
        return;
      }

      if (scannedDevice && (scannedDevice.name?.includes("OBD") || scannedDevice.name?.includes("ELM327"))) {
        bleManager.stopDeviceScan();
        setDevice(scannedDevice);
        setIsScanning(false);
        Alert.alert("Dispositivo encontrado!", `Nome: ${scannedDevice.name}`);
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setIsScanning(false);
    }, 10000);
  };

  const connectToDevice = async () => {
    if (device) {
      try {
        const connectedDevice: Device = await device.connect();
        const connectionStatus = await connectedDevice.isConnected();
        setIsConnected(connectionStatus);

        if (connectionStatus) {
          await connectedDevice.discoverAllServicesAndCharacteristics();
          Alert.alert("Conectado!", "Scanner ELM327 conectado com sucesso.");
          listServices(connectedDevice);

          // Aqui avisamos o AppNavigator que o device foi conectado
          onDeviceConnected(connectedDevice);
        } else {
          Alert.alert("Erro", "A conexão falhou. Tente novamente.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível conectar ao scanner.");
      }
    } else {
      Alert.alert("Nenhum dispositivo encontrado", "Tente escanear novamente.");
    }
  };

  const listServices = async (connectedDevice: Device) => {
    try {
      const services = await connectedDevice.services();
      console.log("Serviços encontrados:", services);
    } catch (error) {
      console.log("Erro ao listar serviços:", error);
    }
  };

  const sendTestCommand = async () => {
    if (!device || !isConnected) return;

    try {
      const characteristic = await device.writeCharacteristicWithoutResponseForService(
        "000018f0-0000-1000-8000-00805f9b34fb", // UUID do serviço
        "00002af0-0000-1000-8000-00805f9b34fb", // UUID da característica
        Buffer.from("ATZ\r").toString("base64")
      );

      console.log("Comando enviado:", characteristic);
    } catch (error) {
      console.log("Erro ao enviar comando:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Conectar ao Scanner OBD2</Text>

      <Button title="Escanear dispositivos" onPress={startScan} disabled={isScanning} />
      {isScanning && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 10 }} />}

      {device && (
        <View style={{ marginTop: 20 }}>
          <Text>Dispositivo: {device.name}</Text>
          <Button title="Conectar" onPress={connectToDevice} />
        </View>
      )}

      {isConnected && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: "green" }}>Conectado ao Scanner!</Text>
          <Button title="Enviar Teste (ATZ)" onPress={sendTestCommand} />
        </View>
      )}
    </View>
  );
};

export default ConnectScreen;
