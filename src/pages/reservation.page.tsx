import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Card, Divider} from 'react-native-elements';
export default function ReservationScreen({route, navigation}: any) {
  const {parkingDetails} = route.params || {}; // Assurez-vous de déstructurer parkingDetails avec une valeur par défaut {}
  console.log('+++navigation :', route.params);
  const [reservationInfo, setReservationInfo] = useState({
    parkingImage: parkingDetails?.avatar || '0',
    parkingName: parkingDetails?.name || '0',
    parkingId: parkingDetails?.parking_id || '0',
    capacity: parkingDetails?.capacity || 100,
    reserved: false,
    selectedTime: new Date(),
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Card.Title>
            <LinearGradient
              colors={['#ccc', '#ccc', '#ccc']}
              style={styles.linearGradient}>
              <Text style={styles.buttonText}>
                {reservationInfo.parkingName}
              </Text>
            </LinearGradient>
          </Card.Title>
          <Card.Divider />
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: reservationInfo.parkingImage}}
          />
        </View>
        <LinearGradient
          colors={['#ccc', '#ccc', '#ccc']}
          style={styles.linearGradient1}>
          <View style={styles.vertical}>
            <Text style={styles.parkingNumber}>Etage disponible</Text>
            <Divider orientation="vertical" />
            <Text style={styles.parkingNumber}>Espace disponible</Text>
          </View>
          <View style={styles.vertical}>
            <Text style={styles.parkingNumber1}>
              {reservationInfo.capacity}
            </Text>
            <Divider orientation="vertical" />
            <Text style={styles.parkingNumber1}>
              {reservationInfo.capacity}
            </Text>
          </View>
        </LinearGradient>

        {/* <View style={styles.priceContainer}>
        <FlatList
          data={[1, 3, 1, 3]}
          horizontal
          renderItem={({item, index}) => (
            <TouchableOpacity>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.linearGradient}>
                <Text style={styles.buttonText1}>{'prix ' + (index + 1)}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View> */}
        <Text style={styles.heading}>Programmer son temps</Text>
        <View style={{marginTop: 20}} />
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    textAlign: 'left',
    marginRight: 300,
    padding: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#000',
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  vertical: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'transparent',
    elevation: 5,
  },
  buttonText1: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  parkingNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#000',
  },
  parkingNumber1: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#fff',
  },
  priceContainer: {
    flex: 1, // Ajout du style flex pour que la FlatList s'affiche correctement
  },
  linearGradient1: {
    marginBottom: 15,
    elevation: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  linearGradient: {
    width: 130,
    marginLeft: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    elevation: 5,
  },
});
