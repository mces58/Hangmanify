import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import About from 'src/screens/About';
import Home from 'src/screens/Home';

import { type RootStackParamList, RouteNames } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = (): React.JSX.Element => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName={RouteNames.HOME} screenOptions={{ headerShown: false }}>
        <Stack.Screen component={Home} name={RouteNames.HOME} />
        <Stack.Screen component={About} name={RouteNames.ABOUT} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default AppNavigation;
