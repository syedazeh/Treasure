import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Charity from "./screens/Charity";
import Details from "./screens/Details";

import { MainStackNavigator } from "./navigation/StackNavigator";
import BottomTabNavigator from "./navigation/TabNavigator";
import DrawerNavigator from "./navigation/DrawerNavigator";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <BottomTabNavigator /> */}
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

//tabs:
// 1. home
// 2. search
// 3. profile
