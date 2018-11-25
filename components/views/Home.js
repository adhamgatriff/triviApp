import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../resources/Colors';
import Button from '../global/Button';

type State = {};

export default class Home extends Component <State> {
  hola = () => {};

  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>TriviApp</Text>
        <View style={styles.mainContainer}>
          <Button buttonStyle={styles.button} textStyle={styles.buttonText} text="Play" />
          <View style={styles.buttonWrapper}>
            <Button buttonStyle={styles.otherButton} icon="md-stats" />
            <Button buttonStyle={styles.otherButton} icon="md-settings" />
          </View>
        </View>
        <View><Text style={styles.copyrightText}>@Adhamgatriff</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'BreeSerif',
    fontSize: 56,
    color: Colors.gray,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    marginTop: 20,
  },
  button: {
    width: '90%',
    height: 50,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
  },
  otherButton: {
    backgroundColor: Colors.yellow,
    height: 45,
  },
  copyrightText: {
    color: Colors.gray,
    fontSize: 14,
    alignSelf: 'flex-end',
  },
});
