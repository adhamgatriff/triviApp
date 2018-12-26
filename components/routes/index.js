import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Menu from '../views/Menu';
import QuestionScreen from '../views/QuestionScreen';

export default createAppContainer(
  createStackNavigator({
    Home: { screen: Home },
    Menu: { screen: Menu },
    QuestionScreen: { screen: QuestionScreen },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }),
);
