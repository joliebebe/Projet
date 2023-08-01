// Import React and Component
import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ReactSimpleButton from './RadioButton';
import CheckSimple from './checkbox';

// import Loader from './Components/Loader';

const RegisterScreen = (props: any) => {
  const [nom, setNom] = useState('');
  const [prenoms, setPrenoms] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [matriculeVehicule, setMatriculeVehicule] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  const emailInputRef = createRef();
  const ageInputRef = createRef();
  const addressInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext('');
    
    if (!nom) {
      console.log('Ajouter le nom');
      return;
    }
    if (!prenoms) {
      console.log('Please fill Prenoms');
      return;
    }
    if (!email) {
      console.log('Please fill Email');
      return;
    }
    if (!phone) {
      console.log('Please fill phone');
      return;
    }
    if (!matriculeVehicule) {
      console.log('Please fill matriculeVehicule');
      return;
    }   
    
    if (!password) {
      console.log('Please fill Password');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend: any = {
      
      nom: nom,
      prenoms: prenoms,
      email: email,
      phone: phone,
      matriculeVehicule: matriculeVehicule,
      
      password: password,
    };
    var formBody: any = [];
    // for (var key in dataToSend) {
    //   var encodedKey = encodeURIComponent(key);
    //   var encodedValue = encodeURIComponent(dataToSend[key]);
    //   formBody.push(encodedKey + '=' + encodedValue);
    // }
    // formBody = formBody.join('&');

    fetch('http://localhost:80/api/user/register', {
      method: 'POST',
      body: dataToSend,
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
          setIsRegistraionSuccess(true);
          console.log(
            'Registration Successful. Please Login to proceed'
          );
        } else {
          setErrortext(responseJson.msg);
        }
      })
      .catch((error) => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
        }}>

        <Text style={styles.successTextStyle}>
          Registration Successful
        </Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>

        <KeyboardAvoidingView enabled>
         <View>
          <Text style={styles.Header} >Création de compte</Text>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              // ref={emailInputRef}
              returnKeyType="next"
              // onSubmitEditing={() =>
                        //   passwordInputRef.current &&
                        //   passwordInputRef.current.focus()
                        // }
              blurOnSubmit={false}
            />
          </View>
          <Text style={styles.comment} TextColor="#8b9cb5">
            Nous vous enverrons un code de confirmation
          </Text>
          </View>
          <View>
            <Text style={styles.Header1} >Encore quelques informations</Text>
            <ReactSimpleButton onPress={(value) => {setChosenOption(value)}}/>
                <View style={styles.SectionStyle}>
                    <TextInput
                      style={styles.inputStyle}
                      onChangeText={(nom) => setNom(nom)}
                      underlineColorAndroid="#f000"
                      placeholder="Nom "
                      placeholderTextColor="#8b9cb5"
                      autoCapitalize="sentences"
                      returnKeyType="next"
                              // onSubmitEditing={() =>
                              //   emailInputRef.current && emailInputRef.current.focus()
                              // }
                      blurOnSubmit={false}
                    />
                </View>
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) => setPrenoms(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Prenom "
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   emailInputRef.current && emailInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(phone) =>
                setPhone(phone)
              }
              underlineColorAndroid="#f000"
              placeholder="Téléphone"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              // ref={addressInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setPassword(UserPassword)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              // ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              // onSubmitEditing={() =>
              //   ageInputRef.current &&
              //   ageInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(mat) => setMatriculeVehicule(mat)}
              underlineColorAndroid="#f000"
              placeholder="Matricule du vehicule"
              placeholderTextColor="#8b9cb5"
             
              // ref={ageInputRef}
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   addressInputRef.current &&
              //   addressInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
          </View>
          <CheckSimple onValueChange={(newValue) => setToggleCheckBox(newValue)} />
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>Continuer</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  comment:{
    
    fontFamily:'inter',
     alignItems: 'center',
     marginLeft: 35,
     marginRight: 35,
  },
  Header:{
    color: '#2957C2',
    fontSize: 27,
    alignItems:'center',
    fontWeight: 'bold',
    fontFamily:'inter',
    marginLeft: 35,
    marginRight: 35,

  },
  Header1:{
      color: '#2957C2',
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily:'inter',
      marginLeft: 35,
      marginTop: 10,
      marginRight: 35,
    },

  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
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
    marginTop: 10,
    

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});