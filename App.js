import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              sceneContainerStyle: { backgroundColor: '#0A0A0A' },
              tabBarStyle: {
                backgroundColor: '#0F0F0F',
                borderTopColor: '#252525',
                borderTopWidth: 1,
                paddingTop: 8,
                paddingBottom: 14,
                marginBottom: 18,
                height: 72,
              },
              tabBarActiveTintColor: '#C8FF00',
              tabBarInactiveTintColor: '#6A6A6A',
              tabBarLabelStyle: {
                fontSize: 11,
                fontWeight: '600',
              },
            }}
          >
            <Tab.Screen
              name="Search"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Buscar',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="History"
              component={HistoryScreen}
              options={{
                tabBarLabel: 'Histórico',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="time-outline" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
