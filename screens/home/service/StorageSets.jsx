
import AsyncStorage from '@react-native-async-storage/async-storage';
const Storage = async (value) =>{
    try {
        const jsonValue = JSON.stringify(value.data.user)
        await AsyncStorage.setItem('@access', value.data.access);
        await AsyncStorage.setItem('@refresh', value.data.refresh);
        await AsyncStorage.setItem('@user', jsonValue)
      } catch (e) {
        console.log(e)
      }
}

export default Storage;