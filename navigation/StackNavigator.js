import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Charity from "../screens/Charity";
import Details from "../screens/Details";
import Profile from "../screens/Profile";
import Track from "../screens/Track";
import PersonalInfo from "../screens/PersonalInfo";
import History from "../screens/History";
import Search from "../screens/Search";
import Confirm from "../screens/Confirm";
import Complete from "../screens/Complete";
import Login from "../screens/Login";
import ConfirmUser from "../screens/ConfirmUser";
import DetailsDateTime from "../screens/DetailsDateTime";
import EditAccount from "../screens/EditAccount";
import EditAddress from "../screens/EditAddress";

import Videos from "../screens/Videos";

import Onboard from "../screens/Onboard";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
//when the user installs or opens your app for the first time, the app shows the user the onboarding screen, and as soon as the user has interacted 
//with the onboarding screens, the app will store a string data on the device. The app will always check for this code; if the code exists, the onboarding screen won’t be displayed; hence, the user will be taken straight to the Homepage. If the app is opened for the first time, the code won’t exist; therefore, the onboarding screen will be displayed.
//sync function that will check for the string item, appLaunched, in AsyncStorage whenever the app is opened. If the string item is null, the app is opened for the first time; the setFirstLaunch function will update the firstLaunch to true, and the onboarding screen will display.
//if the string item appLaunched is found in the AsyncStorage, then the setFirstLaunch function will update the firstLaunch state to false, and the onboarding screen will not show; instead, the user will be directed straight to the Homepage.
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);


  //read
  return (

    firstLaunch != null && (
      // <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={screenOptionStyle} >
          {firstLaunch && (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Onboard"
              component={Onboard}
            />
          )}
          {/* all of the stack screen navigators are here, this is needed for navigation.navigate in the screens */}
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="HomeScreen" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="Charity" component={Charity} options={{headerShown: false}}/>
          <Stack.Screen name="Details" component={Details} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileScreen" component={Profile} options={{headerShown: false}}/>
          <Stack.Screen name="Track" component={Track} options={{headerShown: false}}/>

          <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="EditAccount" component={EditAccount} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="EditAddress" component={EditAddress} options={{headerShown: false}}></Stack.Screen>

          <Stack.Screen name="History" component={History} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="SearchScreen" component={Search} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Confirm" component={Confirm} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="ConfirmUser" component={ConfirmUser} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="Complete" component={Complete} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="DetailsDateTime" component={DetailsDateTime} options={{headerShown: false}}></Stack.Screen>

          <Stack.Screen name="VideoScreen"component={Videos} options={{headerShown: false}} />

          {/* <Stack.Screen name="SearchCharity" component={SearchCharity} options={{headerShown: false}} /> */}

        </Stack.Navigator>
      // </NavigationContainer>
    )

  );
}

//FOR TAB AND DRAWERS NAVIGATION

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="ProfileScreen" component={Profile} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

const  PersonalStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{headerShown: false}}/>
    </Stack.Navigator>
  );

}

const HistoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="HistoryScreen" component={History} options={{headerShown: false}}/>
    </Stack.Navigator>
  );

}


const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="SearchScreen" component={Search} options={{headerShown: false}}/>
    </Stack.Navigator>
  );

}

const VideoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="VideoScreen" component={Videos} options={{headerShown: false}}/>
    </Stack.Navigator>
  );

}


export { MainStackNavigator, ProfileStackNavigator, SearchStackNavigator, PersonalStackNavigator, HistoryStackNavigator, VideoStackNavigator };

