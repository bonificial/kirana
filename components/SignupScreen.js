import React, {Component} from 'react';
import {
  View,
  Text,
  Linking,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';

import {
  Paper as PaperProvider,
  TextInput,
  Appbar,
  Divider,
  Surface,
  Button,
  Title,
} from 'react-native-paper';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import styles from './styles/styles';

// create a component
class SignupScreen extends Component {
  state = {
    phone: null,
  };
  render() {
    return (
      <ImageBackground
        source={require('./images/bluebg.png')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Signup to Kirana</Text>
          <View style={styles.loginContainer}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('./images/k.png')}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer_nmg}>
              <OutlinedTextField
                label="Phone number"
                value={this.props.phone}
                keyboardType="phone-pad"
                inputContainerStyle={{fontSize: 13}}
                onChangeText={phone => {
                  this.props.setPhone(phone);
                }}
              />
            </View>
            <View style={styles.inputContainer_nmg}>
              <OutlinedTextField
                label="Create Password"
                keyboardType="password"
                value={this.props.phone}
                inputContainerStyle={{fontSize: 13}}
                secureTextEntry
                
                
              />
            </View>
            <View style={styles.inputContainer_nmg}>
              <OutlinedTextField
                label="Confirm Password"
                keyboardType="password"
                inputContainerStyle={{fontSize: 13}}
                secureTextEntry
                formatText={this.formatText}
                onSubmitEditing={this.onSubmit}
                ref={this.fieldRef}
              />
            </View>
          </View>
          <View style={styles.inputContainer_nmg}>
            <Dropdown label="Select State" />
          </View>
          <View style={styles.inputContainer_nmg}>
            <Dropdown label="Select City" />
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.loginButton}
              icon="login"
              mode="contained"
              onPress={() => console.log('Pressed')}>
              Login
            </Button>
          </View>
          <View style={styles.inlineTextsContainer}>
            <Text
              style={styles.inlineTexts}
              onPress={() =>
                ToastAndroid.show('Reset Password Placeholder', 5000)
              }>
              Reset Password
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) {
  return {
    phone: state.phone,
    password: state.password,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setPhone: text => dispatch({type: 'SET_PHONE', value: text}),
    setPassword: () => dispatch({type: 'SET_PASSWORD'}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen);
