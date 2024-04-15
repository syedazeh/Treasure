import { StyleSheet, View, Image, Button, Pressable, ScrollView, KeyboardAvoidingView, PixelRatio, Switch } from "react-native";
import React, { Component, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { List } from 'react-native-paper';
import { Card, Header, Divider } from '@rneui/themed';
// import { ScrollView } from "react-native-gesture-handler";
import { Text } from 'react-native-paper';
import { acc } from "react-native-reanimated";

import { auth } from "../config";
import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";

import { TextInput } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';
import DateTimePicker from "@react-native-community/datetimepicker";

//country picker
import CountryPicker from 'react-native-country-picker-modal'

//this page if for editing account info like name, gender, country, and date of birth
const EditAccount = ({ navigation }) => {

    let user = auth?.currentUser?.email;

    const [name, setName] = useState()
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    console.log("country: ", country)

    const [error, setError] = useState('')

    const save = async () => {

        if(!name || !gender || !country){
            setError('You must fill all fields')
        }
        else{

        

        console.log('working')
        let user = auth?.currentUser?.email;
        console.log('save user: ', user)
        const docRef = doc(db, "users", user);
        await setDoc(docRef, { name: name, gender: gender, country: country, DoB: dob }, { merge: true })
            .then(() => {
                console.log("data updated");
            })
            .catch((error) => {
                console.log(error.message);
            });
        navigation.navigate('PersonalInfo')
        }
    };

    const [datePicker, setDatePicker] = useState(false);

    const [date, setDate] = useState(new Date());

    //i am getting the date from the date tiem picker but setting it in format of 'dd-mm-yyyy'
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    var dob = day + '-' + month + '-' + year;

    function showDatePicker() {
        setDatePicker(true);
    }

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    }

    return (
        <KeyboardAvoidingView style={styles.container}>

            <View style={{ margin: 40 }}></View>

            <Text variant="headlineLarge" style={{ marginBottom: 10 }}>Edit Account Information</Text>


            <View style={{ width: '90%' }}>
                <ScrollView contentContainerStyle={{ height: 1500 }}>

                    <View style={{ width: '90%', margin: 30, alignSelf: 'center' }}>

                        <TextInput
                            label='Name'
                            mode="outlined"
                            value={name}
                            style={{ marginVertical: 20, backgroundColor: 'white' }}
                            onChangeText={text => setName(text)}
                        />

                        <Text variant="titleMedium">Nationality</Text>

                        {/* this opens a list of countries to pick from */}
                        <Pressable style={styles.button2}>
                        
                        <CountryPicker
                            withEmoji
                            withFilter
                            onSelect={(value) => setCountry(value.name)}
                        />
                        </Pressable>

                        <Text variant="labelLarge" style={{marginTop: 20}}>Country Selected: {country}</Text>

                        <View style={{marginBottom: 20}}></View>

                        <Text variant="titleMedium">Gender</Text>
                        <RadioButton.Group onValueChange={value => setGender(value)} value={gender}>
                            <RadioButton.Item label="Male" value="Male" />
                            <RadioButton.Item label="Female" value="Female" />
                        </RadioButton.Group>

                        {/* to see explanation of date time picker , go to details.js */}
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

                        <Text variant="titleMedium">Date of Birth</Text>
                        <Text variant="titleMedium">{date.toDateString()}</Text>

                        {!datePicker && (
                            <View style={{ margin: 10 }}>
                                <Button
                                    title="Show Date Picker"
                                    color="green"
                                    onPress={showDatePicker}
                                />
                            </View>
                        )}

                        <Pressable style={styles.button} onPress={save}>
                            <Text style={styles.text}>Save</Text>
                        </Pressable>
                        <Text style={{color: 'red', alignSelf: 'center'}}>{error}</Text>

                    </View>

                </ScrollView>

            </View>

        </KeyboardAvoidingView>
    )
}

export default EditAccount;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: "50%",
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginTop: 20,
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
    titleText: {
        color: "#000",
        fontSize: 25,
        marginBottom: 25,
        fontWeight: "bold",
    },
    pickerTitleStyle: {
        justifyContent: "center",
        flexDirection: "row",
        alignSelf: "center",
        fontWeight: "bold",
    },
    pickerStyle: {
        height: 54,
        width: 150,
        marginVertical: 10,
        borderColor: "#303030",
        alignItems: "center",
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        borderWidth: 2,
        fontSize: 16,
        color: "#000",
    },
    selectedCountryTextStyle: {
        paddingLeft: 5,
        color: "#000",
        textAlign: "right",
    },

    countryNameTextStyle: {
        paddingLeft: 10,
        color: "#000",
        textAlign: "right",
    },

    searchBarStyle: {
        flex: 1,
    },

    button2: {
        width: "50%",
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginTop: "2%",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "green",
        alignSelf: "center"
      },
})