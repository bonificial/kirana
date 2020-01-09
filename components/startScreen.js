/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {
  AppState,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
 
 
import { Button, Menu } from 'react-native-paper';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
//import ToastExample from './app/pages/toast';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


 class StartScreen extends React.Component {
    
      
                 static navigationOptions = {
                   title: 'Welcome',
                  
                 };
                 render() {
                   return (
                     <View style={styles.container}>
                     
                     </View>
                   );
                 }
               }
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
console.disableYellowBox = true;

const MyDrawerNavigator = createDrawerNavigator({
  Start: {
    screen: StartScreen,
  },
});

export const MyApp = createAppContainer(MyDrawerNavigator);