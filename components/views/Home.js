// @flow
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../resources/Colors';
import Button from '../global/Button';

type Props = {
  navigation: {
    navigate: Function
  },
};

/**
 * Home screen
 */
export default class Home extends React.Component <Props> {
  /**
   * Play button handler
   */
  handlePlay = () : any => {
    const { navigation } = this.props;
    return navigation.navigate({
      routeName: 'Menu',
    });
  }

  /**
   * Stats button handler
   */
  handleStats = (): any => {
    const { navigation } = this.props;
    return navigation.navigate({
      routeName: 'Stats',
    });
  }

  render() : React.Node {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>TriviApp</Text>
        <View style={styles.mainContainer}>
          <Button text="Play" buttonStyle={styles.button} textStyle={styles.buttonText} action={this.handlePlay} />
          <View style={styles.buttonWrapper}>
            <Button buttonStyle={styles.otherButton} icon="md-stats" action={this.handleStats} />
            {/* <Button buttonStyle={styles.otherButton} icon="md-settings" action={() => {}} /> */}
          </View>
        </View>
        <View><Text style={styles.copyrightText}>@Adhamgatriff</Text></View>
      </View>
    );
  }
}

const styles: StyleSheet.styles = StyleSheet.create({
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
