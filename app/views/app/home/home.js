import {View,Text, ImageBackground, Image, Dimensions,TouchableOpacity} from 'react-native';
import plant from '../../../assets/plant.png';
import map from '../../../assets/map.jpeg';
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';

import { Entypo,MaterialCommunityIcons } from '@expo/vector-icons';
import { Bubble, Category } from 'iconsax-react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { ArrowLeft } from 'iconsax-react-native';
export default function HomeScreen({navigation}) {
  const teddy ="https://www.teddyoweh.net/_next/static/media/oweh.43ffe13c.jpeg"
  const impact_options = [
    '1W',
    '1M',
    '3M',
    '6M',
    'All'
  ]
  function getHeightPercentage(value, maxValue) {
    const numericValue = parseFloat(value);
    const numericMaxValue = parseFloat(maxValue);
    const scaleFactor = numericMaxValue / Math.max(numericValue, numericMaxValue);
    const ans = (numericValue / numericMaxValue) * 100 * scaleFactor
    console.log('Percentage',maxValue)
    return ans;
  }
  const [selectedImpact, setSelectedImpact] = useState(impact_options[0]);

  const impact_datapoints = {
    '1W': [
      {
        title: 'CO2 Saved',
        value: '20'
      },
      {
        title: 'Recycled Items',
        value: '5'
      },
      {
        title: 'Miles Covered',
        value: '10'
      },
      {
        title: 'Energy Saved',
        value: '15'
      },
      {
        title: 'Water Saved',
        value: '25'
      },
      {
        title: 'Trees Saved',
        value: '2'
      }
    ],
    '1M': [
      {
        title: 'CO2 Saved',
        value: '40'
      },
      {
        title: 'Recycled Items',
        value: '10'
      },
      {
        title: 'Miles Covered',
        value: '20'
      },
      {
        title: 'Energy Saved',
        value: '30'
      },
      {
        title: 'Water Saved',
        value: '50'
      },
      {
        title: 'Trees Saved',
        value: '5'
      }
    ],
    '3M': [
      {
        title: 'CO2 Saved',
        value: '80'
      },
      {
        title: 'Recycled Items',
        value: '15'
      },
      {
        title: 'Miles Covered',
        value: '35'
      },
      {
        title: 'Energy Saved',
        value: '45'
      },
      {
        title: 'Water Saved',
        value: '70'
      },
      {
        title: 'Trees Saved',
        value: '10'
      }
    ],
    '6M': [
      {
        title: 'CO2 Saved',
        value: '120'
      },
      {
        title: 'Recycled Items',
        value: '20'
      },
      {
        title: 'Miles Covered',
        value: '50'
      },
      {
        title: 'Energy Saved',
        value: '60'
      },
      {
        title: 'Water Saved',
        value: '100'
      },
      {
        title: 'Trees Saved',
        value: '15'
      }
    ],
    'All': [
      {
        title: 'CO2 Saved',
        value: '160'
      },
      {
        title: 'Recycled Items',
        value: '30'
      },
      {
        title: 'Miles Covered',
        value: '40'
      },
      {
        title: 'Energy Saved',
        value: '70'
      },
      {
        title: 'Water Saved',
        value: '120'
      },
      {
        title: 'Trees Saved',
        value: '20'
      }
    ]
  };
  
  
  const [maxValue,setMaxValue] = useState(Math.max(...impact_datapoints[selectedImpact].map(data => parseFloat(data.value))))

  const [data, setData] = useState(null);

  async function getLocalData() {
    try {
      const jsonValue = await AsyncStorage.getItem('db');
      console.log('Local data:', jsonValue);
      setData(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : [];


    }
    catch(e) {
      console.log('Error reading data:', e);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const localData = await getLocalData();

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  },[]
  )
  const [sound, setSound] = useState(null);
  async function playSound(uri) {
      console.log('Loading Sound');
      try {
          const { sound } = await Audio.Sound.createAsync({ uri });
          // setSound(sound);
          sound.unloadAsync();
          
          // console.log('Playing Sound');
          // await sound.playAsync();
      } catch (error) {
          console.log('Error playing sound:', error);
      }
  }
 
  return (
    <View
    style={{
      flexDirection:'column',
      flex:1,
      backgroundColor:"#fff",
      width:'100%',
      height:'100%',
      justifyContent:'space-between',
      paddingBottom:30
    }}
    >

  
    <View source={plant} style={{width:'100%',height:'80%',
    
    backgroundColor:"#fff"
    }}> 
      <View
      style={{
       
        paddingTop:70,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingHorizontal:10,
      }}
      >
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          width:'100%',
          paddingRight:10
        }}
        >
  <View
       style={{
        flexDirection:'row',
        alignItems:'center',
       }}
       >
        <Image
        source={{uri:teddy}}
        style={{
          width:40,
          height:40,
          borderRadius:100,
          marginRight:15,
        }}
        />
      
       <View>
        <Text
        style={{
          fontSize:14,
          color:"#a3a3a3",
          fontWeight:"400",
          marginBottom:2
        }}
        >
          Welcome,
        </Text>
  
       <Text
       
       style={{
          fontSize:22,
          fontWeight:'400',
          color:'#333',
          // fontFamily:"Times New Roman"
        
       }}
       >
       Teddy Oweh
        </Text>
        </View>
       </View>
       <Category size="23" color="#333"/>
        </View>
     
       <View
      style={{
        flexDirection:'column',
        marginTop:20
      }}
      >
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
        }}
        >
          <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:"#f2f2f2",
            paddingHorizontal:20,
            paddingVertical:20,
            borderRadius:10,
            width:'75%'

      
          }}
          
          >
            <Bubble size="22" color="#333" variant='Bold'/>
            <Text
            
            style={{
              fontSize:18,
              fontWeight:'500',
              marginLeft:10
            }}
            
            >
              500g of CO2 Saved
            </Text>

          </View>
          <View
          style={{
            flexDirection:'column',
            alignItems:'center',
            backgroundColor:"#f2f2f2",
            paddingHorizontal:20,
            paddingVertical:15,
            borderRadius:10,
            width:'23%'

      
          }}
          
          >
             <Text
            
            style={{
              fontSize:16,
              fontWeight:'500',
          
            }}
            
            >
             342 
            </Text>
            <Text
            style={{
              fontSize:10,
              fontWeight:'400',
         
            
            }}
            >
              Points
            </Text>

          </View>
        </View>
        <View
        style={{
          flexDirection:'row',
          alignItems:'center',
          justifyContent:'space-between',
          marginTop:10
        }}
        >
          <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:"#f2f2f2",
            paddingHorizontal:20,
            paddingVertical:20,
            borderRadius:10,
            width:'49%'

      
          }}
          
          >
            {/* <Bubble size="22" color="#333"/> */}
            <Text
            
            style={{
              fontSize:17,
              fontWeight:'500',
              marginLeft:10
            }}
            
            >
              40 Recycled Items
            </Text>

          </View>
          <View
          style={{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:"#f2f2f2",
            paddingHorizontal:10,
            paddingVertical:20,
            borderRadius:10,
            width:'48%'

      
          }}
          
          >
            <Entypo name="location-pin" size={20} color="#333"/>
           <Text
                 style={{
                  fontSize:17,
                  fontWeight:'400',
                  marginLeft:2
                }}
           >
      
              0 miles coverage
              <Text>

              </Text>
           </Text>
          

          </View>
        </View>
      </View>
      <View
      
      style={{
        marginTop:40,
        width:'100%',
        flexDirection:'column'
      }}
      >
        <Text
        style={{
          fontSize:18,
          fontWeight:'500',
          color:'#333',
          marginBottom:10
        }}
        >
          Impact Summary
        </Text>
        <View
        style={{
          flexDirection:'column'
        }}
        >
          <View
          
          style={{
            flexDirection:'row',
            justifyContent:'center',
            marginBottom:10,
            width:'100%',
            alignItems:'center',
            backgroundColor:"#f2f2f2",
            padding:10,
            paddingHorizontal:15,
            borderRadius:60,
          }}
          >
            {
              impact_options.map((option,index)=>(
                <TouchableOpacity
                onPress={()=>{
                  setSelectedImpact(option)
                  setMaxValue(Math.max(...impact_datapoints[option].map(data => parseFloat(data.value))))
                }}
                style={{
                  padding:10,
                  borderRadius:60,
                  backgroundColor:selectedImpact==option?'#14c986':'transparent',
                  marginRight:10,
                  width:"18%",
                  alignItems:'center',
                  justifyContent:'center',
                  textAlign:'center',
                  
                }}
                
                >

                <Text
                onPress={()=>{
                  setSelectedImpact(option)
                }}
                style={{
                  fontSize:14,
                  fontWeight:'400',
                  color:selectedImpact==option?'#fff':'#333',
                  borderBottomWidth:2,
                  borderBottomColor:selectedImpact==option?'#333':'transparent'
                }}
                key={index}
                >
                  {option}
                </Text>
                </TouchableOpacity>
              ))
            }

          </View>
          <View
          style={{
            flexDirection:'row',
            marginTop:10,
            justifyContent:'space-between',
            alignItems:'flex-end',
            paddingTop:10,
            height:250
          
          }}
          >
            {
              impact_datapoints[selectedImpact].map((data,index)=>(
              <View
              style={{
                flexDirection:'column',
                justifyContent:'flex-end',
                alignItems:'center',
                width:"14%",
                height:"100%",
              
              }}
              >

                <View
                key={index}
                style={{
                  flexDirection:'row',
                  justifyContent:'space-between',
                  alignItems:'center',
                  padding:10,
                  backgroundColor:parseInt(data.value)==maxValue?"#14c986":"#f2f2f2",
                  borderRadius:10,
                  marginBottom:10,
                  width:"90%",
                  height:`${getHeightPercentage(data.value,maxValue)}%`,
                }}
                >
                  {/* <Text
                  style={{
                    fontSize:14,
                    fontWeight:'400',
                    color:'#333'
                  }}
                  >
                    {data.title}
                  </Text>
                  <Text
                  style={{
                    fontSize:14,
                    fontWeight:'500',
                    color:'#333'
                  }}
                  >
                    {data.value}
                  </Text> */}
                </View>
                </View>
              ))
            }
          </View>

        </View>
        

      </View>
       

      </View>
    </View>
    <View
    style={{
      flexDirection:'column',
      alignItems:'center',
 
      justifyContent:'center',
    }}
    >
   <TouchableOpacity
        style={{
            width:'90%',
        backgroundColor:"#14c986",
        borderRadius:10,
        paddingVertical:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        }}
        onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate('ScanStacks');
        
        }}>
     <MaterialCommunityIcons name="line-scan"  size={24} color={'#fff'}/>
            <Text style={{
                textAlign:'center',
                fontSize:20,
                fontWeight:'400',
                color:'#fff',
                marginLeft:10
        

                
            }}>
                Scan
            </Text>
        </TouchableOpacity>
 
    </View>
    </View>
  );
}