import React, { useEffect, useState } from 'react';

import {  Layout, Text } from '@ui-kitten/components';
import {
  LineChart,

} from "react-native-chart-kit";


import {

  ScrollView
} from 'react-native';
import {Dimensions} from 'react-native';

import { VStack, Progress, NativeBaseProvider } from "native-base";
import axiosApiInstance from './service/auths';
import url from '../BackendUrl';

const HomeScreen = () => {

    const [meterData,setMeterData] = useState([])
    useEffect(()=>{
      axiosApiInstance.get(url.BaseUrl+url.meterGet)
      .then((res)=>{

          setMeterData(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })

    },[])
  
  return(
    <ScrollView >
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
<LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  
  </Layout>

  <VStack mx="4" space="md">

        <Progress colorScheme="warning" value={65} />

  </VStack>
    <Text> {meterData?.qr} </Text>


        
  </ScrollView>
  )

}


export default () => {
  return (
    <NativeBaseProvider>

          <HomeScreen />
 
 
    </NativeBaseProvider>
  );
};
