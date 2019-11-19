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
import initialScreen from './components/initialScreen';
const initialState = {
  activeScreen: 'login',
  storeName: '',
  phone: '',
  email: '',
  password: '',
  state: '',
  city: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHONE':
      console.log(state);
      return {...state, phone: action.payload.phone};
    case 'SET_PASSWORD':
      console.log(state);
      return {...state, password: action.payload.pw};
    case 'SET_STATE':
      console.log(state);
      return {...state, state: action.payload.state};
    case 'SET_CITY':
      console.log(state);
      return {...state, city: action.payload.city};
    case 'SET_EMAIL':
      console.log(state);
      return {...state, email: action.payload.email};
    case 'SET_STORE':
      console.log(state);
      return {...state, storeName: action.payload.storeName};
    case 'PRINT_STATE':
      console.log(state);
      return state;
  }

  return state;
};
const store = createStore(reducer);

const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Signup: {screen: SignupScreen},
  Reset: {screen: ResetScreen},
  Profile: {screen: ProfileScreen},
  Initial: {screen: initialScreen},
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
