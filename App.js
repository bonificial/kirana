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
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
const initialState = {
  activeScreen: 'login',
  phone: 45454,
  password: '',
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PHONE':
      console.log('Reducer', action.value);
      return {phone: action.value};
    case 'SET_PASSWORD':
      return {counter: state.counter - 1};
  }

  return state;
};
const store = createStore(reducer);

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});
let Navigation = createAppContainer(MainNavigator);
//const App = createAppContainer(MainNavigator);
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SignupScreen />
      </Provider>
    );
  }
}
console.disableYellowBox = true;
export default App;
