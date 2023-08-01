// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import Geolocation from '@react-native-community/geolocation';
import React, {
  LegacyRef,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Platform,
  TextInput,
  ScrollView,
  Button,
  Dimensions,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import MapView, {
  AnimatedRegion,
  Animated,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
  UrlTile,
  Polygon,
  LatLng,
  Geojson,
} from 'react-native-maps';
// remove PROVIDER_GOOGLE import if not using Google Maps
import data from '../../assets/json/parking.json';
import places from '../../assets/json/places.json';
import BottomSheet, {BottomSheetRefProps} from '../components/BottomSheet';
import {Card, Avatar, Badge, ListItem, SearchBar} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import ReservationScreen from './reservation.page';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AirbnbRating, Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons'; // Remplacez 'FontAwesome' par le nom du pack d'icônes que vous utilisez
import {FlatList} from 'react-native-gesture-handler';
import NumericInput from 'react-native-numeric-input';

const HomeScreen = ({navigation}: any) => {
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [markers, setMarkers] = useState(data);
  const geoJson: any = places;
  const [stationPlaces, setStationPlaces] = useState(places);

  const [zoomedIn, setZoomedIn] = useState(false);

  const handleMarkerPress = (coordinate: LatLng) => {
    if (modalVisible) {
      setZoomedIn(false); // Cancel the zoom if the modal is open
      return; // Ignorer l'action si le modal est ouvert
    }
    if (zoomedIn) {
      // Réduire le zoom
      const initialRegion = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      };
      mapRef.current?.animateToRegion(initialRegion);
    } else {
      // Zoomer à 100%
      const zoomLevel = 16; // Niveau de zoom souhaité
      const newRegion = {
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA / zoomLevel,
        longitudeDelta: LONGITUDE_DELTA / zoomLevel,
      };
      mapRef.current?.animateToRegion(newRegion);
      mapRef.current?.animateCamera({
        zoom: zoomLevel, // Niveau de zoom souhaité pour la vue agrandie
      });
    }
    setZoomedIn(!zoomedIn);

    // Mettre à jour l'état selectedMarker avec les informations du marqueur sélectionné
    const selectedMarkerData = markers.find(
      marker =>
        marker.lat === coordinate.latitude &&
        marker.lon === coordinate.longitude,
    );
    setSelectedMarker(selectedMarkerData);

    // const filteredMarkers = markers.filter((marker) =>
    // marker.name.toLowerCase().includes(markersString.toLowerCase())
    // );
    // Mettre à jour les marqueurs filtrés pour n'afficher que le marqueur sélectionné
    setFilteredMarkers(selectedMarkerData ? [selectedMarkerData] : []);
  };
  const [filteredMarkers, setFilteredMarkers] = useState(data);
  const [region, setRegion] = useState({
    latitude: 5.316667,
    longitude: -4.033333,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  

  const regionChangeHandler = (e: any) => {
    const {latitude, longitude} = e;
  };

  const showDetailParking = async (e: any) => {
    console.log(
      'marker press',
      JSON.stringify(
        places.features.map(item => {
          const coordinate = item.geometry.coordinates.map(val => {
            return {
              latitude: val[0],
              longitude: val[1],
            };
          });
          return {
            id: item.id,
            parkingId: item.parking_id,
            coordinate,
          };
        }),
      ),
    );
  };

  const mapRef = useRef<MapView | null>(null);

  const ref = useRef<BottomSheetRefProps>(null);

  const onPress = useCallback(() => {
    const bottomSheetActive = ref.current?.isActive();
    // const mapActive = mapRef.current !== null;
    if (bottomSheetActive) {
      ref.current?.scrollTo(0);
    } else {
      ref.current?.scrollTo(-300);
    }
  }, []);

  const selectShape = async (e: any) => {
    console.log('shape geojson', e);
    navigation.navigate('reservation');
  };

  useEffect(() => {
    // Code to run on component mount
  }, []);

  const [modalVisible, setModalVisible] = useState(false); // État pour gérer la visibilité de la modale

  const dataArray = markers.map(marker => {
    return {avatar: marker.avatar, name: marker.name};
  });

  const [selectedMarker, setSelectedMarker] = useState<any | null>(null);
  // Maintenant, dataArray contient un tableau d'objets avec les propriétés "name" et "avatar"
  // Supposons que 'markers' est un tableau, convertissez-le en chaîne de caractères en utilisant la méthode 'join'
  const [markersString, setMarkersString] = useState('');
  // Ajustez le séparateur (ici une virgule) en fonction de vos besoins
  const handleSearchTextChange = (text: string) => {
    setMarkersString(text);
  };
  const WATER_IMAGE = require('../../assets/images/parkingdetail/a.jpg');
  const getBadgeColor = (capacity: number) => {
    if (capacity >= 20) {
      return 'success';
    } else if (capacity >= 15) {
      return 'warning';
    } else {
      return 'error';
    }
  };
  const renderCardItem = ({item}) => {
    const handleReservation = (item: any) => {
      // Mettez ici la logique pour gérer la réservation de l'emplacement de stationnement
      console.log('Emplacement réservé :', item);
      navigation.navigate('ReservationScreen', { parkingDetails: item });
    }; 
    return (
      <TouchableOpacity key={item.name} style={styles.parkItem}>
        <View style={styles.user}>
          <View>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: item.avatar}}
            />
            <Badge
              value={item.capacity.toString()}
              status={getBadgeColor(item.capacity)}
              containerStyle={styles.largeBadge}
            />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <AirbnbRating
              count={5}
              reviews={['Terrible', 'Bad', 'Meh', 'OK', 'Good']}
              defaultRating={5}
              size={14}
              ratingContainerStyle={{padding: 0, margin: 0}}
            />
          </View>
          {/* Vous pouvez ajouter d'autres éléments à afficher dans le <Card> ici */}
        </View>
        {/* Affichez les sous-cartes en fonction du nombre de capacités */}
        {Array(item.capacity)
          .fill(0)
          .map((_, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.subCardContainer}>
                <Text style={styles.subCardText}>Place {index + 1}</Text>
                <TouchableOpacity
                  style={[styles.reservationButton, {backgroundColor: 'green'}]}
                  onPress={() => handleReservation(item)}>
                  <Text style={styles.buttonText}>Réserver</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
      </TouchableOpacity>
      
    );
    
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <MapView
            ref={mapRef}
            provider={Platform.OS == 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            mapType={Platform.OS == 'android' ? 'standard' : 'none'}
            onMarkerPress={showDetailParking}
            zoomControlEnabled={true}
            showsUserLocation={true}
            // followsUserLocation={true}
            // showsTraffic={true}
            // cacheEnabled={true}
            // loadingEnabled={true}
            onRegionChangeComplete={regionChangeHandler}
            region={region}>
            <UrlTile
              urlTemplate={'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
              maximumZ={19}
              flipY={false}
            />
            {markers.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lon,
                }}
                title={marker.name}
                description={marker.address}
                onPress={() => {
                  onPress();
                  handleMarkerPress({
                    latitude: marker.lat,
                    longitude: marker.lon,
                  });
                }}
              />
            ))}
            <Geojson
              geojson={geoJson}
              strokeColor="red"
              fillColor="green"
              strokeWidth={2}
              onPress={selectShape}
            />
            {}
          </MapView>
        </View>

        <BottomSheet ref={ref}>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={handleSearchTextChange} // Utilisez la fonction de rappel ici
            value={markersString}
            platform="ios"
          />
          <FlatList
            numColumns={2}
            data={selectedMarker ? [selectedMarker] : filteredMarkers}
            renderItem={renderCardItem}
            keyExtractor={item => item.name}
          />
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};

const deviceHeight = Dimensions.get('window').height;

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
    width: 'auto',
    //  justifyContent: 'flex-end',
    //  alignItems: 'center',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: deviceHeight,
  },
  timings: {
    color: '#ccc',
    fontSize: 14,
  },
  metaContainer: {
    justifyContent: 'space-between',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    width: '100%', // Assurez-vous que le ScrollView prend toute la largeur disponible
  },

  description: {
    color: '#ccc',
    marginTop: 5,
    fontSize: 20,
  },
  subCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  subCardText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 8,
    margin: 15,
  },
 
  cardContainer: {},
  positiontext: {
    marginRight: 5,
    marginLeft: 15,
  },

  posAvatar: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },

  address: {
    fontSize: 14,
  },

  fatlist: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    marginLeft: 35,
    marginTop: 10,
    marginRight: 35,
  },
  name1: {},
  capacity: {},
  observ: {},
  parking_id: {},

  user: {
    flexDirection: 'row', // Cela alignera le contenu dans une ligne horizontale (texte à gauche, image à droite)
    alignItems: 'center', // Cela alignera les éléments verticalement
    //marginVertical: 8, // Espace vertical entre les éléments de chaque utilisateur
  },
  userInfoContainer: {
    margin: 10, // Espace entre le texte/évaluation et l'image
    alignItems: 'center',
  },
  image: {
    width: 75, // Ajustez la largeur et la hauteur de l'image selon vos besoins
    height: 75,
    borderRadius: 25, // Pour rendre l'image circulaire, si nécessaire
  },
  largeBadge: {
    width: 30, // Ajustez la taille du badge en fonction de vos besoins
    height: 30, // Ajustez la taille du badge en fonction de vos besoins
    borderRadius: 15, // Pour rendre le badge circulaire, si nécessaire
    position: 'absolute',
    top: -10, // Ajustez la position verticale selon vos besoins
    right: -10, // Ajustez la position horizontale selon vos besoins
  },
  name: {
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  searchIcon: {
    color: '#8b9cb5',
  },
 
  TextInput: {
    color: '#333',
    fontSize: 16,
    paddingVertical: 2,
  },
  containe: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  iconContainer: {
    marginLeft: 8,
  },
  parkItem:{
    width:'45%',
    height:200,
    backgroundColor: '#fff',
    borderRadius:10,
    borderWidth:0.2,
    margin: 10,

  },
  parkImg:{
    width:60,
    height:60,
    borderRadius:30,
    alignSelf:'center',
    marginTop:20,
  },
});
