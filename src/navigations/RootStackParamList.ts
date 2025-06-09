import {
  type NavigationProp,
  type RouteProp,
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from '@react-navigation/native';

export const enum RouteNames {
  ABOUT = 'About',
  HOME = 'Home',
}

export type RootStackParamList = {
  [RouteNames.ABOUT]: { name: string };
  [RouteNames.HOME]: undefined;
};

/**
 * ### Returns the typed navigation object for a given route
 * @template T
 * @returns {NavigationProp<RootStackParamList, T>} Strongly typed navigation object for screen `T`
 * @example
 * // File: Home.tsx
 * import {useNavigation, RouteNames} from './path/to/navigations'
 * const navigation = useNavigation<RouteNames.HOME>(); // Home screen navigation
 * navigation.navigate(RouteNames.PROFILE, { userId: '123' });
 */
function useNavigation(): never;
function useNavigation<T extends keyof RootStackParamList>(): NavigationProp<RootStackParamList, T>;
function useNavigation<T extends keyof RootStackParamList>(): NavigationProp<
  RootStackParamList,
  T
> {
  return useNativeNavigation<NavigationProp<RootStackParamList, T>>();
}
/**
 * ### Returns the typed route object for a given screen
 * @template T
 * @returns {RouteProp<RootStackParamList, T>} Strongly typed route object for screen `T`
 * @example
 * // File: Profile.tsx
 * import {useRoute, RouteNames} from './path/to/navigations'
 * const route = useRoute<RouteNames.PROFILE>(); // Profile screen route
 * console.log(route.params.userId);
 */
function useRoute(): never;
function useRoute<T extends keyof RootStackParamList>(): RouteProp<RootStackParamList, T>;
function useRoute<T extends keyof RootStackParamList>(): RouteProp<RootStackParamList, T> {
  return useNativeRoute<RouteProp<RootStackParamList, T>>();
}

export { useNavigation, useRoute };
