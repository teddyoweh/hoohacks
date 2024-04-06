import { BlurView } from 'expo-blur';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import { api, endpoints } from '../../../config/server';

export default function ScanScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setLoading(true);
 
        await uploadToCloudinary(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Failed to pick an image: ', error);
      Alert.alert('Error', 'Failed to pick an image. Please try again.');
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
      setLoading(false);
      navigation.navigate('ResultsScreen', {
        url: cloudinaryResponse.data.url
      });
    } catch (error) {
      console.error('Failed to upload image to Cloudinary: ', error);
      setLoading(false);
      Alert.alert('Error', 'Failed to upload image to Cloudinary. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.imageButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            pickImage();
          }}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Choose Image'}</Text>
        </TouchableOpacity>
      </View>

      <BlurView
        tint="light"
        intensity={50}
        style={styles.blurContainer}>
        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            // Call your scan function here
          }}>
          <Text style={styles.buttonText}>Scan</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageButton: {
    backgroundColor: '#14c986',
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  blurContainer: {
    height: '12%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: '80%',
    backgroundColor: '#14c986',
    borderRadius: 30,
    paddingVertical: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
  },
});
