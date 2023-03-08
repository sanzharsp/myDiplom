
import React, {useState} from 'react';
import axios from 'axios'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import url from '../BackendUrl'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text as Txt} from 'react-native-paper';

const Login = ()=> {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkUsername, setCheckUsername] = useState(false);

  const handleCheckEmail = text => {

    setUsername(text);
    if (text !== '') {
        setCheckUsername(false);
    } else {
        setCheckUsername(true);
    }
  };

  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

    // const isContainsSymbol =
    //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    // if (!isContainsSymbol.test(value)) {
    //   return 'Password must contain at least one Special Symbol.';
    // }

    return null;
  };

  const handleLogin =  async () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (!checkPassowrd) {
      await axios.post(`${url.BaseUrl}${url.Auth.login}`,{
        username: username,
        password: password,
      })
        .then(async (result) => {
          if (result.status == 200) {
            const jsonValue = JSON.stringify(result.data.user)
            await AsyncStorage.setItem('@access', result.data.access);
            await AsyncStorage.setItem('@refresh', result.data.refresh);
            await AsyncStorage.setItem('@user',jsonValue);


            navigation.replace('Home');
          }
        })
        .catch(function(error) {
          setError(error.response?.data?.detail)
           // ADD THIS THROW error
            throw error;
          });
    } else {
      alert(checkPassowrd);
    }
  };

  return (
    <ImageBackground
    source={{uri:''}}
    style={styles.background}
  >
    <View style={styles.container}>
    <Txt style={{textAlign:'center',color:'black'}}  variant="headlineLarge" >QUANTUM LOGIN</Txt>
    <Text style={styles.textFailed}>{error}</Text>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => handleCheckEmail(text)}
        />
      </View>
      {checkUsername ? (
        <Text style={styles.textFailed}>Введите Username</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          value={password}
          secureTextEntry={seePassword}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}>
  
        </TouchableOpacity>
      </View>
      {username == '' || password == '' || checkUsername == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleLogin}>
          <Text style={styles.text}>Кіру</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Кіру</Text>
        </TouchableOpacity>

        
      )}
              <TouchableOpacity style={styles.button} onPress={()=>{navigation.replace('Register');}}>
          <Text style={styles.text}>Жүйеге тіркелу</Text>
        </TouchableOpacity>
    </View>

    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  background: {
    width: '100%',
    height: '100%'
  },
  wrapperInput: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'blue',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 10,
    width: '100%',
  },
  wrapperIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
  },
  icon: {
    width: 30,
    height: 24,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 25,
  },
  buttonDisable: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
    marginTop: 25,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: 'red',
  },
});

export default Login;