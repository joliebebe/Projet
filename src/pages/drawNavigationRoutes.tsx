// Les vues de la navigation par tiroir
// Import React
import React from 'react';

// Import Navigators from React Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

// Import des vues
import  HomeScreen  from './home.page';
import SettingsScreen from './settings.page';
import HistoryScreen from './history.page';
import ReservationScreen from './reservation.page';
import CustomSidebarMenu from '../components/customSidebarMenu';
import NavigationDrawerHeader from '../components/navigationDrawerHeader';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const ReservationStack = createNativeStackNavigator();


const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Dashboard', //Set Header Title
          headerShown: false, // pas de header
          gestureEnabled: false,
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerRight: () => (
            <Icon
              name="md-search"
              size={24}
              color="#000"
              style={{ marginRight: 10 }}
              onPress={() => {
                // Ajoutez ici le code pour gérer le press sur l'icône de recherche
              }}
            />
          ),
          headerSearchBarOptions:{
            placeholder:'search',
          },
        }}
      />
      <Stack.Screen
      name="Reservation"
      component={ReservationScreen}
      options={{ headerShown: false }} // Hide header for the ReservationScreen
    />
    </Stack.Navigator>
  );
};

const ReservationScreenStack = ({navigation}: {navigation: any}) => {
  return (
    <ReservationStack.Navigator initialRouteName="ReservationScreen">
      <Stack.Screen
        name="ReservationScreen"
        component={ReservationScreen}
        options={{
          title: 'Reservation', //Set Header Title
          headerShown: false, // pas de header
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#fff', //Set Header color
          },
          headerRight: () => (
            <Icon
              name="md-search"
              size={24}
              color="#fff"
              style={{ marginRight: 10 }}
              onPress={() => {
                // Ajoutez ici le code pour gérer le press sur l'icône de recherche
                <TextInput
                  placeholder="Nom"
                  value={'reservationInfo'}
                />
              }}
            />),
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </ReservationStack.Navigator>
  );
};

const SettingScreenStack = ({navigation}: {navigation: any}) => {
  return (
    <SettingsStack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false, // pas de header
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Parametres', //Set Header Title
        }}
      />
    </SettingsStack.Navigator>
  );
};

const HistoryScreenStack = ({navigation}: {navigation: any}) => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        headerShown: false, // pas de header
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#fff', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: 'Parametres', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props: any) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#ccc',
        drawerItemStyle: {marginVertical: 5},
        drawerLabelStyle: {
          color: '#fff',
        },
        drawerContentContainerStyle: {
          marginVertical: 0
        }
      }}
      drawerContent={CustomSidebarMenu}>

      <Drawer.Screen
        name="Dashboard"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'md-home' : 'md-home-outline'}
              size={size}
              color={color}
            />
          ),
                
        }}
        
        component={HomeScreenStack}
      />
      <Drawer.Screen
          name="Reserver sa place"
          options={{drawerLabel: 'Reservation',
          drawerIcon: ({ focused, color, size }) => (
            <Icon
              name={focused ? 'md-calendar' : 'md-calendar-outline'}
              size={size}
              color={color}
            />
          ),
        }}
          component={ReservationScreenStack}
      />
      <Drawer.Screen
        name="Faire un paramétrage"
        options={{
            drawerLabel: 'Paramètres',
            drawerIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'md-settings' : 'md-settings-outline'}
                size={size}
                color={color}
              />
            ),
        }}
        component={SettingScreenStack}
      />
      <Drawer.Screen
        name="Voir l'historique"
        options={{drawerLabel: 'Historique des reservations',
        drawerIcon: ({ focused, color, size }) => (
          <Icon
            name={focused ? 'md-time' : 'md-time-outline'}
            size={size}
            color={color}
          />
        ),
      }}
        component={HistoryScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;