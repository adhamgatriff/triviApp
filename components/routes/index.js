import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Menu from '../views/Menu';

export default createAppContainer(
  createStackNavigator({
    Home: { screen: Home },
    Menu: { screen: Menu },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }),
);
