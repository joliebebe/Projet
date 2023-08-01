/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Linking,
  Platform
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  drawerNavigationRoutes  from './src/pages/drawNavigationRoutes';
import SplashScreen from './src/layouts/SplashScreen';
import Auth from './src/pages/auth/auth.layout';
import {enableLatestRenderer} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './src/pages/home.page';
import ReservationScreen from './src/pages/reservation.page';
 
type SectionProps = PropsWithChildren<{
  title: string;
}>;
enableLatestRenderer();
const StackBase = createNativeStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
      const restoreState = async () => {
        try {
          const initialUrl = await Linking.getInitialURL();

          if (Platform.OS !== 'web' && initialUrl == null) {
            // Only restore state if there's no deep link and we're not on web
            const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
            const state = savedStateString ? JSON.parse(savedStateString) : undefined;

            if (state !== undefined) {
              setInitialState(state);
            }
          }
        } finally {
          setIsReady(true);
        }
      };

      if (!isReady) {
        restoreState();
      }
    }, [isReady]);

    if (!isReady) {
      return null;
    }

  return (
    <NavigationContainer 
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
        }
      >
      <StackBase.Navigator initialRouteName="SplashScreen">
        <StackBase.Screen name="SplashScreen"  component={SplashScreen} options={{headerShown: false}}/>
        <StackBase.Screen name="Auth" component={Auth} options={{headerShown: false}} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          {/* Navigation Drawer as a landing page */}
          <StackBase.Screen
          name="DrawerNavigationRoutes"
          component={drawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        <StackBase.Screen name="Home" component={HomeScreen} />
        <StackBase.Screen name="Reservation" component={ReservationScreen} />
      </StackBase.Navigator>
    </NavigationContainer>
    
  ); 
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
