// @flow
import * as React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import Colors from '../../resources/Colors';
import Button from '../global/Button';
import { fetchQuestions } from '../global/tools';

type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: Array<string>,
  question: string,
  type: string,
}

type FetchedQuestions = {
  results: Array<Question>
}

type Props = {
  navigation: {
    navigate: Function,
    getParam: Function,
    params: {
      username: string,
      difficulty: string,
      questionNumber: string,
      categorySelected: string,
    }
  },
}

/**
 * Show the points reached
 */
export default class ResultScreen extends React.Component <Props> {
  // eslint-disable-next-line
    constructor(props: Props) {
    super(props);
  }

  /**
   * Back to the menu button handler.
   */
  goToMenu = () : void => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  }

  /**
   * Play again button handler.
   */
  playAgain = async () : Promise<void> => {
    const { navigation } = this.props;
    const username: string = navigation.getParam('username');
    const difficulty: string = navigation.getParam('difficulty');
    const questionNumber: string = navigation.getParam('questionNumber');
    const categorySelected: string = navigation.getParam('categorySelected');

    const questions: FetchedQuestions = await fetchQuestions(difficulty, questionNumber, categorySelected)
      .catch(() => {
        Alert.alert(
          'Notification',
          'Error fetching questions, try again',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      });

    if (questions) {
      navigation.navigate('QuestionScreen', {
        questions: questions.results,
        questionsLength: questions.results.length,
        username,
        difficulty,
        categorySelected,
      });
    }
  }

  render() : React.Node {
    const { navigation } = this.props;
    const username: string = navigation.getParam('username');
    const pointsEarned: number = navigation.getParam('pointsEarned');

    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>{`${pointsEarned < 100 ? 'Better luck next time' : 'Congratulations'} ${username}!!`}</Text>
        <View style={styles.middleWrapper}>
          <Text style={styles.middleText}>Your final score was</Text>
          <Text style={[styles.middleText, { color: Colors.yellow, fontSize: 30 }]}>{pointsEarned}</Text>
        </View>
        <View style={styles.buttonsBelow}>
          <Button
            buttonStyle={styles.backButton}
            textStyle={{ letterSpacing: 0 }}
            icon="md-return-left"
            iconColor={Colors.red}
            text="Go to Menu"
            action={this.goToMenu}
          />
          <Button
            buttonStyle={styles.backButton}
            textStyle={{ letterSpacing: 0 }}
            icon="md-refresh"
            iconColor={Colors.red}
            text="Play again"
            action={this.playAgain}
          />
        </View>
      </View>
    );
  }
}

const styles: StyleSheet.styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
    paddingTop: 20,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'BreeSerif',
    fontSize: 30,
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  middleWrapper: {
    paddingHorizontal: 10,
  },
  buttonsBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  middleText: {
    color: Colors.red,
    fontSize: 26,
    textAlign: 'center',
    fontWeight: 'bold',

  },
});
