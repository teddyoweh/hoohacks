import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity,Button } from "react-native";
import axios from "axios";
import { api, endpoints } from "../../../config/server";
import { Video,Audio,ResizeMode } from 'expo-av';
import { ArrowLeft, Award } from "iconsax-react-native";
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressCircle from 'react-native-progress-circle'

export default function ResultsScreen({ navigation, route }) {
    const { url } = route.params;
   

    const [audioUrl, setAudioUrl] = useState(null);
    const [data, setData] = useState(null);
    const [sound, setSound] = useState(null);
    async function playSound(uri) {
        console.log('Loading Sound');
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            setSound(sound);
            
            console.log('Playing Sound');
            await sound.playAsync();
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    }
    
      const appendToMyArr = async (value) => {
        
        let currentArr = [];
        try {
          const jsonValue = await AsyncStorage.getItem('db');
          currentArr = jsonValue != null ? JSON.parse(jsonValue) : [];
        }
        catch(e) {
          console.log('Error reading data:', e);
        }
    
         try {
          await AsyncStorage.setItem('db', JSON.stringify([...currentArr, value]));
        } catch (error) {
          console.error('Error saving data:', error);
        }
      };
    async function deleteStorage() {
        try {
          await AsyncStorage.removeItem('db');
        } catch (error) {
          console.error('Error clearing app data:', error);
        }
      

    }

     useEffect(() => {
        return sound

            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

 
    
    useEffect(() => {
        async function fetchData() {
            try {
                console.log(endpoints.scanImg);

                const response = await axios.post(
                    endpoints.scanImg,
                    { uri: url },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': "*/*",
                            'Access-Control-Allow-Origin': '*',
                        }
                    }
                );

                console.log('Scan results: ', response.data);
                setData(response.data);
                playSound(response.data.message.audio);
                appendToMyArr(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        //data == null && playSound("https://res.cloudinary.com/dqclsnpy9/video/upload/v1711290785/oggusgyoptpviqk9cyju.mp3");
        playSound("https://res.cloudinary.com/dqclsnpy9/video/upload/v1711290785/oggusgyoptpviqk9cyju.mp3");
        url && fetchData();
    }, []);
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    return (
        <View
        style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            paddingTop:60,
            paddingHorizontal:20,
            backgroundColor: '#fff',
        
        }}
        
        >
            <View>
                <TouchableOpacity onPress={()=>{
                    sound && sound.stopAsync();
                    // // go two screens back
                    // navigation.goBack();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                   navigation.navigate('AppTabs');
                }}
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'center',
                   height:45,
                   width:45,
                     borderRadius:100,
                        backgroundColor:'#f2f2f2',
                
                }}
                >
                   <ArrowLeft size="26" color="#333"/>
                </TouchableOpacity>
            </View>
            {
                data ?
       
            <View>
                <View
                style={{
                    justifyContent:'center',
                    alignItems:'center',
                    marginTop:20,
                }}
                >
                <ProgressCircle
            percent={data.message.point*10}
            radius={100}
            borderWidth={10}
            color="#14c986"
            shadowColor="#eee"
            bgColor="#fff"
        >
            <View
            style={{
                justifyContent:'center',
                alignItems:'center',
            
            }}
            >
            <Text style={{ fontSize: 78,color:"#14c986",fontWeight:'600' }}>{data.message.point*10}</Text>
            <Text
            style={{
                fontSize: 26,
                color:"#14c986",
                fontWeight:'500'
            }}
            >
                points
            </Text>
            </View>
        </ProgressCircle>
                </View>
                <Text
                style={{
                    textAlign:'center',
                    fontSize:35,
                    fontWeight:'500',
                    color:'#333',
                    marginTop:20,
                    // fontFamily:'Times New Roman',
                }}
                
                >
                    {data.message.description}
                </Text>
                <Text
                style={{
                    textAlign:'center',
                    fontSize:16,
                    color:'#333',
                    marginTop:10,
                    marginBottom:20,
                    fontWeight:'300'
                }}
                >
                    {data.message.why}
                </Text>
<View
style={{
    marginTop:20,

}}
>
    <Text
    style={{
        fontSize:20,
        color:'#333',
        fontWeight:'500',
        marginBottom:20
    }}
    >
        Rewards
    </Text>
    {
        data.message.rewards.map((item, index) => {
            return (
                <View
                key={index}
                style={{
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'flex-start',
                    paddingVertical:10,
                    paddingHorizontal:10,
                    borderRadius:10,
                    backgroundColor:'#14c98617',
                    marginBottom:10,
                    borderWidth:1,
                    borderColor:'#14c986',
                  
                    
              
                }}
                >
                    <Award size="32" color="#14c986"/>
                    <Text
                    style={{
                        fontSize:16,
                        color:'#14c986',
                        marginLeft:5
                    }}
                    >
                        {item}
                    </Text>
                </View>
            )
        })
    
    }
</View>
            </View>
            :
            <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
            
            }}
            >

            <Text>
                Loading...
            </Text>
            </View>
                 }
             
    
         
        </View>
    );
}
