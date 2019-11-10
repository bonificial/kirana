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
import styles from './styles/styles';

// create a component
 class LoginScreen extends Component {
  state = {
    text: '',
  };

  render() {
    return (
      <ImageBackground
        source={require('./images/bluebg.png')}
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
              onPress={() => {this.props.navigation.goBack();     }}>
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
export default (LoginScreen);