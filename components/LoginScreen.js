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
//import firebase from 'react-native-firebase';
import firebase from 'firebase';
import {
  Paper as PaperProvider,
  TextInput,
  Appbar,
  Divider,
  Surface,
  Button,
  Title,
} from 'react-native-paper';
import styles from './styles/styles';
import {Icon, colors} from 'react-native-elements';
import {db, CryptoJS} from './config';

// create a component
class LoginScreen extends Component {
  state = {
    phone: '',
    password: '',
  };
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    // Your web app's Firebase configuration
  }

  loginFlow = user => {
    const {navigate} = this.props.navigation;
  
    db.ref('/users')
      .child(user.phone)
      .once('value', function(snapshot) {
        if (snapshot.val() == null || snapshot.val() == 'undefined') {
          alert('User not found. Please Sign up.');
          navigate('Signup');
        } else {
          var decrypt = CryptoJS.AES.decrypt(
            snapshot.val().password,
            'KIRANA',
          ).toString(CryptoJS.enc.Utf8);
          if (user.password !== decrypt) {
            alert('You Entered an invalid password');
          } else {
            navigate('Initial');
          }
        }
      });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <ImageBackground
        source={require('./images/bluebg.jpg')}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <Text style={styles.title}>Login to Kirana</Text>
          <View style={styles.loginContainer}>
            <Image
              resizeMode="contain"
              style={styles.logo}
              source={require('./images/k.png')}
            />
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                type="outlined"
                style={styles.inputs}
                label="Phone #"
                value={this.state.phone}
                onChangeText={phone => this.setState({phone})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="outlined"
                value={this.state.password}
                onChangeText={password => this.setState({password})}
                label="Password"
                secureTextEntry
              />
            </View>
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.loginButton}
              icon="login"
              mode="contained"
              onPress={() => {
                this.loginFlow(this.state);
              }}>
              Login
            </Button>
          </View>
          <View style={styles.spaceEvens}>
            <View style={styles.inlineTextsContainer}>
              <TouchableOpacity onPress={() => navigate('Reset')}>
                <Icon name="refresh" />
                <Text style={styles.inlineTexts}> Reset Password</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.verticalDivider}></Text>
            <View style={styles.inlineTextsContainer}>
              <TouchableOpacity onPress={() => navigate('Signup')}>
                <Icon name="person-add" />
                <Text style={styles.inlineTexts}> Signup Today</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default LoginScreen;
