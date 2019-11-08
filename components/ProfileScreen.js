//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

// create a component
class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Home"
        onPress={() => navigate('Home', {name: 'Jane'})}
      />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ProfileScreen;
