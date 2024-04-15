import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import { Divider, Text } from "react-native-paper";
import { add } from "react-native-reanimated";

import { addDoc, collection } from "firebase/firestore";
import { db } from '../config'

import { auth } from "../config";
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";

//the confirm page will confirm the details of address and/or date-time pickup
//if the user presses confirm then the data gets added to the database
//the user also has the chance to go back and make changes if necessary
const Confirm = ({ route, navigation }) => {

  //array storing all data passed from details.js page
  const array = [
    { title: "City", value: route.params.city },
    { title: "Area", value: route.params.area },
    { title: "Zone", value: route.params.zone },
    { title: "Street", value: route.params.street },
    { title: "Building", value: route.params.bldg },
    { title: "Floor", value: route.params.floor },
    { title: "Flat", value: route.params.flat },
    { title: "Date", value: route.params.date },
    { title: "Time", value: route.params.time },
  ];

  const city =  route.params.city
  const area = route.params.area
  const street = route.params.street
  const zone = route.params.zone
  const bldg = route.params.bldg
  const flat = route.params.flat
  const floor = route.params.floor 

  const add = async () => {
    //once the confirm button is pressed the details are added to the database in the orders table
    const docRef = await addDoc(collection(db, "orders"), {
      date: route.params.date,
      time: route.params.time,
      charity: route.params.name,
      email: route.params.email,
      country: route.params.country,
      trackID: route.params.trackID //also acts as an OrderId
    });
    console.log("Document written with ID: ", docRef.id);

    update()
    
    navigation.navigate("Complete", { email: route.params.email, trackID: route.params.trackID });
  }

  const update = async () => {
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "users", user);
    await setDoc(docRef, { city: city, area: area, zone: zone, bldg: bldg, floor: floor, flat: flat, street: street },{ merge: true })
      .then(() => {
        console.log("data updated");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: 1300 }}>
        <Text
          variant="headlineMedium"
          style={{ alignSelf: "center", marginTop: 20 }}
        >
          Please confirm your address and pick-up date and time.
        </Text>
        <Text style={{ margin: 10 }}></Text>
        <View style={{ width: "90%", alignSelf: "center" }}>
          {/* maps over array and displays all entered details from details.js */}
          {array.map((item, index) => {
            return (
              <View key={index} style={{ textAlign: "center" }}>
                <Text variant="titleMedium" style={styles.text}>
                  {item.title}
                </Text>
                <Text style={styles.text}>{item.value}</Text>
                <Divider style={{ borderColor: "black" }}></Divider>
              </View>
            );
          })}

          <View style={{ margin: 20 }}></View>

          {/* if user presses confirm the function called will be add() */}
          <Pressable
            style={styles.button}
            onPress={() => add()}
          >
            <Text variant="titleSmall" style={{ color: "white" }}>
              CONFIRM
            </Text>
          </Pressable>

          <View style={{ margin: 20 }}></View>

          {/* user can go back if they want to make some changes */}
          <Text style={{ textAlign: 'center' }}>Need to make some changes? </Text>
          <Text></Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate('Details', { name: route.params.name, email: route.params.email, country: route.params.country })
            }
          >
            <Text variant="titleSmall" style={{ color: "white" }}>
              GO BACK
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    //padding: 20,
    margin: 10,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 400 / 2,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
  },
});
