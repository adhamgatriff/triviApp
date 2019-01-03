// @flow
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Menu from '../views/Menu';
import QuestionScreen from '../views/QuestionScreen';
import ResultScreen from '../views/ResultScreen';
import Stats from '../views/Stats';

export default createAppContainer(
  createStackNavigator({
    Home: { screen: Home },
    Menu: { screen: Menu },
    QuestionScreen: { screen: QuestionScreen },
    ResultScreen: { screen: ResultScreen },
    Stats: { screen: Stats },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }),
);
