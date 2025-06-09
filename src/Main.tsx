import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

// don't import from '../navigations' here — it causes a circular dependency:
import AppNavigation from './navigations/AppNavigation';

import { useTheme } from './contexts';

const Main = (): React.JSX.Element => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.palette.background }]}>
      <StatusBar backgroundColor={theme.palette.background} style="auto" />
      <AppNavigation />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
});
