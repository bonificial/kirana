import React, {Component} from 'react';
import {BottomNavigation,Button, Text,Title} from 'react-native-paper';
import LoginScreen from './LoginScreen';
import {ImageBackground, View} from 'react-native';
import ProfileScreen from './ProfileScreen';
import SignupScreen from './SignupScreen';
const LoginRoute = () => <LoginScreen />;
const SignupRoute = () => <SignupScreen />;
const ProfileRoute = ()=> <ProfileScreen/>
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
                     {key: 'Profile', title: 'Profile', icon: 'crop'},
                   ],
                 };

                 _handleIndexChange = (index, title) => {
                   this.setState({index});
                 };
                 _renderScene = BottomNavigation.SceneMap({
                   Login: LoginRoute,
                   Signup: SignupRoute,
                   Profile: ProfileRoute,
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
