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

// create a component
class LoginScreen extends Component {
  state = {
    text: '',
  };
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: 'AIzaSyDc0RE2uRPsKwBKgkC0qQHfwMivOny2DDY',
      authDomain: 'kirana-49a2f.firebaseapp.com',
      databaseURL: 'https://kirana-49a2f.firebaseio.com',
      projectId: 'kirana-49a2f',
      storageBucket: 'kirana-49a2f.appspot.com',
      messagingSenderId: '656200230529',
      appId: '1:656200230529:web:a628974d66b4147291cf80',
      measurementId: 'G-D2DQZ6H7KG',
    };
    // Initialize Firebase
    try {
      app = firebase.initializeApp(firebaseConfig);
      console.log(firebase);
    } catch (err) {
      app = firebase.app();
    }

    app
      .database()
      .ref('users/001')
      .set(
        {
          phone: '0700618822',
          password: '1234',
        },
        status => {
          console.log(status);
        },
      );
  }
  processLogin = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
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
                value={this.state.text}
                onChangeText={text => this.setState({text})}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputs}
                type="outlined"
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
                this.props.navigation.goBack();
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
