import axios from 'axios';
import url from '../../BackendUrl'
import AsyncStorage from '@react-native-async-storage/async-storage';



const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(
  
  async (config) => {

   config.headers = { 
     'Authorization': `Bearer ${await AsyncStorage.getItem('@access')}`

   }
   return config;
 },
 async (error) => {
    return Promise.reject(error)
 }
         
        
       );


axiosApiInstance.interceptors.response.use(
 undefined,
  async(err) => {
  const error = err.response;
  const originalRequest = error.config;

    console.log("Далбаеб")
    console.log(error.status)
  // if error is 401 
  if (error.status === 401) {

    console.log("mal")
    console.log(await AsyncStorage.getItem('@refresh'))
    axios.post(url.BaseUrl + url.Auth.refresh,{refresh: await AsyncStorage.getItem('@refresh')}).then(async(response)=>{


      await AsyncStorage.setItem('@access',response.data.access);

      error.config.headers["Authorization"]  = `Bearer ${ await AsyncStorage.getItem('@access')}`
    
      
    
    
        return  axiosApiInstance(originalRequest);
       
    }).catch( (error_data)=>{
      console.log(error_data)
    })
 } 

 return   Promise.reject(error)

});


export default axiosApiInstance;







        
