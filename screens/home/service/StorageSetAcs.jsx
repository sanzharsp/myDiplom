
import AsyncStorage from '@react-native-async-storage/async-storage';
const Storage = async (value) =>{
    try {

        await AsyncStorage.setItem('@access', value.data.access);

      } catch (e) {
        console.log(e)
      }
}

export default Storage;