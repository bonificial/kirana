import React, {Component} from 'react';
import NetInfo from '@react-native-community/netinfo';
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
  ActivityIndicator,
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
import {Toast} from 'native-base';

// create a component
class LoginScreen extends Component {
  state = {
    phone: '+254700618822',
    password: 'bmm130sam',
    animating: false,

    connected: false,
    aiText: 'Please Wait',
  };
  static navigationOptions = {
    header: null,
  };
  componentWillMount() {
    // Your web app's Firebase configuration
  }
  isNetConnected() {
    var thiz = this;
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        thiz.setState({connected: false});
        ToastAndroid.show(
          'Please Check your Internet Connection',
          ToastAndroid.LONG,
        );
      } else {
        thiz.setState({connected: true});
        //ToastAndroid.show('Connection Successful', ToastAndroid.SHORT);
      }
    });
    return this.state.connected;
  }
  componentDidMount() {
    this.isNetConnected();
  }
  async loginFlow(user) {
    this.setState({animating: true});
    console.log('Connected', this.state.connected, this.isNetConnected());
    const {navigate} = this.props.navigation;
    var thiz = this;
    this.isNetConnected();

    if (!this.state.connected || !this.isNetConnected()) {
      this.setState({animating: false});
      return false;
    } else {
      try {
        db.ref('/users')
          .child(user.phone)
          .once('value', function(snapshot) {
            thiz.setState({animating: false});
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
              navigate('Initial', {storename: snapshot.val().storename});
              }
            }
          });
      } catch (e) {
        console.log(e);
        this.setState({animating: false});
      }
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    var display = this.state.animating ? 'flex' : 'none';
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
          <View
            style={{
              display: display,
              alignSelf: 'center',
              alignItems: 'center',
              width: '70%',
            }}>
            <Text style={styles.aiText}>{this.state.aiText}</Text>
            <ActivityIndicator
              animating={this.state.animating}
              size="large"
              color="#3440a8"
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default LoginScreen;
