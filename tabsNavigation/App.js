// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/home';
import Profile from './screens/profile';
import Settings from './screens/settings';
import Detalle from './screens/detalle'; // tu pantalla Detalle

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 1) Definimos los Bottom Tabs en un componente aparte
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home')      iconName = 'home';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 5, height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// 2) Stack raíz que primero muestra los Tabs, luego puede navegar a Detalle
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Tus Tabs sin header */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        {/* Pantalla Detalle accesible desde cualquier tab */}
        <Stack.Screen
          name="Detalle"
          component={Detalle}
          options={{ title: 'Detalle' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
