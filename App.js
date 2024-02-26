import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [image, setImage] = useState(null);
  const [dogo, setDogo] = useState(null);
  const [error, setError] = useState(null)

  //Ontener una imagen desde el dispositivo
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  //Obtener los perros desde DOG API

  const getDogos = async () =>{
    try {
      const res =  await fetch(`https://dog.ceo/api/breeds/image/random`)
      const data = await res.json()
      setDogo(data.message)
      setError(null)
    } catch (err) {
      setError("Error finding dogos data")
    }
  }

  return (
    <>
      
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {dogo ? 
            <Image source={{uri : dogo}} style={{ width: 200, height: 200 }}></Image>
          : 
            <Text>DOGOS EVERYWHERE!</Text>
        }
        <TouchableOpacity style={styles.button} onPress={getDogos}>
          <Text>Get Dogos</Text>
        </TouchableOpacity>
        {error && <Text>{error}</Text>}

        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: 25
  },
  image: {
    marginTop: 40,
    width: 200,
    height: 300
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#dfe6e9",
    textAlign: "center",
    padding: 10
  },
  textContainer:{
    alignItems: "center",
      justifyContent: "center",
      width: "80%",
      height: "55%",
      backgroundColor: '#e2e8e1',
      padding: 15,
      borderRadius: 50
  },
  button:{
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 10
  },
  textInput:{
    backgroundColor: "white",
    borderRadius: 10,
    height: 40,
    width: 120,
    textAlign: "center"
  },
});
