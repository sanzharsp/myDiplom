
import AsyncStorage from '@react-native-async-storage/async-storage';
const getUser = async () => {

  const value  = await AsyncStorage.getItem('@user')
  return  value
    

}

export default getUser;