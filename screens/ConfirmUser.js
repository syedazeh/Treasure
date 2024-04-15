import React, { useEffect, useState } from "react";
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

import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

//same concept as confirm.js
//but this page is for detailsdatetime.js
//once the user has entered their info they wont be required to do it again
//instead they get asked to just pick the date and time
//but all detaisl including address and date and time are asked for confirmation
const ConfirmUser = ({ route, navigation }) => {
  const [userEmail, setUserEmail] = useState(route.params.email);

  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [street, setStreet] = useState();
  const [zone, setZone] = useState();
  const [bldg, setBldg] = useState();
  const [floor, setFloor] = useState();
  const [flat, setFlat] = useState();

  //useEffect
  //reads info from database and prints on page
  useEffect(() => {
    const readAllWhere = async () => {
      //gets data from users table where email == current logged in user
      const q = query(
        collection(db, "users"),
        where("email", "==", userEmail)
      );
      const docs = await getDocs(q);
      console.log("docs.empty:", docs.empty);

      //sets all the values to display for confirmation
      docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        console.log(doc.data().city);
        setCity(doc.data().city);
        setArea(doc.data().area);
        setStreet(doc.data().street);
        setZone(doc.data().zone);
        setBldg(doc.data().bldg);
        setFloor(doc.data().floor);
        setFlat(doc.data().flat);
      });
    };
    readAllWhere().catch(console.error);
  }, [flat]);

  //stores all data in array
  const array = [
    { title: "City", value: city },
    { title: "Area", value: area },
    { title: "Zone", value: zone },
    { title: "Street", value: street },
    { title: "Building", value: bldg },
    { title: "Floor", value: floor },
    { title: "Flat", value: flat },
    { title: "Date", value: route.params.date },
    { title: "Time", value: route.params.time },
  ];

  //add data to table orders
  const add = async () => {
    const docRef = await addDoc(collection(db, "orders"), {
      date: route.params.date,
      time: route.params.time,
      charity: route.params.name,
      email: route.params.email,
      country: route.params.country,
      trackID: route.params.trackID,
    });
    console.log("Document written with ID: ", docRef.id);


    navigation.navigate("Complete", { email: route.params.email, trackID: route.params.trackID });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: 1500 }}>
        <Text
          variant="headlineMedium"
          style={{ alignSelf: "center", marginTop: 20 }}
        >
          Please confirm your address and pick-up date and time.
        </Text>

        <Text style={{ margin: 10 }}></Text>
        <View style={{ width: "90%", alignSelf: "center" }}>
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

          {/* when confirm button is pressed, the add() function is called */}

          <Pressable style={styles.button} onPress={() => add()}>
            <Text variant="titleSmall" style={{ color: "white" }}>
              CONFIRM
            </Text>
          </Pressable>

          <View style={{ margin: 20 }}></View>

          {/* user can make changes and go back */}
          <Text style={{ textAlign: "center" }}>
            Need to make date and time changes?{" "}
          </Text>
          <Text></Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text variant="titleSmall" style={{ color: "white" }}>
              GO BACK TO DATE AND TIME
            </Text>
          </Pressable>

          <View style={{ margin: 20 }}></View>

          {/* user can make address changes that takes them to edit address page */}

          <Text style={{ textAlign: "center" }}>
            Need to make address changes?{" "}
          </Text>
          <Text></Text>

          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("EditAddress")
            }
          >
            <Text variant="titleSmall" style={{ color: "white" }}>
              EDIT ADDRESS
            </Text>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
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
