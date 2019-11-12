import {Stylesheet} from 'react-native';
//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#2c3e50',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Libre Baskerville',
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: 10,
  },
  loginContainer: {
    alignItems: 'center',
    flex: 0.5,
    justifyContent: 'center',
  },
  inputContainer: {
    paddingHorizontal: 40,
    marginBottom: 20,
  },
  inputContainer_nmg: {
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  inlineTextsContainer: {
    paddingHorizontal: 20,
  },
  verticalDivider: {
    borderRightWidth: 0.3,
    borderRightColor: 'black',
    height: '100%',
  },
  spaceEvens: {
    paddingHorizontal: 40,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputs: {
    backgroundColor: '#9292b72e',
  },
  smallinputs: {
    backgroundColor: '#9292b72e',
    //height:40
  },
  logo: {
    position: 'relative',
    flex: 0.5,
    width: 100,
    height: 100,
  },

  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'row',

    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 40,
    marginBottom: 20,
    //flex: 0.5,
  },
  loginButton: {
    backgroundColor: '#2980b6',
    height: 55,
    paddingVertical: 10,
    flex: 1,
    width: '100%',
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  inlineTexts: {
    display: 'flex',
    fontSize: 17,
    
   
  },
});
