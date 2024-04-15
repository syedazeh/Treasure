import { Text, StyleSheet, View, Image, Button, Pressable } from "react-native";
import React, { Component, useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "react-native-vector-icons";
import { auth } from "../config";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

//add imgae , personal info
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";

import { useIsFocused } from "@react-navigation/native";

//user can choose and image to set
//user can click to see personal info and order history
const Profile = ({ navigation }) => {
  let user = auth?.currentUser?.email;

  //sign out function
  const onSignOut = () => {
    signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => console.log("Error logging out: ", error));
  };

  const emptyUser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
  const [image, setImage] = useState("");
  console.log("image first: ", image);

  //is focused is used with use effect to re-render the page everytime you come on it
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      read();
    }
  }, [isFocused]);


  const read = async () => {
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setImage(docSnap.data().image);
      console.log("read image:", image)
    } else {
      console.log("No such document!");
    }
  };

  const pickImage = async () => {
    console.log("pick image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    if (!result.cancelled) {
      setImage(result.uri);
      console.log("set image uri: ", image);
      console.log('result.uri', result.uri)
      //update function
      const docRef = doc(db, "users", user);
      await setDoc(docRef, { image: result.uri },{ merge: true })
        .then(() => {
          //setImage(result.uri);
          console.log("data updated for image");
        })
        .catch((error) => {
          console.log(error.message);
        });
     }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          style={{ width: 200, height: 200, borderRadius: 300 / 2 }}
          source={{ uri: image == "" ? emptyUser : image }}
        />

        <Pressable onPress={pickImage}>
          <Image
            style={styles.addImage}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/61/61183.png",
            }}
          />
        </Pressable>
      </View>

      <View style={{ margin: 30 }}></View>

      <View style={styles.viewButton}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("PersonalInfo")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text style={styles.textButton}>Personal Information</Text>
            <AntDesign
              name="right"
              size={30}
              style={{ alignSelf: "flex-end", color: "white" }}
            ></AntDesign>
          </View>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("History")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Text style={styles.textButton}>Donations History</Text>
            <AntDesign
              name="right"
              size={30}
              style={{ alignSelf: "flex-end", color: "white" }}
            ></AntDesign>
          </View>
        </Pressable>

        <Pressable style={styles.button2} onPress={() => onSignOut()}>
          <Text style={styles.text2}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  addImage: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    alignSelf: "flex-end",
  },
  ImageContainer: {
    width: 200,
  },
  viewButton: {
    alignItems: "flex-start",
    width: "90%",
  },
  button: {
    backgroundColor: "green",
    width: "100%",
    padding: 20,
    borderRadius: 200 / 2,
    margin: 10,
  },
  textButton: {
    color: "white",
    fontSize: 20,
  },
  button2: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    marginVertical: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "green",
    alignSelf: "center",
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "green",
    alignSelf: "center",
  },
});
