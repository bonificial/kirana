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
  aiText: {
    fontSize: 20,
    fontFamily: 'Libre Baskerville',
    paddingVertical: 20,
    color: 'green',
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: 'Libre Baskerville',
    textTransform: 'uppercase',
    paddingVertical: 10,
    color: 'purple',
  },
  addItemTitle: {
    fontSize: 15,
    fontFamily: 'Libre Baskerville',
    textTransform: 'uppercase',
    color: 'purple',
  },
  justifiedCenter: {
    justifyContent: 'center',
  },
  priceTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    fontFamily: 'Libre Baskerville',
    textTransform: 'uppercase',
    paddingVertical: 10,
    color: 'purple',
  },
  icon: {
    width: 24,
    height: 24,
  },
  navButtonsContainer: {
    backgroundColor: '#cbf542',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 50,
    marginVertical: 5,
  },
  navButtonsText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'blue',
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
  inputs_v2: {
    backgroundColor: 'rgba(127, 238, 250, 0.67)',
    fontSize: 20,
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
  labels: {fontSize: 21, fontWeight: 'bold', fontStyle: 'normal'},
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
  logoutButton: {
    borderColor: 'green',
    borderWidth: 1,
    marginTop: 10,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 150,
  },
  cameraPreview: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    width: '95%',
    alignSelf: 'center',
    height: 150,
    maxHeight: 150,
    overflow: 'hidden',
    borderWidth: 2,
    marginTop: 30,
    marginBottom: 30,
  },
  buttonRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rowButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    color: '#fff',
    marginHorizontal: 10,
  },
});
