// custom sidebar/drawer component which will replace the default sidebar/drawer

// Import React and Component
import React from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import AsyncStorage from '@react-native-community/async-storage';

const CustomSidebarMenu = (props: any) => {
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#fff'}}>
            {'Smart-parking'.charAt(0)}
          </Text>
        </View>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} labelStyle={{color: '#fff'}} />
        <DrawerItem
          label={({color}) => 
            <Text style={{color: '#fff'}}>
              Déconnexion
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Deconnexion',
              'Êtes vous sûr? Voulez-vous vous déconnectez?',
              [
                {
                  text: 'Annuler',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirmer',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          icon={({color, size}) => (
            <Icon name="md-log-out" size={size} color={color} />
          )}
        />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4fa99c',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#4fa99c',
    padding: 15,
    textAlign: 'center',
    color: 'white',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});