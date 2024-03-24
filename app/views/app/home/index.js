import HomeScreen from "./home";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function HomeStacks() {
  return (
    <Stack.Navigator
    
screenOptions={{
        headerShown: false,
}}
    
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

