/**
 * triviApp
 * Application to test your knowledge in different areas.
 * @author Adham gatriff <adhamgatriff@gmail.com>
 */
// @flow
import * as React from 'react';
import { StatusBar, View } from 'react-native';
import StackNavigation from './components/routes';
import Color from './resources/Colors';

const App = (): React.Node => (
  <View style={{ flex: 1 }}>
    <StatusBar
      backgroundColor={Color.black}
      barStyle="light-content"
    />
    <StackNavigation />
  </View>
);

export default App;
