import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import menu from '../../../assets/images/splash_sceen.png';
export function Splashscreen({ navigation }: { navigation: any }) {

    return (
        
            <View style={styles.container}>
               
                    <ImageBackground
                        source={menu}
                        resizeMode="cover"
                        style={styles.backgroundImage}
                    >
                        
                            <View style={styles.contentContainer}>
                                {/* Votre contenu */}
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    activeOpacity={0.5}>
                                    <Text
                                    style={styles.buttonTextStyle}
                                    onPress={() => navigation.navigate('LoginScreen')}>
                                    commencer
                                </Text>
                                </TouchableOpacity>                        
                            </View>
                             
                    </ImageBackground>   
           
            </View>
       
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    
        padding: 10,
        alignItems: 'center',
        marginTop: 550,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        margin:15,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    buttonTextStyle: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily:'inter'
    }
});

