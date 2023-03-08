



import React, {useEffect,useState} from 'react';
import axios from 'axios'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView

} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import url from '../BackendUrl'
import { useNavigation } from '@react-navigation/native';
import { Text as Txt} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Register = ()=> {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(true);
  const [checkUsername, setCheckUsername] = useState(false);
  const [last_name,setLast_name ] = useState('');
  const [first_name,setFirst_name ] = useState('');
  const [surname,setSurname ] = useState('');
  const [email,setEmail ] = useState('');
  const [roomNumber,setRoomNumber] = useState('');
  const [nameResidentialComplex,setNameResidentialComplex] = useState(0);
  const [Named,setNamed] = useState([]);

  useEffect(()=>{
    axios.get(`${url.BaseUrl}${url.get_residental}`).then((response)=>{
      setNamed(response.data)
    }).catch((err)=>{
      console.log(err)

    })

  },[])

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
      return 'Құпия сөзде бос орындар болмауы керек.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Құпия сөз кемінде бір бас әріптен тұруы керек.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Құпия сөзде кемінде бір кіші әріп болуы керек.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Құпия сөзде кемінде бір сан болуы керек.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Құпия сөз ұзындығы 8-16 таңба болуы керек.';
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
        await axios.post(`${url.BaseUrl}${url.Auth.register}`,{
        username: username,

        password: password,
        first_name:first_name,
        last_name:last_name,
        surname:surname,
        email:email,
        password:password,
        nameResidentialComplex:nameResidentialComplex,
        roomNumber:roomNumber




      })
        .then(async (result) => {
          if (result.status == 201) {
        
            const jsonValue = JSON.stringify(result.data.user)
            await AsyncStorage.setItem('@access', result.data.access);
            await AsyncStorage.setItem('@refresh', result.data.refresh);
            await AsyncStorage.setItem('@user', jsonValue)


            navigation.replace('Home');
          }
        })
        .catch(function(error) {
console.log(error.response)
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
    source={{}}
    style={styles.background}
  >
    <ScrollView >
    <View style={styles.container}>
    <Txt style={{textAlign:'center',color:'black'}}  variant="headlineLarge">QUANTUM REGISTER</Txt>
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
        <Text style={styles.textFailed}>Username ді еңгізініз</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
        <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Құпия сөз"
          value={password}
          secureTextEntry={seePassword}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => setSeePassword(!seePassword)}>
  
        </TouchableOpacity>
      </View>

      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Аты"
          value={first_name}
          onChangeText={text => setFirst_name(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Тегі"
          value={last_name}
          onChangeText={text => setLast_name(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Әкесінің аты"
          value={surname}
          onChangeText={text => setSurname(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}>
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Электронды пошта"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}>
        </TouchableOpacity>
      </View>
            <View style={styles.wrapperInput}>
        <TextInput
          style={styles.input}
          placeholder="Пәтер нөмірі"
          value={roomNumber}
          onChangeText={text => setRoomNumber(text)}
        />
        <TouchableOpacity
          style={styles.wrapperIcon}>
        </TouchableOpacity>

      </View>
      
      <View style={styles.selected}>
      <Picker
        selectedValue={nameResidentialComplex}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setNameResidentialComplex(itemValue)}
      >
        {
        Named.map((res)=> <Picker.Item key ={res.id} label={res.name} value={res.id}/>)
        }   
      </Picker>
      
      </View>
      {username == '' || password == '' || checkUsername == true ? (
        <TouchableOpacity
          disabled
          style={styles.buttonDisable}
          onPress={handleLogin}>
          <Text style={styles.text}>Тіркелу</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Тіркелу</Text>
        </TouchableOpacity>
      )}
          <TouchableOpacity style={styles.button} onPress={()=>{navigation.replace('Login');}}>
          <Text style={styles.text}>Жүйеге кіру</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    </ImageBackground>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 25,
    top:50,
    with:'100%',
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
  selected: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'blue',
    marginTop: 10,
 
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
  background: {
    width: '100%',
    height: '100%'
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

export default Register;