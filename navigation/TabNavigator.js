import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  MainStackNavigator,
  CharityStackNavigator,
  DetailsStackNavigator,
  ProfileStackNavigator,
  TrackStackNavigator,
  SearchStackNavigator,
  VideoStackNavigator
} from "./StackNavigator";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { FontAwesome } from "react-native-vector-icons";
//const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

//all of these are for the tab navigators
//the initial page is the home page
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Homee"
      activeColor="green"
      labelStyle={{ fontSize: 12 }}
      inactiveColor="grey"
      
    >
      <Tab.Screen
        name="Homee"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          tabBarLabel: "Search",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Videos"
        component={VideoStackNavigator}
        options={{
          tabBarLabel: "Videos",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="video" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
