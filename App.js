/**
 * triviApp
 * Aplicacion para poner en prueba tu conocimiento en distintas areas.
 * @author Adham gatriff <adhamgatriff@gmail.com>
 */

import React from 'react';
import { StatusBar, View } from 'react-native';
import StackNavigation from './components/routes';
import Color from './resources/Colors';

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar
      backgroundColor={Color.black}
      barStyle="light-content"
    />
    <StackNavigation />
  </View>
);

export default App;
