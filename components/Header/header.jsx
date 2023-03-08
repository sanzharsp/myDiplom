


import React,{useEffect} from 'react';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Header = ({setValue,Value}) => {
    const navigation = useNavigation();

   
    useEffect( ()=>{
    if (Value === 0){
       navigation.navigate('Home')
    }
    if (Value === 1){
       navigation.navigate('Qr')
    }
    if (Value === 2){
       navigation.navigate('Profile')
    }
    if (Value === 3){
       navigation.navigate('Chats')
    }
    if (Value === 4){
       navigation.navigate('Login')
    }
    if (Value === 5){
       navigation.navigate('Register')
    }
    

  },[Value])
  return (
    <>
    <BottomNavigation
      selectedIndex={Value}
      onSelect={index => {setValue(index)}}>
      <BottomNavigationTab icon={<AntDesign name="home" size={24} color="black" />} title='Басты бет' />
      <BottomNavigationTab icon={<AntDesign name="qrcode" size={24} color="black" />} title='Quantum QR'/>
      <BottomNavigationTab icon={<FontAwesome5 name="user-edit" size={24} color="black" />} title='Профиль'/>
      <BottomNavigationTab icon={<AntDesign name="message1" size={24} color="black" />} title='Хабарламалар'/>
      <BottomNavigationTab icon={<AntDesign name="login" size={24} color="black" />} title='Кіру' />
      <BottomNavigationTab icon={<MaterialCommunityIcons name="login-variant" size={24} color="black" />} title='Тіркелу' />
    </BottomNavigation>
    </>
  );
};


export default Header;