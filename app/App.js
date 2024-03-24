import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStacks from './views/app/home';
import { Ionicons,Entypo,Feather,FontAwesome,MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanStacks from './views/app/scan';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function AppTabs() {
  const navigation = useNavigation();

  return (
  
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarBackground: () => (
            <BlurView tint="light" intensity={50} style={[StyleSheet.absoluteFill,
            {
              backgroundColor:"#f2f2f233",
            }]
            } />
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
              return <Entypo name="home" size={24} color={focused?'#14c986':'black'} />;
            } else if (route.name === 'Rewards') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
              return <Feather name="award" size={24} color={focused?'#14c986':'black'} />
            } else if (route.name === 'Scan') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
              return <MaterialCommunityIcons name="line-scan"  size={24} color={focused?'#14c986':'black'} onPress={()=>{
                navigation.navigate('ScanStacks');
              }} />
            }
            else if (route.name === 'Notifications') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
              return <Ionicons name="notifications" size={24} color={focused?'#14c986':'black'} />
            } else if (route.name === 'Profile') {
              return <FontAwesome name="user-circle" size={24} color={focused?'#14c986':'black'} />
            }
          },
          tabBarActiveTintColor: '#14c986',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStacks} />
        <Tab.Screen name="Rewards" component={HomeStacks} />
        <Tab.Screen name="Scan" component={HomeStacks} />
        <Tab.Screen name="Notifications" component={HomeStacks} />
        <Tab.Screen name="Profile" component={HomeStacks} />
      </Tab.Navigator>
 
  );
}


 
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
      
      screenOptions={{
        headerShown: false,
      }}
      
      >
        <Stack.Screen name="AppTabs" component={HomeStacks} />
        <Stack.Screen name="ScanStacks" component={ScanStacks} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
 