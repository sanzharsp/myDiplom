;import { View, StyleSheet,Text } from "react-native";
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import axiosApiInstance from "../../screens/home/service/auths";
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from "../../screens/BackendUrl";
import { useNavigation } from '@react-navigation/native';
import { Button as UiKitButton, Card, Modal, Text as UiKittenText } from '@ui-kitten/components';
const QR = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const [QrCodeerror, setQrCodeerror] = React.useState(false);
  const [errorData, setErrorData] = React.useState('');
  const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    console.log(JSON.parse(await AsyncStorage.getItem('@user')).username)
    if (data.indexOf('QRQUANTUM') === 0){
      //QRQUANTUM=id_in_electron=1
    axiosApiInstance.post(url.BaseUrl+url.QrAdd,{
       id_in_electron:data.replace(/QRQUANTUM=id_in_electron=/g, ''),
       username:JSON.parse(await AsyncStorage.getItem('@user')).username
     }).then((data)=>{
       if(data.status){
        navigation.replace('Profile');
       }
    }).catch((err)=>{
    
       if(err.status === 409){
        setErrorData('😲 Сізде ол электр есептегіш тіркелінген)')
        setQrCodeerror(true)
       }
       if(err.status === 404){
        setErrorData('😔 Жүйеде берілген электр есептегіш жоқ(')
        setQrCodeerror(true)
       }
     })
    
    }
    else setVisible(true)
    
    
    
  };
if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
}
if (hasPermission === false) {
    return <Text>No access to camera</Text>;
}
  return (
    <View style={styles.container}>
            <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <UiKittenText style={{padding:20}}>🧐 QR код Quantum QR аталығына жатпайды </UiKittenText>
          <UiKitButton appearance='outline' status='info' onPress={() => setVisible(false)}>
            Түсінікті
          </UiKitButton>
        </Card>
      </Modal>
      <Modal
        visible={QrCodeerror}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setQrCodeerror(false)}>
        <Card disabled={true}>
          <UiKittenText style={{padding:20}}> {errorData}</UiKittenText>
          <UiKitButton appearance='outline' status='danger' onPress={() => setQrCodeerror(false)}>
            Түсінікті
          </UiKitButton>
        </Card>
      </Modal>
    <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    >
    <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
    </BarCodeScanner>
    {scanned &&  
    <Button style={styles.submitButton} variant="outlined"  color="red" title="Қайта көру" trailing={props => <Icon name="qrcode" {...props} />} onPress={() => setScanned(false)} /> }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  submitButton: {
      top:200

    },

    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default QR;


;