import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ListeScreen from '../screens/ListeScreen';
import KaydedilenlerScreen from '../screens/KaydedilenlerScreen';
import DetayScreen from '../screens/DetayScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Liste') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Kaydedilenler') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Liste" component={ListeScreen} options={{ title: 'Kişiler' }} />
      <Tab.Screen name="Kaydedilenler" component={KaydedilenlerScreen} options={{ title: 'Kaydedilenler' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AnaTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detay"
        component={DetayScreen}
        options={{ title: 'Kişi Detayı' }}
      />
    </Stack.Navigator>
  );
}