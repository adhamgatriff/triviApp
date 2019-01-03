// @flow
import * as React from 'react';
import {
  StyleSheet, View, Text, ActivityIndicator,
} from 'react-native';
import Colors from '../../resources/Colors';

/** custom spinner */
const CustomSpinner = () : React.Node => (
  <View style={styles.wrapper}>
    <ActivityIndicator size="large" color={Colors.red} />
    <Text style={{ fontSize: 20, color: Colors.yellow }}>Loading</Text>
  </View>
);

const styles: StyleSheet.styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
  },
});

export default CustomSpinner;
