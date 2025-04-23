import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import DiagnosticScreen from "../screens/Diagnostico";
import PerformanceScreen from "../screens/Performance";
import SensorsScreen from "../screens/Sensores";
import Configuracoes from "../screens/Configuracoes";
import LoginScreen from "../screens/Login";
import ConnectScreen from "../screens/ConnectScreen";

import { Device } from "react-native-ble-plx";
import { Text } from "react-native";

export type TabParamList = {
  Home: undefined;
  Diagnóstico: undefined;
  Performance: undefined;
  Sensores: undefined;
  Configurações: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  Conectar: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();


function MainApp({ device }: { device: Device | null }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Diagnóstico"
        children={() =>
          device ? (
            <DiagnosticScreen device={device} />
          ) : (
            <Text style={{ padding: 20, textAlign: "center" }}>
              Conecte o scanner primeiro.
            </Text>
          )
        }
      />
      <Tab.Screen name="Performance" component={PerformanceScreen} />
      <Tab.Screen name="Sensores" component={SensorsScreen} />
      <Tab.Screen name="Configurações" component={Configuracoes} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [device, setDevice] = useState<Device | null>(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MainApp"
          children={() => <MainApp device={device} />}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Conectar"
          children={() => (
            <ConnectScreen onDeviceConnected={(d: Device) => setDevice(d)} />
          )}
          options={{ title: "Conectar ao Scanner" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
