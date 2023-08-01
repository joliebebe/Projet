import React, {useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default function CheckSimple() {
  const [toggleCheckBox, setToggleCheckBox] = useState(null)

  return (
    <View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)} style={styles.checkbox}/>
        <Text style={styles.label}>Recevoir les communications de Smart Parking pour m’informer de reductions ou de nouveautes sur le service</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  checkboxContainer: {
    flexDirection: 'row',
    marginLeft: 35,
    marginRight: 45,
  },
  checkbox: {
    alignSelf: 'center',
    
  },
  label: {
    margin: 8,
    alignSelf:'stretch',
  },
})
