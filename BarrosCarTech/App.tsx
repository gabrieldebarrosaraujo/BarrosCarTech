import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigation';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
