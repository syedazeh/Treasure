import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config";

import { doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config";


//login page 
const Login = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [signedIn, setSignedIn] = useState(false);
  const [flag, setflag] = useState(0);

  let user = auth?.currentUser?.email;
  console.log('user logged in: ', user)

  const handleRegister = () => {
    setflag(0);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => console.log("registered"))
      .catch((error) => console.log(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Logged in");
        console.log('handle login user: ', user)
        setSignedIn(true);
        setflag(0);
        navigation.replace("HomeScreen", { email: email });
        read()
      })
      .catch((error) => {
        console.log(error.message);
        setSignedIn(false);
        setflag(1);
      });
  };

  const read = async () => {
    let user = auth?.currentUser?.email;
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
              //if the user already exists in the database
      console.log("Document data:", docSnap.data());
    } else {
      //if the user does not exist in the database users call set()
      console.log("No such document!");
      set()
    }
  };

  const set = async () => {
    //in this we create the fields of this particular user and most of them are set as blank and then updated in the later pages as necessary
    let user = auth?.currentUser?.email;
    console.log('set user: ', user)
    const docRef = doc(db, "users", user);
    await setDoc(docRef, { email: user, image: "", gender: "", DoB: "", country: "", city: "", area: "", zone: "", street: "", bldg: "", floor: "", flat: "" })
      .then(() => { console.log('data submitted') })
      .catch((error) => { console.log(error.message) })
  }

  return (
    <View style={styles.container}>
      <Image
      style={styles.image}
      source={require('../images/Treasure-login.png')}
      ></Image>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
      ></TextInput>
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      ></TextInput>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable
        style={{
          width: "50%",
          padding: 10,
          fontSize: 20,
          borderRadius: 10,
          marginTop: "2%",
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: flag === 1 ? "red" : "green",
        }}
        onPress={handleRegister}
      >
        <Text style={styles.text2}>Register</Text>
      </Pressable>
      {
        flag == 1 ?
          <Text style={{ color: 'red', marginTop: 20 }}>You must register first! You do not have an account!</Text>
          :
          null
      }
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#77BC3F'
  },
  input: {
    width: "80%",
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
    backgroundColor: "lightgrey",
  },
  button: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    //borderWidth: 1,
    borderRadius: 10,
    marginTop: "2%",
    backgroundColor: "green",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    alignSelf: "center",
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
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "green",
    alignSelf: "center",
  },
  image: {
    width: '100%',
    height: 90,
  }
});
