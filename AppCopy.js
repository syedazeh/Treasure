import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Profile from './screens/Profile'
// import AboutScreen from "./screens/about";
// import ContactScreen from "./screens/contact";
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      {/* <Tab.Screen
        name="AboutUs"
        component={AboutScreen}
        options={{ headerShown: false }}
      /> */}
      <Tab.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Treasure"
          style={styles.homenav}
          component={HomeTabs}
        />
        {/*<Drawer.Screen name="Login" component={LoginStackScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  drawer: {
    paddingLeft: 10,
  },
  homenav: {
    display: "flex",
    justifyContent: "center",
  },
});