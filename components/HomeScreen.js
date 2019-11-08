import React, {Component} from 'react';
import {BottomNavigation, Text,Title} from 'react-native-paper';
import LoginScreen from './LoginScreen';
import {ImageBackground, View} from 'react-native';

import SignupScreen from './SignupScreen';
const LoginRoute = () => <LoginScreen />;
const SignupRoute = () => <SignupScreen />;

export default class MyComponent extends React.Component {
  state = {
    index: 0,
    pageTitle: 'Welcome',
    routes: [
      {key: 'Login', title: 'Login', icon: 'login'},
      {
        key: 'Signup',
        title: 'Signup',
        icon: 'account-plus-outline',
      },
    ],
  };
  static navigationOptions = {
    header: null,
  };
  _handleIndexChange = (index, title) => {
    this.setState({index});
  };
  _renderScene = BottomNavigation.SceneMap({
    Login: LoginRoute,
    Signup: SignupRoute,
  });

  render() {
    return (
      
      
        <BottomNavigation
          labeled={true}
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
     
    );
  }
}
