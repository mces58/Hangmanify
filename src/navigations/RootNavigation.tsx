import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import About from 'src/screens/About';
import Home from 'src/screens/Home';

import { NavigationNames, type RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = (): React.JSX.Element => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={NavigationNames.HOME}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen component={Home} name={NavigationNames.HOME} />
        <Stack.Screen component={About} name={NavigationNames.ABOUT} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);

export default RootNavigation;
