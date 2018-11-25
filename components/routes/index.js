import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';

export default createAppContainer(
  createStackNavigator({
    Home: { screen: Home },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }),
);
