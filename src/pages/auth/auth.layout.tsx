import 'react-native-gesture-handler';

// Import React and Component
import React from 'react';

// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { LoginScreen } from './login.page';
import  RegisterScreen  from './register.page';
import {Splashscreen} from './splashScreen.page';

const Stack = createNativeStackNavigator();

const Auth = () => {
    // Stack Navigator for Accueil, Login and Sign up Screen
    return (
      <Stack.Navigator initialRouteName="Splashscreen">
        <Stack.Screen
          name="Splashscreen"
          component={Splashscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            
            title: 'Register', //Set Header Title
            headerStyle: {
              // backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#2957C2', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
      </Stack.Navigator>
    );
  };

export default Auth;