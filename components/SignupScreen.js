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
  Alert,
} from 'react-native';
import DialogInput from 'react-native-dialog-input';
import {MaterialDialog} from 'react-native-material-dialog';
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
import {states} from './state';
import {db, CryptoJS} from './config';

class SignupScreen extends Component {
  state = {
    pw: '',
    pw_cnf: '',
    password: '',
    isDialogVisible: false,
    DialogAlertVisible: false,
    ActionOnDismiss: '',
    DialogAlertMessage: '',
    DialogAlertTitle: '',
    storename: 'kira',
    phone: '254',
    email: '',
    s_state: 'ar',
    city: 'ar',
    states_array: [],
    cities_array: [],
  };

  componentDidMount() {
    // console.log( states);
    var states_only = Object.keys(states);
    var states_array = [];
    states_only.map(state => {
      var obj_state = new Object();
      obj_state.value = state;
      states_array.push(obj_state);
    });
    this.setState({states_array});
  }
  populateCities() {
    var s_state = this.state.s_state;
    var cities_in_state_only = states[s_state];
    var cities = [];
    cities_in_state_only.map(city => {
      var city_obj = new Object();
      city_obj.value = city;
      cities.push(city_obj);
    });
    this.setState({cities_array: cities});
    console.log(cities);
  }

  static navigationOptions = {
    header: null,
  };
  validateInputs = () => {
    if (this.state.storename == '') {
      alert('Please provide the store name');
      return false;
    }
    if (this.state.phone == '') {
      alert('Please provide a phone number');
      return false;
    }

    if (this.state.s_state == '') {
      alert('Please provide the State');
      return false;
    }
    if (this.state.city == '') {
      alert('Please provide the City');
      return false;
    }
    return true;
  };
  setPassword = user => {
    return result;
  };
  signupFlow = user => {
    var cl = this;
    var result;
    if (this.state.pw.length < 8) {
      this.setState({
        DialogAlertMessage:
          'Please set a password that is at least 8 characters.',
        DialogAlertTitle: 'Error',
        DialogAlertVisible: true,
      });
      result = false;
    } else if (this.state.pw !== this.state.pw_cnf) {
      this.setState({
        DialogAlertMessage: 'Entered Passwords do not Match',
        DialogAlertTitle: 'Error',
        DialogAlertVisible: true,
      });

      result = false;
    } else {
      var hash = CryptoJS.AES.encrypt(this.state.pw, 'KIRANA').toString();
      cl.setState({password: hash});
      

     //  alert('Password Op ' + hash);
      db.ref('/users')
        .child(user.phone)
        .once('value', function(snapshot) {
          console.log(snapshot);
          var exists = snapshot.val() !== null;
          if (exists) {
            cl.setState({
              DialogAlertMessage:
                'Another account exists that is associated with the phone number. Please use the login option.',
              DialogAlertTitle: 'Kirana',
              DialogAlertVisible: true,
              ActionOnDismiss: 'REDIRECT_SIGNIN',
            });
          } else {
            if (!cl.validateInputs()) {
              return 0;
            } else {
              console.log(user);

              db.ref('/users')
                .child(user.phone)
                .set({
                  city: user.city,
                  storename: user.storename,
                  password: hash,
                  state: user.s_state,
                })
                .then(data => {
                  //success callback

                  cl.setState({
                    DialogAlertMessage:
                      'Registration Successful.You may now proceed to Login',
                    DialogAlertTitle: 'Kirana',
                    DialogAlertVisible: true,
                    ActionOnDismiss: 'REDIRECT_SIGNIN',
                  });
                })
                .catch(error => {
                  //error callback
                  cl.setState({
                    DialogAlertMessage:
                      'An Error occurred. Kindly try again later or contact admin.',
                    DialogAlertTitle: 'Kirana',
                    DialogAlertVisible: true,
                  });
                });
            }
          }
        });
    }
  };

  proceedActions(actionType) {
    const {navigate} = this.props.navigation;
    this.setState({DialogAlertVisible: false});
    if (this.state.ActionOnDismiss == 'REDIRECT_SIGNIN') {
      navigate('Login');
    }
  }

  render() {
    const {navigate} = this.props.navigation;

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
                label="Phone number"
                value={this.state.phone}
                keyboardType="phone-pad"
                inputContainerStyle={{fontSize: 13}}
                onChangeText={phone => {
                  this.setState({phone});
                }}
              />
            </View>
            <View style={styles.inputContainer_nmg}>
              <OutlinedTextField
                label="Store Name"
                value={this.state.storename}
                keyboardType="text"
                inputContainerStyle={{fontSize: 13}}
                onChangeText={storename => {
                  this.setState({storename});
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
              data={this.state.states_array}
              label="Select State"
              value={this.state.s_state}
              onChangeText={s_state => {
                this.setState({s_state});
                this.populateCities();
              }}
            />
          </View>
          <View style={styles.inputContainer_nmg}>
            <Dropdown
              dropdownOffset={{
                top: 8,
                left: 0,
              }}
              data={this.state.cities_array}
              value={this.state.city}
              label="Select City"
              onFocus={() => {
                console.log('focused');
              }}
              onChangeText={city => {
                this.setState({city});
              }}
            />
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.loginButton}
              icon="account-plus-outline"
              mode="contained"
              onPress={() => {
                this.signupFlow(this.state);
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
          {/*   <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={'Verify Phone Number'}
            message={
              'An OTP has been sen to the Number +1 234 XXX XXX. Please enter it below to verify the number.'
            }
            hintInput={'_ _ _ _ _ _'}
            closeDialog={() => {
              this.setState({isDialogVisible: false});
            }}></DialogInput> */}
          <MaterialDialog
            title={this.state.DialogAlertTitle}
            visible={this.state.DialogAlertVisible}
            onOk={() => this.proceedActions('OK')}
            onCancel={() => this.proceedActions('CANCEL')}>
            <Text>{this.state.DialogAlertMessage}</Text>
          </MaterialDialog>
        </View>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) {
  return {
    phone: state.phone,
    password: state.password,
    storeName: '',
    state: '',
    city: '',
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setEmail: email => dispatch({type: 'SET_EMAIL', payload: {email: email}}),
    setPhone: phone => dispatch({type: 'SET_PHONE', payload: {phone: phone}}),
    setPassword: pw => dispatch({type: 'SET_PASSWORD', payload: {pw: pw}}),
    setStore: storeName =>
      dispatch({type: 'SET_STORE', payload: {storeName: storeName}}),
    setState: state => dispatch({type: 'SET_STATE', payload: {state: state}}),
    setCity: city => dispatch({type: 'SET_CITY', payload: {city: city}}),
    printState: () => dispatch({type: 'PRINT_STATE'}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
