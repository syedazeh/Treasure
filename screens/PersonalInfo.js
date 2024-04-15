import {
  StyleSheet,
  View,
  Image,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import React, { Component, useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from "react-native-paper";
import { Card, Header, Divider } from "@rneui/themed";
// import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

import { auth } from "../config";
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";

import { useIsFocused } from "@react-navigation/native";

const PersonalInfo = ({ navigation }) => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  let user = auth?.currentUser?.email;

  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [dob, setdob] = useState();
  const [country, setCountry] = useState();

  const account = [
    { title: "Email", value: user },
    { title: "Name", value: name },
    { title: "Gender", value: gender },
    { title: "Date of Birth", value: dob },
    { title: "Nationality", value: country },
  ];

  const [city, setCity] = useState();
  const [area, setArea] = useState();
  const [street, setStreet] = useState();
  const [zone, setZone] = useState();
  const [bldg, setBldg] = useState();
  const [floor, setFloor] = useState();
  const [flat, setFlat] = useState();

  const address = [
    { title: "City", value: city },
    { title: "Area", value: area },
    { title: "Street Number", value: street },
    { title: "Zone Number", value: zone },
    { title: "Building Number", value: bldg },
    { title: "Floor Number", value: floor },
    { title: "Flat Number", value: flat },
  ];

  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("reloaded");

    // Call only when screen open or when back on screen
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
      setName(docSnap.data().name);
      setCountry(docSnap.data().country);
      setGender(docSnap.data().gender);
      setdob(docSnap.data().DoB);

      setArea(docSnap.data().area);
      setZone(docSnap.data().zone);
      setStreet(docSnap.data().street);
      setFlat(docSnap.data().flat);
      setFloor(docSnap.data().floor);
      setBldg(docSnap.data().bldg);
      setCity(docSnap.data().city);
    } else {
      console.log("No such document!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 40 }}></View>

      <Text variant="headlineLarge" style={{ marginBottom: 10 }}>
        Personal Information
      </Text>

      <View style={{ width: "90%" }}>
        {/* displays both account info and order history and profile picture */}
        <ScrollView contentContainerStyle={{ height: 1700 }}>
          <List.Section>
            <List.Accordion title="Account">
              <View style={{ width: "100%", margin: 30 }}>
                {account.map((item, index) => {
                  return (
                    <View key={index}>
                      <Text variant="titleMedium" style={{ margin: 20 }}>
                        {item.title}
                      </Text>
                      <Text>{item.value}</Text>
                      <Divider></Divider>
                    </View>
                  );
                })}
                <Pressable
                  style={styles.button}
                  onPress={() => navigation.navigate("EditAccount")}
                >
                  <Text style={styles.text}>Edit</Text>
                </Pressable>
              </View>
            </List.Accordion>
            <Divider></Divider>
            <List.Accordion title="Address">
              <View style={{ width: "100%", margin: 30 }}>
                {address.map((item, index) => {
                  return (
                    <View key={index}>
                      <Text variant="titleMedium" style={{ margin: 20 }}>
                        {item.title}
                      </Text>
                      <Text>{item.value}</Text>
                      <Divider></Divider>
                    </View>
                  );
                })}
                <Pressable
                  style={styles.button}
                  onPress={() => navigation.navigate("EditAddress")}
                >
                  <Text style={styles.text}>Edit</Text>
                </Pressable>
              </View>
            </List.Accordion>
          </List.Section>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.text}>Back to Profile</Text>
      </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
    backgroundColor: "green",
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
  },
  button: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
    backgroundColor: "green",
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
  },
});
