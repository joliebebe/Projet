// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, useCallback } from 'react';
import { FlatList, Switch, StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Divider} from 'react-native-elements';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

const data = [

      {key:'1', value:'Français'},
      {key:'2', value:'Anglais'},
      {key:'3', value:'Espagnol'},
  ];
const data1 = [
      {key:'1', value:'Nouveau message'},
      {key:'2', value:'Nouveau email'},

  ];
const SwitchButton = ({ isEnabled, toggleSwitch, text }) => {
  return (
    <View style={styles.logbox}>
      <Text style={styles.text}>{text}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#22d3ee" }}
        thumbColor={isEnabled ? "#22d3ee" : "#f4f3f4"}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const SettingsScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const toggleSwitch = useCallback(() => setIsEnabled(previousState => !previousState), []);

  const [selected, setSelected] = React.useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <SwitchButton isEnabled={isEnabled} toggleSwitch={toggleSwitch} text="Afficher les embouteillages sur la carte" />
      <Text style={styles.text3}>Langue de l'application</Text>
        <SelectList
              setSelected={setSelected}
              fontFamily='lato'
              data={data}
              search={false}
              boxStyles={{borderRadius:0}} //override default styles
              placeholder="Langue de l'application"
            />
          <View>
        <SwitchButton 
        isEnabled={isEnabled1} 
        toggleSwitch={() => setIsEnabled1(previousState => !previousState)} 
        text="Montrer moi ma position"/>
        <SwitchButton 
        isEnabled={isEnabled2} 
        toggleSwitch={() => setIsEnabled2(previousState => !previousState)} 
        text="Afficher les espaces disponibles"/>
      </View>
      <View>
        <Text style={styles.text3}>Notifications</Text>
       <SelectList
            setSelected={setSelected}
            fontFamily='lato'
            data={data1}
            search={false}
            boxStyles={{borderRadius:0}}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },

  text3: {
     padding: 20,
     fontSize: 18,
     fontWeight: 'bold',
     color: '#000',
  },
  notif:{
    padding: 20,
    height: 90,
    },
 logbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: 80,
    backgroundColor: '#f9f9f9',
    },

});