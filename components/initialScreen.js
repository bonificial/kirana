//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styles from './styles/styles';
import { Icon } from 'react-native-elements';
 
// create a component
class initialScreen extends Component {
    static navigationOptions = {
        title:'Welcome to Kirana'
    }
  render() {
    const {navigation} = this.props;
     const {navigate} = this.props.navigation;
    return (
      <View style={stylesl.container}>
        <View  >
          <Text>
            Howdy, Welcome to *K*I*R*A*N*A*{navigation.getParam('email')}
          </Text>
        </View>
        <View style={styles.inlineTextsContainer}>
          <TouchableOpacity onPress={() => navigate('Login')}>
          <Text style={{paddingVertical:20}}></Text>
            <Text style={styles.inlineTexts}> Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const stylesl = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
 
//make this component available to the app
export default initialScreen;

 