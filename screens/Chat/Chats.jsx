import React, {useEffect,useState } from 'react';
import LottieView from "lottie-react-native";

import {
  ScrollView
} from 'react-native';

import axiosApiInstance from '../home/service/auths';
import url from '../BackendUrl';
import { Box, Heading, AspectRatio, Image, Text, Center, HStack, Stack, NativeBaseProvider,ZStack} from "native-base";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Chats = () => {

  const [data,setData] = useState([]);
  const [liked, setLiked] = useState(false);
  const [load, setLoad] = useState(true);
  useEffect(()=>{
  axiosApiInstance.get(url.BaseUrl + url.getNews).then((res)=>{
    console.log(res.data);
    setData(res.data);
    setLoad(false)
  }).catch((err)=>{
    console.log(err)
    setLoad(false)
  })
},[liked])

  
  
  return(
    <>
    {
      load
      ?
    <LottieView
    source={require("../../assets/136811-waiting-status-feedback.json")}
    autoPlay
  />
  :
    <ScrollView >

  {
    data.map((data)=>{

      return(
  <Box alignItems="center">
      <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
      borderColor: "coolGray.600",
      backgroundColor: "gray.700"
    }} _web={{
      shadow: 2,
      borderWidth: 0
    }} _light={{
      backgroundColor: "gray.50"
    }}>
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image source={{
            uri: `${url.BaseUrl}${data.image}` 
          }} alt="image" />
          </AspectRatio>
          <Center bg="violet.500" _dark={{
          bg: "violet.400"
        }} _text={{
          color: "warmGray.50",
          fontWeight: "700",
          fontSize: "xs"
        }} position="absolute" bottom="0" px="3" py="1.5">
            ФОТО
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {data.name}
            </Heading>
            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {data.subNamed}
            </Text>
          </Stack>
          <Text fontWeight="400">
           {data.description}
          </Text>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center">
              <Text color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="400">
               {data.date_create_news}
               <Pressable        
                        
                        style={{float:'right'}}
                        onPress={() => {
                        axiosApiInstance.post(url.BaseUrl+ url.likeAdd,
                          {
                            post:data.id,
                          }
                          )
                          .then((res)=>{
                          console.log(res)
                          setLiked((isLiked) => !isLiked)
                        }).catch((err)=>{
                          console.log(err)
                        })
                    }}>
                      <MaterialCommunityIcons
               
                      name={liked ? "heart" : "heart-outline"}
                      size={20}
                      color={liked ? "red" : "black"}> 
                      <Text style={{  fontSize: 13,}}>{data.likes.length}</Text>
                      
                      </MaterialCommunityIcons>
              </Pressable>
           
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Box>
      )
    })
}
  </ScrollView>
}
</>
  )

}


export default () => {
  return (
    <NativeBaseProvider>

          <Chats />
 
 
    </NativeBaseProvider>
  );
};
