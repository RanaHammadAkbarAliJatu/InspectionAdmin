/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
import ResponsiceHoc,{ResponsiceHocAppStatusbar} from '../Screens/ResponsiceHoc';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp'; 
import Main from '../Screens/Main';
 
const Stack = createStackNavigator();


function AuthNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Main" component={ResponsiceHocAppStatusbar(Main)} />
    
    </Stack.Navigator>
  );
}

function AuthNavigation(props) {
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

export default AuthNavigation;

