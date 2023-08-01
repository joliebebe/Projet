import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

export default function ReactSimpleButton() {
   const [chosenOption, setChosenOption] = useState(null);
   const options = [
              { label: 'Madame', value: 'madame' },
              { label: 'Monsieur', value: 'monsieur' },
            ];//create our options for radio group
    return (
      <View>
        <RadioForm style={styles.Button}
                radio_props={options}
                initial={0} //initial value of this group
                onPress={(value) => {
                  setChosenOption(value);
                }} //if the user changes options, set the new value
              />
      </View>
    );
  }

const styles = StyleSheet.create({
    Button:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        color:'#EB600E',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
    },
})


