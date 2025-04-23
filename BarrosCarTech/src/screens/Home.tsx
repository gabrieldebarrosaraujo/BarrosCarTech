import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";
import { connectToOBD } from "../services/obdService";

export default function Home() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleConnect = async () => {
    setConnecting(true);
    pulse();

    try {
      const device = await connectToOBD();
      setConnected(true);
      Alert.alert("Conectado ao OBD: " + device.id);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro ao conectar: " + error.message);
      } else {
        Alert.alert("Erro desconhecido ao conectar.");
      }
    } finally {
      setConnecting(false);
    }
  };

  useEffect(() => {
    if (!connecting) {
      scaleAnim.setValue(1);
    }
  }, [connecting]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conectar ao Scanner</Text>
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          style={[styles.button, connected && styles.buttonConnected]}
          onPress={handleConnect}
          disabled={connecting}
        >
          <Text style={styles.buttonText}>
            {connected ? "Conectado" : connecting ? "Conectando..." : "Conectar"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  buttonConnected: {
    backgroundColor: "#32CD32",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
