//DATE TIME PICKER

import {
  StyleSheet,
  View,
  Image,
  Button,
  TextInput,
  Platform,
  Pressable,
} from "react-native";
import React, { useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Text } from "react-native-paper";

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

const DetailsDateTime = ({ route, navigation }) => {

  //explanation of the components of date time picker can be found on Details.js inside screens folder

  //once the user has already filled in their address they will not be required to fill it in a second time, rather they
  // will just have to choose the date and time for their pick up
  //this is the purpose of this page

  const [datePicker, setDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const [timePicker, setTimePicker] = useState(false);

  const [time, setTime] = useState(new Date(Date.now()));

  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  //generate random number from 1 to 10000 for track ID
  let numarr = []
  let number = Math.floor(Math.random() * 10000);
  let trackID;

  const check = () => {
    //check if number already exists, if yes generate another number and pass that as track ID
    if (numarr.includes(number)) {
      console.log("this number exists")
      let number2 = Math.floor(Math.random() * 10000);
      numarr.push(number2)
      console.log("number 2: ", number2)
      navigation.navigate("ConfirmUser", {
        name: route.params.name,
        email: route.params.email,
        country: route.params.country,
        date:date.toDateString(), 
        time:time.toLocaleTimeString("en-US"),
        trackID: number2
      }) 
    }
    //else store the nmber for track ID
    else{
      console.log("This number does NOT exist")
      numarr.push(number)
      console.log("number: ", number)
      navigation.navigate("ConfirmUser", {
        name: route.params.name,
        email: route.params.email,
        country: route.params.country,
        date:date.toDateString(), 
        time:time.toLocaleTimeString("en-US"),
        trackID: number
      }) 
    }

  }
 

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View>
        <Text variant="titleMedium">
          Please select your preferred pick-up date and time to complete the
          donation process to {route.params.name}.
        </Text>

        <View style={{ margin: 10 }}></View>

        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styles.datePicker}
          />
        )}

        {timePicker && (
          <DateTimePicker
            value={time}
            mode={"time"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={false}
            onChange={onTimeSelected}
            style={styles.datePicker}
          />
        )}

        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Show Date Picker"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        )}

        {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Show Time Picker"
              color="green"
              onPress={showTimePicker}
            />
          </View>
        )}

        <View style={{ marginTop: 40 }}></View>

        <Text style={styles.text}>Preferred date of pick-up:</Text>
        <Text style={styles.text}>{date.toDateString()}</Text>

        <Text style={styles.text}>Preferred time of pick-up:</Text>
        <Text style={styles.text}>{time.toLocaleTimeString("en-US")}</Text>

        <Pressable
          style={styles.button}
          onPress={() => check() }
        >
          <Text variant="titleSmall" style={{ color: "white" }}>
            CONTINUE
          </Text>
        </Pressable>

      </View>
    </SafeAreaView>
  );
};

export default DetailsDateTime;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
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
});
