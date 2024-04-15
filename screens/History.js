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

import {
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "../config";

import { useIsFocused } from "@react-navigation/native";

//this page is for tracking your order history
//the order numbers are displayed on the lsit
//when one list is clicked , it opens to reveal details of the order and also a track button for eack order
const History = ({ route, navigation }) => {
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const history = ["Pick-up date", "Pick-up time", "Country", "Campaign Name"];

  let test = "Order Numbers";

  const [array, setArray] = useState([]);
  console.log("array:  ", array);

  let user = auth?.currentUser?.email;


  //this part isFocused is used to re-render the page each time it is opened
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readAllWhere();
    }
  }, [isFocused]);

  //get orders where email is the current user logged in email
  const readAllWhere = async () => {
    const q = query(collection(db, "orders"), where("email", "==", user));
    const docs = await getDocs(q);

    let temp = [];

    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());

      temp.push(doc.data());

      console.log("array inside readallwhere: ", array);
    });
    setArray(temp);
  };

  console.log("array outside use effect: ", array);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20 }}></View>

      <Text variant="headlineLarge" style={{ marginBottom: 10 }}>
        View Donation History
      </Text>


      <View style={{ width: "90%" }}>
        <ScrollView contentContainerStyle={{ height: 1500 }}>
          <List.Section>
            {array.map((item, i) => {
              return (
                <View key={i} style={{ textAlign: "center" }}>
                  {/* the list accordian view displays all of the data */}
                  <List.Accordion title={<Text>Order No. {item.trackID}</Text>}>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Pick-Up Date
                    </Text>
                    <Text>{item.date}</Text>
                    <Divider></Divider>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Pick-Up Time
                    </Text>
                    <Text>{item.time}</Text>
                    <Divider></Divider>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Country
                    </Text>
                    <Text>{item.country}</Text>
                    <Divider></Divider>
                    <Text variant="titleMedium" style={{ margin: 20 }}>
                      Charity
                    </Text>
                    <Text>{item.charity}</Text>
                    <Divider></Divider>
                    <Pressable
                      style={styles.button}
                      onPress={() =>
                        navigation.navigate("Track", { trackID: item.trackID })
                      }
                    >
                      <Text style={styles.text}>Track</Text>
                    </Pressable>
                  </List.Accordion>
                </View>
              );
            })}
          </List.Section>
          <Pressable style={styles.button} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.text}>Back to Profile</Text>
      </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "50%",
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "green",
    marginVertical: 30,
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
});
