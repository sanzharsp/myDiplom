
import AsyncStorage from '@react-native-async-storage/async-storage';
const getRefr = async () => {



    return await AsyncStorage.getItem('@refresh')

  
  
}

export default getRefr;