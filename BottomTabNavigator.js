import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#fff',
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: { backgroundColor: '#000' },
      tabBarActiveTintColor: '#e50914',
      tabBarInactiveTintColor: '#fff',
    }}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeStack}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
