import * as React from 'react';
import { Button, 
        SafeAreaView, 
        StyleSheet, 
        TextInput, 
        TouchableOpacity, 
        Text,
        View,
        Image,
        Keyboard,
        KeyboardAvoidingView,
        ScrollView
    } from 'react-native';
import { useState, createRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-community/async-storage';
// import RestApiService from '../../api/rest-api.service';

export function LoginScreen({navigation}: {navigation: any}) {

    const [login, onChangeLogin] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
      setErrortext('');
      navigation.replace('DrawerNavigationRoutes');
      return;
      if (!login) {
        console.log('Please fill login');
        return;
      }
      if (!password) {
        console.log('Please fill Password');
        return;
      }
      setLoading(true);
      let dataToSend: any = {email: login, password: password};
      let formBody: any = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      
      fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          //Hide Loader
          setLoading(false);
          console.log(responseJson);
          // If server response message same as Data Matched
          if (responseJson.status === 'success') {
            AsyncStorage.setItem('user_id', responseJson.data.email);
            console.log(responseJson.data.email);
            navigation.replace('DrawerNavigationRoutes');
          } else {
            setErrortext(responseJson.msg);
            console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    };

  //  const restApiService = new RestApiService();
  //   const connexion = async (req:any)=>{
  //     const method= 'login';
  //     const request= {
  //       "email": req.email,
  //       "password": req.password
  //   }
  //   restApiService.excutePost(method, request).then((res:any)=>{
  //     console.log('reponse', res)
  //   }).catch((err:any)=>{console.log('reponse', err)
  //   })
  //   ;


  // const handleSubmitPress = () => {
  //   setErrortext('');
  //   navigation.replace('DrawerNavigationRoutes');
  //   return;
  //   if (!login) {
  //     console.log('Please fill login');
  //     return;
  //   }
  //   if (!password) {
  //     console.log('Please fill Password');
  //     return;
  //   }
  //   setLoading(true);
  //   let dataToSend: any = {email: login, password: password};
  //   connexion(dataToSend)
  //   let formBody: any = [];
  //   for (let key in dataToSend) {
  //     let encodedKey = encodeURIComponent(key);
  //     let encodedValue = encodeURIComponent(dataToSend[key]);
  //     formBody.push(encodedKey + '=' + encodedValue);
  //   }
  //   formBody = formBody.join('&');
    
  //   fetch('http://localhost:8000/api/user/login', {
  //     method: 'POST',
  //     body: formBody,
  //     headers: {
  //       //Header Definition
  //       'Content-Type':
  //       'application/x-www-form-urlencoded;charset=UTF-8',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.log(responseJson);
  //       // If server response message same as Data Matched
  //       if (responseJson.status === 'success') {
  //         AsyncStorage.setItem('user_id', responseJson.data.email);
  //         console.log(responseJson.data.email);
  //         navigation.replace('DrawerNavigationRoutes');
  //       } else {
  //         setErrortext(responseJson.msg);
  //         console.log('Please check your email id or password');
  //       }
  //     })
  //     .catch((error) => {
  //       //Hide Loader
  //       setLoading(false);
  //       console.error(error);
  //     });
  // };

  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/logo.png')}
                style={styles.Images}
              />
              <Text style={styles.titleStyle}>BIENVENUE</Text>
              <Text style={styles.titleStyle1}>connectez vous</Text>
              <Text style={styles.sousTitleStyle}>
                Vous n'avez pas encore de compte?  
                  <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('RegisterScreen')}> Inscrivez-vous.</Text>
              </Text>
            </View>
            
              
              {/* <View style={styles.SectionStyle}>    
              <Text style={styles.textStyle}>Prénom</Text>          
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserPrenom) =>
                    onChangeLogin(UserPrenom)
                  }
                  placeholder="Login/prenom" 
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  // keyboardType="email-address"
                  returnKeyType="next"
                  // onSubmitEditing={() =>
                  //   passwordInputRef.current &&
                  //   passwordInputRef.current.focus()
                  // }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View> */}

              <View style={styles.SectionStyle}>    
              <Text style={styles.textStyle}>Email</Text>          
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={(UserEmail) =>
                    onChangeLogin(UserEmail)
                  }
                  placeholder="Login/email" 
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  // keyboardType="email-address"
                  returnKeyType="next"
                  // onSubmitEditing={() =>
                  //   passwordInputRef.current &&
                  //   passwordInputRef.current.focus()
                  // }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              
            <View style={styles.SectionStyle1}>
            <Text style={styles.textStyle}>Password</Text>    
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  onChangePassword(UserPassword)
                }
                placeholder="********" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                // ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {/* <View style={styles.SectionStyle}>
              <Text style={styles.textStyle}>êtes vous propriétaire de voiture  ou gérant de parking ?</Text>
              <TouchableOpacity
                style={styles.buttonStyle1}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle}>Je suis propriétaire d’un véhicule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle2}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={styles.buttonTextStyle2}>J’ai un espace de parking</Text>
              </TouchableOpacity>
            </View> */}
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Se connecter</Text>
            </TouchableOpacity>
            
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
// export default LoginScreen;
            }
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
    
  },
  SectionStyle: {
    margin:30,
    marginTop: 30,    
  },
  SectionStyle1: {
    margin:30,
    marginTop: 50,    
  },
  buttonStyle: {
    backgroundColor: '#EB600E',
    borderWidth: 0,
    color: '#000000',
    height: 40,   
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,    
    marginBottom: 25,
    marginTop: 50,
    
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily:'inter',
    fontStyle:'normal',
  },
  buttonTextStyle2: {
    color: '#000000',
    paddingVertical: 10,
    fontSize: 14,
    fontFamily:'inter',
    fontStyle:'normal',
  },
  buttonStyle1:{
    backgroundColor: '#2957C2',
    borderWidth: 0,
    color: '#000000',      
    borderRadius: 5,    
    marginRight: 80,   
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  buttonStyle2:{
    borderRadius: 5,
    borderColor: '#979797',    
    color: '#000000',      
    borderWidth: 1,   
    marginRight: 150,   
    marginLeft: 0,
    alignItems: 'center',
    height: 40,
    marginBottom: 5,
  },
  inputStyle: {
    width:346,
    position: 'absolute',
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    top: 29,
    borderRadius: 5,
    borderColor: '#979797',
   
    height: 40,
  },
  registerTextStyle: {
    color: '#2957C2',
    textAlign: 'center',
    fontFamily:'inter',
    fontStyle:'normal',
    fontSize: 16,
    alignSelf: 'center',
  
  },
  sousTitleStyle:{
    color: '#000000',
    textAlign: 'center',
    fontFamily:'inter',
    fontStyle:'normal',
    fontSize: 16,
    alignSelf: 'center',
    lineHeight:24,
    marginTop: 20,

  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  titleStyle:{
    fontSize: 32,
    color: '#2957C2',
    fontWeight: 'bold',
    fontFamily:'inter',
    paddingTop: 50,
    lineHeight:24,
  },
  titleStyle1:{
    fontSize: 24,
    color: '#2957C2',
    fontWeight: 'bold',
    fontFamily:'inter',    
    lineHeight:24,
  },
  textStyle:{
    fontSize: 14,
    fontFamily:'inter', 
    color: '#000000',
    fontStyle:'normal',
    
  },
  Images:{
    
  },
})
;
