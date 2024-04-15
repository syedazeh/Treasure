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
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import { Text, TextInput, HelperText } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Details = ({ route, navigation }) => {
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

//cities in qatar
  const cityData = [
    { label: "Doha", value: "Doha" },
    { label: "Al Rayyan", value: "Al Rayyan" },
    { label: "Al Wakrah", value: "Al Wakrah" },
  ];

  //areas in doha city
  const DohaAreas = [
    { label: "Al Bidda", value: "Al Bidda" },
    { label: "Al Dafna", value: "Al Dafna" },
    { label: "Ad Dawhah al Jadidah", value: "Ad Dawhah al Jadidah" },
  ];

  //areas in rayyan city
  const RayyanAreas = [
    { label: "Ain Khaled", value: "Ain Khaled" },
    { label: "Dukhan", value: "Dukhan" },
    { label: "Al Mamoura", value: "Al Mamoura" },
  ];

  //areas in wakrah area
  const WakrahAreas = [
    { label: "Khawr al Udayd", value: "Khawr al Udayd" },
    { label: "Al Karaana", value: "Al Karaana" },
    { label: "Al Kharrara", value: "Al Kharrara" },
  ];

  // date time picker

  //initialize datepicker and timepicker as false
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(false);

  //initially the current dat and time are taken
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));

  //when showdatepicker and showtimepicker are pressed set the value as true
  function showDatePicker() {
    setDatePicker(true);
  }

  function showTimePicker() {
    setTimePicker(true);
  }

  //once the date and time is selected an onchange trigger is called in which the date and time pciker will
  //be set as false again to hide from display and the values for them will be set
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  //error constant is set as empty string, this will be used to set an error message
  const [error, setError] = useState("");

//check button
  const check = () => {

    //order ID generator
    //generate random number to store for track id
    let numarr = []
    let number = Math.floor(Math.random() * 10000);

    //check if all fields are filled
    if (!city || !area || !street || !zone || !bldg || !floor || !flat) {
      //if all fields are not filled then display error message
      setError("Please fill in all the fields");
    } else {
      //else display nothing
      setError("");

      if (numarr.includes(number)) {
        //check if number already present in array, if yes then generate another number and store that
        console.log("this number exists")
        let number2 = Math.floor(Math.random() * 10000);
        numarr.push(number2)
        console.log("number 2: ", number2)
        //pass all data to confirm page
        navigation.navigate("Confirm", {
          city: city,
          area: area,
          street: street,
          zone: zone,
          bldg: bldg,
          flat: flat,
          floor: floor,
          date: date.toDateString(),
          time: time.toLocaleTimeString("en-US"),
          name: route.params.name,
          email: route.params.email,
          country: route.params.country,
          trackID: number2
        });
      }
      else {
        //if number doesnt exists then pass it as track id
        console.log("This number does NOT exist")
        numarr.push(number)
        console.log("number: ", number)
        navigation.navigate("Confirm", {
          city: city,
          area: area,
          street: street,
          zone: zone,
          bldg: bldg,
          flat: flat,
          floor: floor,
          date: date.toDateString(),
          time: time.toLocaleTimeString("en-US"),
          name: route.params.name,
          email: route.params.email,
          country: route.params.country,
          trackID: number
        });
      }
    }
  };


  return (
    <KeyboardAvoidingView style={styles.MainContainer}>

      <ScrollView contentContainerStyle={{ height: 1200 }}>
        <Text variant="titleMedium" style={{ marginTop: 40 }}>
          Please enter the following details to complete the donation process to
          {" " + route.params.name}.
        </Text>

        <Text></Text>

        <Text></Text>
    {/* dropdown that lets user search for city */}
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
{/* dropdown thta will display areas deending on the city selected */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          //display areas according to the city selected
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

        {/* House address details */}

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

        {/* date time picker */}

        <Text variant="titleSmall" style={styles.text}>
          Please select a date for pick-up
        </Text>

            {/* display the date that is selected */}
        <Text variant="titleSmall" style={styles.text}>
          {date.toDateString()}
        </Text>

            {/* if date picker is true display the date picker */}
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

          {/* if date picker is false display the button to press to get the date pciker */}
        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Show Date Picker"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        )}

        <Text variant="titleSmall" style={styles.text}>
          Please select a time for pick up
        </Text>

        <Text variant="titleSmall" style={styles.text}>
          {time.toLocaleTimeString("en-US")}
        </Text>

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

        {!timePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Show Time Picker"
              color="green"
              onPress={showTimePicker}
            />
          </View>
        )}

        <Pressable style={styles.button} onPress={() => check()}>
          <Text variant="titleSmall" style={{ color: "white" }}>
            CONTINUE
          </Text>
        </Pressable>

        <Text style={styles.error}>{error}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Details;

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
  },

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
  error: {
    color: "red",
    textAlign: "center",
  },
});
