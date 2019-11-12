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
import DialogInput from 'react-native-dialog-input';
import {
  Paper as PaperProvider,
  TextInput,
  Appbar,
  Divider,
  Surface,
  Button,
  Title,
} from 'react-native-paper';
import {Icon, colors} from 'react-native-elements';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import styles from './styles/styles';
import states_city from './state';

// create a component
class SignupScreen extends Component {
  state = {
    pw: '',
    pw_cnf: '',
    isDialogVisible: false,
  };
  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;
    console.log(states_city);
    let state_names = states_city;
    let data = [
      {
        value: 'Place 1',
      },
      {
        value: 'Place 2',
      },
      {
        value: 'Place 3',
      },
    ];
    return (
      <ImageBackground
        source={require('./images/bluebg.jpg')}
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
                label="Store Name"
                value={this.props.storename}
                keyboardType="text"
                inputContainerStyle={{fontSize: 13}}
                onChangeText={store => {
                  this.props.setPhone(store);
                }}
              />
            </View>
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
                containerStyle={{marginTop: 0}}
                value={this.state.pw}
                inputContainerStyle={{fontSize: 13}}
                secureTextEntry
                onChangeText={pw => {
                  this.setState({pw});
                }}
              />
            </View>
            <View style={styles.inputContainer_nmg}>
              <OutlinedTextField
                label="Confirm Password"
                value={this.state.pw_cnf}
                inputContainerStyle={{fontSize: 13}}
                secureTextEntry
                onChangeText={pw_cnf => {
                  this.setState({pw_cnf});
                }}
              />
            </View>
          </View>
          <View style={styles.inputContainer_nmg}>
            <Dropdown
              dropdownOffset={{
                top: 8,
                left: 0,
              }}
              data={data}
              label="Select State"
            />
          </View>
          <View style={styles.inputContainer_nmg}>
            <Dropdown
              dropdownOffset={{
                top: 8,
                left: 0,
              }}
              data={data}
              label="Select City"
            />
          </View>

          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.loginButton}
              icon="account-plus-outline"
              mode="contained"
              onPress={() => {
                this.setState({isDialogVisible: true});
              }}>
              Signup
            </Button>
          </View>
          <View style={styles.spaceEvens}>
            <View style={styles.inlineTextsContainer}>
              <TouchableOpacity onPress={() => navigate('Login')}>
                <Text style={styles.inlineTexts}> Have an Account ? Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={'Verify Phone Number'}
            message={
              'An OTP has been sen to the Number +1 234 XXX XXX. Please enter it below to verify the number.'
            }
            hintInput={'_ _ _ _ _ _'}
            submitInput={console.log('Dialog Input Submitted')}
            closeDialog={() => {
              this.setState({isDialogVisible: false});
            }}></DialogInput>
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
    setPassword: text => dispatch({type: 'SET_PASSWORD', value: text}),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupScreen);
