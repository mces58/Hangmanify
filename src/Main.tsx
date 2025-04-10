import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

import RootNavigation from './navigations/RootNavigation';

import { useAppTheme } from './hooks';

const Main = (): React.JSX.Element => {
  const { theme } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.palette.background }]}
    >
      <StatusBar backgroundColor={theme.palette.background} style="auto" />
      <RootNavigation />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
});
