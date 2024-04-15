import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";

import { db } from "../config";

import { auth } from "../config";

import { Text } from "react-native-paper";

//home page where an image is presented along with its description and donate button
const Home = ({ route, navigation }) => {

  let user = auth?.currentUser?.email;

  const charity = [
    {
      id: 1,
      name: "Qatar Charity",
      country: "Syria",
      description: "Help People in Syria Battle the Harsh Winter",
      image:
        "https://www.unhcr.org/neu/wp-content/uploads/sites/15/2022/01/RF1196322_PEN08170-2-scaled.jpg",
    },
    {
      id: 2,
      name: "Eid Charity",
      country: "Iraq",
      description: "Help Refugees in Iraq",
      image:
        "https://www.samaritanspurse.ca/wp-content/uploads/Delivering-Winter-Clothing-to-Refugees-in-Northern-Iraq.jpg",
    },
    {
      id: 3,
      name: "ROTA",
      country: "Sudan",
      description: "Help Poor People in Sudan",
      image: "https://www.unhcr.org/thumb3/627a56b83.jpg",
    },
    {
      id: 4,
      name: "UNHCR",
      country: "Burkina Faso",
      description:
        "Help Displaced Families of Burkina Faso Regain Confidence with New Attire",
      image:
        "https://cdn.unrefugees.org/u4uweb2020/media/oq5ajtr2/displaced-family-in-burkina-faso-receives-clothing-from-gap-in-kind-donation.png?width=100%",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>

      
      {/* <View style={styles.header}>
        <View style={{marginLeft: 150}}>
          <Image style={styles.logo} source={require("../images/logo.jpeg")} />
        </View>
        <View>

          <Image
            style={styles.profile}
            source={require("../images/profile.png")}
          />
          <Text>{route.params.email}</Text>
        </View>
      </View> */}

      <Text></Text>
      <Text></Text>

      {/* this displays the image of the charity cause along with description and donate button */}
      <ScrollView contentContainerStyle={{ height: 1400 }}>
        {charity.map((item, i) => {
          return (
            <View key={i} style={{ textAlign: "center" }}>
              <Pressable>
                <Image style={styles.image} source={{ uri: item.image }} />
                <Text variant="titleSmall" style={styles.textCenter}>
                  {item.description}
                </Text>
                <Text variant="titleSmall" style={styles.textCenter}>
                  Donate to {item.name}
                </Text>
                {/* press donate button to navigate to next page */}
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    navigation.navigate("Charity", {
                      name: item.name,
                      image: item.image,
                      description: item.description,
                      email: user,
                      country: item.country,
                    })
                  }
                >
                  <Text style={styles.text}>DONATE</Text>
                </Pressable>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 15,
  },
  textCenter: {
    textAlign: "center",
  },
  textCenterMargin: {
    textAlign: "center",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
    width: "50%",
  },
  //button
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "green",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  ////header
  header: {
    // flex: 1,
    height: "15%",
    width: "100%",
    backgroundColor: "#77bb3f",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    height: 90,
    width: 90,
    //alignItems: 'center',
    alignSelf: "center",
    justifyContent: "center",
  },
  profile: {
    height: 50,
    width: 50,
    alignSelf: "flex-end",
    borderRadius: 400 / 2,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 10
    //justifyContent: 'space-between'
  },
});
