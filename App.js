/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import ResetScreen from './components/ResetPassword';

const initialState = {
  activeScreen: 'login',
  storeName: '',
  phone: '',
  password: '',
  state: '',
  city: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHONE':
      console.log('Reducer', action.value);
      return {phone: action.value};
    case 'SET_PASSWORD':
      return {password: action.value};
  }

  return state;
};
const store = createStore(reducer);

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Reset: {screen: ResetScreen},
  Profile: {screen: ProfileScreen},
});
const Navigation = createAppContainer(MainNavigator);
//const App = createAppContainer(MainNavigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
console.disableYellowBox = true;
