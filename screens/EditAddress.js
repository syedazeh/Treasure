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
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import { Text, TextInput, HelperText } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { auth } from "../config";
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";

//this page is for editing the address
const EditAddress = ({ route, navigation }) => {
  //update button goes here
  //if email exists, then update, else add

  // drop down

  const [city, setCity] = useState();
  const [area, setArea] = useState();

  // text input

  const [street, setStreet] = useState();
  const [zone, setZone] = useState();
  const [bldg, setBldg] = useState();
  const [floor, setFloor] = useState();
  const [flat, setFlat] = useState();

  // console.log(city, area, street, zone, bldg, floor, flat);

  // dropdown

  const cityData = [
    { label: "Doha", value: "Doha" },
    { label: "Al Rayyan", value: "Al Rayyan" },
    { label: "Al Wakrah", value: "Al Wakrah" },
  ];

  const DohaAreas = [
    { label: "Al Bidda", value: "Al Bidda" },
    { label: "Al Dafna", value: "Al Dafna" },
    { label: "Ad Dawhah al Jadidah", value: "Ad Dawhah al Jadidah" },
  ];

  const RayyanAreas = [
    { label: "Ain Khaled", value: "Ain Khaled" },
    { label: "Dukhan", value: "Dukhan" },
    { label: "Al Mamoura", value: "Al Mamoura" },
  ];

  const WakrahAreas = [
    { label: "Khawr al Udayd", value: "Khawr al Udayd" },
    { label: "Al Karaana", value: "Al Karaana" },
    { label: "Al Kharrara", value: "Al Kharrara" },
  ];

  const [error, setError] = useState("");

  const save = async () => {
    if (!city || !area || !street || !zone || !bldg || !floor || !flat) {
      //if all fields are not filled then display error message
      setError("Please fill in all the fields");
    } else {
    console.log("save button is workign")
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "users", user);
    await setDoc(docRef, { city: city, area: area, zone: zone, bldg: bldg, floor: floor, flat: flat, street: street },{ merge: true })
      .then(() => {
        console.log("data updated");
        //navigation.navigate("PersonalInfo");
      })
      .catch((error) => {
        console.log(error.message);
      });
    navigation.navigate("PersonalInfo");
    }
  };

  return (
    <KeyboardAvoidingView style={styles.MainContainer}>
      <View style={{ width: "90%"}}>
      <ScrollView contentContainerStyle={{ height: 1200 }}>
        
        <Text variant="titleMedium" style={{ marginTop: 40 }}>
          Edit Address
        </Text>

        <Text></Text>

        <Text></Text>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select City"
          searchPlaceholder="Search..."
          value={city}
          onChange={(item) => {
            setCity(item.value);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons style={styles.icon} name="city" size={20} />
          )}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={
            city == "Doha"
              ? DohaAreas
              : city == "Al Rayyan"
              ? RayyanAreas
              : WakrahAreas
          }
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Area"
          searchPlaceholder="Search..."
          value={area}
          onChange={(item) => {
            setArea(item.value);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              style={styles.icon}
              name="home-city"
              size={20}
            />
          )}
        />

        <Text></Text>

        {/* House address */}

        <TextInput
          label="Street Number"
          value={street}
          onChangeText={(text) => setStreet(text)}
          mode="flat"
          borderColor="red"
          style={styles.textInput}
        />

        <Text></Text>

        <TextInput
          label="Zone Number"
          value={zone}
          onChangeText={(text) => setZone(text)}
          style={styles.textInput}
        />

        <Text></Text>

        <TextInput
          label="Building Number"
          value={bldg}
          onChangeText={(text) => setBldg(text)}
          style={styles.textInput}
        />

        <Text></Text>

        <TextInput
          label="Floor Number"
          value={floor}
          onChangeText={(text) => setFloor(text)}
          style={styles.textInput}
        />

        <Text></Text>

        <TextInput
          label="Flat Number"
          value={flat}
          onChangeText={(text) => setFlat(text)}
          style={styles.textInput}
        />

        <Text></Text>

          <Pressable style={styles.button} onPress={() => save()}>
            <Text variant="titleSmall" style={{ color: "white" }}>
              SAVE
            </Text>
          </Pressable>

          <Text style={{color: 'red', alignSelf: 'center'}}>{error}</Text>
          
      </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: "80%",
    alignSelf: "center",
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    // width: '100%'
  },

  text: {
    fontSize: 14,
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  textInput: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#DCFDDA",
  },

  button: {
    backgroundColor: "green",
    borderRadius: 400 / 2,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    margin: 50,
    padding: 10,
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});
