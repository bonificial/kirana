//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './styles/styles';
import {Icon} from 'react-native-elements';
import {Button, Title, TouchableRipple} from 'react-native-paper';

// create a component
class initialScreen extends Component {
  state = {
    shopName: '',
  };
  static navigationOptions = {
    title: 'Welcome to Kirana',
  };

  render() {
    const {navigation} = this.props;
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        source={require('./images/soft.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            //backgroundColor: '#fff',
            flexDirection: 'column',
          }}>
          <View style={{height: 80}}>
            <Title
              style={{
                textTransform: 'uppercase',
                color: '#e88a38',
                fontSize: 27,
                fontWeight: 'bold',
              }}>
              {navigation.getParam('storename')}
            </Title>
          </View>

          <TouchableRipple
            style={styles.navButtonsContainer}
            onPress={() =>
              navigate('AddItem', {storename: navigation.getParam('storename')})
            }
            rippleColor="#348feb">
            <Text style={styles.navButtonsText}>Manage Item</Text>
          </TouchableRipple>

          <TouchableRipple
            style={styles.navButtonsContainer}
            onPress={() =>
              navigate('Checkout', {
                storename: navigation.getParam('storename'),
              })
            }
            rippleColor="#348feb">
            <Text style={styles.navButtonsText}>CHECKOUT</Text>
          </TouchableRipple>

          <View style={styles.inlineTextsContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => navigate('Login')}>
              <Text style={{display: 'flex', fontSize: 17, color: 'orange'}}>
                {' '}
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const stylesl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //backgroundColor: '#fff',
    flexDirection: 'column',
  },
});

//make this component available to the app
export default initialScreen;
