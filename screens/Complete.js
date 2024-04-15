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
  ImageBackground,
} from "react-native";
import { Divider, Text } from "react-native-paper";

//this page is to notify the user their order has been placed successfully

const Complete = ({route, navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* setting an image as a background */}
      <ImageBackground
        source={{
          uri: "https://img.freepik.com/free-vector/green-curve-frame-template-vector_53876-113965.jpg?w=2000",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            style={styles.truck}
            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-1sem7FoYHPr-ih41L0c_eQTO_RicqyxIs6X5kioVPZXfYgh8E4L2lx1jZU__FYnHSeQ&usqp=CAU'}}
          />
        </View>
        <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>Thank you for your donation</Text>
        <Pressable style={styles.button} onPress={() =>
              navigation.navigate("Track", {email: route.params.email, trackID: route.params.trackID})
            }>
            <Text style={{color:'white'}}>TRACK ORDER</Text>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Complete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  truck: {
    width: 150,
    height: 150,
    borderRadius: 200 / 2
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
