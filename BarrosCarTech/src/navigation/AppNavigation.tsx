import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "../screens/Home";
import DiagnosticScreen from "../screens/Diagnostico";
import PerformanceScreen from "../screens/Performance";
import SensorsScreen from "../screens/Sensores";
import Configuracoes from "../screens/Configuracoes";
import LoginScreen from "../screens/Login"; 

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
};

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Diagnóstico" component={DiagnosticScreen} />
      <Tab.Screen name="Performance" component={PerformanceScreen} />
      <Tab.Screen name="Sensores" component={SensorsScreen} />
      <Tab.Screen name="Configurações" component={Configuracoes} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
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
          component={MainApp}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
