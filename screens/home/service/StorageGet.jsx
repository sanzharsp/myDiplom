
import AsyncStorage from '@react-native-async-storage/async-storage';
const getData = async () => {

   try {
    const value = await AsyncStorage.getItem('@access')
    console.log(value)
  
  } catch(e) {
    console.log(e)
  }

}

export default getData;