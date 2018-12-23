import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Menu from '../views/Menu';

// remove
import GenericComponent from '../views/genericComponent';

export default createAppContainer(
  createStackNavigator({
    Home: { screen: Home },
    Menu: { screen: Menu },
    GenericComponent: { screen: GenericComponent },
  },
  {
    headerMode: 'none',
    initialRouteName: 'GenericComponent',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }),
);
