import { BlurView } from 'expo-blur';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ImagePicker } from 'expo-image-picker'; // Import ImagePicker from Expo
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import { api, endpoints } from '../../../config/server';
export default function ScanScreen({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
    const [loading, setLoading] = useState(false);
  if (!permission) {
   
    return <View />;
  }

  if (!permission.granted) {
 
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  const takePicture = async () => {
    if (!camera) return;

    try {
      const photo = await camera.takePictureAsync();
      setLoading(true);
      console.log('Photo taken: ', photo);
        await uploadToCloudinary(photo.uri);
   
    } catch (error) {
      console.error('Failed to take picture: ', error);
      Alert.alert('Error', 'Failed to take picture. Please try again.');
    }
  };

  const uploadToCloudinary = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', { uri: imageUri, name: 'photo.jpg', type: 'image/jpeg' });
    formData.append('upload_preset', 'e4rpkaay');

    try {
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dqclsnpy9/image/upload',
        formData
      );
      setLoading(true);
         navigation.navigate('ResultsScreen',{
            url:cloudinaryResponse.data.url
            
        });
      // Handle success
    } catch (error) {
      console.error('Failed to upload image to Cloudinary: ', error);
      // Handle error
    }
  };
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}
      
      ref={(ref) => setCamera(ref)}

      focusDepth={1}
      focusable={true}
 
      
      >
       
      </Camera>
      <BlurView
        tint="light"
        intensity={50}
      style={{
        backgroundColor:'transparent',
        height:'12%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
 
      }}
      >
        <TouchableOpacity
        style={{
            width:'80%',
        backgroundColor:loading==true?'#a4d6c4':"#14c986",
        borderRadius:30,
        paddingVertical:15,
        }}
        onPress={()=>{
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            takePicture();
        
        }}>
    
            <Text style={{
                textAlign:'center',
                fontSize:20,
                fontWeight:'400',
                color:'#fff',
        

                
            }}>
                {loading==true?'Loading...':'Scan'}
            </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  camera: {
    flex: 1,
    height:'60%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
