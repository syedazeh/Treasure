import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { PersonalStackNavigator } from "./StackNavigator";
import { HistoryStackNavigator } from "./StackNavigator";

import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

//these are for drawers navigations
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator >
      <Drawer.Screen name="Home" component={TabNavigator}/>
      <Drawer.Screen name="Personal Info" component={PersonalStackNavigator}/>
      <Drawer.Screen name="History" component={HistoryStackNavigator}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;