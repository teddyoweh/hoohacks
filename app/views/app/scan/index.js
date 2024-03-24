
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from "./scan";
import ResultsScreen from './scan_results';

const Stack = createNativeStackNavigator();
export default function ScanStacks() {
  return (
    <Stack.Navigator
    
screenOptions={{
        headerShown: false,
}}
    
    >
      <Stack.Screen name="ScanScreen" component={ScanScreen} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

