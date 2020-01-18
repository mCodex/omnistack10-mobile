import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

const defaultStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationNativeContainer>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Stack.Navigator
        screenOptions={{
          // headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#7D40E7'
          },
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
};

export default defaultStack;
