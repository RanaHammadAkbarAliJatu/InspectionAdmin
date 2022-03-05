/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Main from '../Screens/Main';
import ResponsiceHoc,{ResponsiceHocAppStatusbar} from '../Screens/ResponsiceHoc';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Properties from '../Screens/Properties';
import PreparedFor from '../Screens/PreparedFor';
import PropertyLocation from '../Screens/PropertyLocation';
import ManagementContact from '../Screens/ManagementContact';
import TakePicture from '../Screens/TakePicture';
import PreparedBy from '../Screens/PreparedBy';
import Review from '../Screens/Review';
import PropertiesforInspection from '../Screens/PropertiesforInspection';
import Inspection from '../Screens/Inspection';
import AddLocation from '../Screens/AddLocation';
import Railing from '../Screens/Railing';
import Flashing from '../Screens/Flashing';
import DeckSurface from '../Screens/DeckSurface';
import Framing from '../Screens/Framing';
import Stairs from '../Screens/Stairs';
import start from '../Screens/start';
import FinishInspection from '../Screens/FinishInspection';
import Summary from '../Screens/Summary'
const Stack = createStackNavigator();


function AuthNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Main" component={ResponsiceHocAppStatusbar(Main)} />
      <Stack.Screen name="start" component={ResponsiceHoc(start)} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Summary" component={ResponsiceHoc(Summary)} />
      <Stack.Screen name="Properties" component={Properties} />
      <Stack.Screen name="PreparedFor" component={PreparedFor} />
      <Stack.Screen name="PropertyLocation" component={ResponsiceHoc(PropertyLocation)} />
      <Stack.Screen name="ManagementContact" component={ResponsiceHoc(ManagementContact)} />
      <Stack.Screen name="TakePicture" component={ResponsiceHoc(TakePicture)} />
      <Stack.Screen name="PreparedBy" component={ResponsiceHoc(PreparedBy)} />
      <Stack.Screen name="Review" component={ResponsiceHoc(Review)} />
      <Stack.Screen name="PropertiesforInspection" component={PropertiesforInspection} />
      <Stack.Screen name="Inspection" component={ResponsiceHoc(Inspection)} />
      <Stack.Screen name="AddLocation" component={AddLocation} />
      <Stack.Screen name="Railing" component={ResponsiceHoc(Railing)} />
      <Stack.Screen name="Flashing" component={ResponsiceHoc(Flashing)} />
      <Stack.Screen name="DeckSurface" component={ResponsiceHoc(DeckSurface)} />
      <Stack.Screen name="Framing" component={ResponsiceHoc(Framing)} />
      <Stack.Screen name="Stairs" component={ResponsiceHoc(Stairs)} />
      <Stack.Screen name="FinishInspection" component={ResponsiceHoc(FinishInspection)} />
      
      
    </Stack.Navigator>
  );
}

function MainNavigation(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AccountStack"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AccountStack" component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;

