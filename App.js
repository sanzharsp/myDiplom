import HomeScreen from './screens/home/home'
import Header from './components/Header/header'
import QR from './components/QrScanner/qr'
import React from 'react';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import {IconRegistry, ApplicationProvider  } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/home/auth'
import Register from './screens/home/register'
import Profile from './screens/home/Profile'
import Chats from './screens/Chat/Chats';


export default function App() {
  const Stack = createNativeStackNavigator();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  
  const Refs = (value)=>{
    setSelectedIndex(value)
  }
  
  return (
  
      <>
       <IconRegistry icons={EvaIconsPack} />
       <ApplicationProvider {...eva} theme={eva.light} >
        <NavigationContainer>

       <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Qr" component={QR} />
        <Stack.Screen options={{headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false }} name="Register" component={Register} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name = "Chats" component={Chats}/> 
        
        
    
      </Stack.Navigator>
      <Header setValue ={Refs} Value={selectedIndex}/>

      </NavigationContainer>
       

       </ApplicationProvider>
       </>
     
      
  );
  
}



