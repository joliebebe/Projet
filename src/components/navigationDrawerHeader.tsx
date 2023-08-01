// custom header component used for Navigation Drawer header
// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

const NavigationDrawerHeader = (props: any) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };
  const menuIcon = require('../../assets/images/menu.svg');
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={menuIcon}
          style={{width: 25, height: 25, marginLeft: 5}}
        />        
      </TouchableOpacity>
    </View>
  );
};
export default NavigationDrawerHeader;