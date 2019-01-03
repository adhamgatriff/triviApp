// @flow
import * as React from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import unescape from 'unescape';
import Button from '../global/Button';
import Colors from '../../resources/Colors';
import QuestionResultModal from '../modal/QuestionResultModal';
import { storeData } from '../global/tools';
import Spinner from '../global/Spinner';

type Question = {
  category: string,
  correct_answer: string,
  difficulty: string,
  incorrect_answers: Array<string>,
  question: string,
  type: string,
}

type State = {
  isModalVisible: boolean,
  currentQuestionNumber: number,
  currentQuestion?:? Question,
  pointsEarned: number,
  currentCorrectAnswer: string | null,
  answerSelected: string,
  currentAnswers: Array<string>,
  isCorrect: boolean,
}

type Props = {
  navigation: {
    navigate: Function,
    getParam: Function,
    params: {
      questions: Array<Question>,
      questionsLength: number,
      username: string,
    }
  },
}

/**
 * Place where the questions are asked =D
 */
export default class QuestionScreen extends React.Component <Props, State> {
  state = {
    isModalVisible: false,
    currentQuestionNumber: 0,
    currentQuestion: null,
    currentAnswers: [],
    currentCorrectAnswer: null,
    pointsEarned: 0,
    answerSelected: '',
    isCorrect: false,
  };

  componentDidMount(): void {
    this.showQuestion(0);
  }

  /**
   * Handle back button.
   */
  goBack = (): void => {
    const { navigation } = this.props;

    Alert.alert(
      'Notification',
      'Do you want to leave the game?',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        { text: 'OK', onPress: () => { navigation.navigate('Menu'); } },
      ],
      { cancelable: false },
    );
  }

  /**
   * Show the current question in screen.
   * @param  {number} questionNumber
   */
  showQuestion = (questionNumber: number) : void => {
    const { navigation } = this.props;
    const questions: Array<Question> = navigation.getParam('questions');
    const questionsLength: number = navigation.getParam('questionsLength');

    if (!questionsLength) {
      Alert.alert('Notification', 'An error has occurred with the api, try again.', [{ text: 'OK' }], { cancelable: false });
    } else if (questionNumber > questionsLength - 1) {
      const username: string = navigation.getParam('username');
      const difficulty: string = navigation.getParam('difficulty');
      const categorySelected: string = navigation.getParam('categorySelected');
      const { pointsEarned } = this.state;

      storeData({ user: username, points: pointsEarned });
      this.setState({ isModalVisible: false });

      navigation.navigate('ResultScreen', {
        username,
        pointsEarned,
        difficulty,
        questionNumber,
        categorySelected,
      });
    } else {
      const currentQuestion: Question = questions[questionNumber];

      this.setState({
        isModalVisible: false,
        currentQuestion,
        currentQuestionNumber: questionNumber,
        currentAnswers: this.shuffleAnswers(currentQuestion.correct_answer, currentQuestion.incorrect_answers),
        currentCorrectAnswer: currentQuestion.correct_answer,
        answerSelected: '',
      });
    }
  }

  /**
   * Shows the result of the question, opens the result modal, if it is correct, it gives points.
   */
  showQuestionResult = (): void => {
    const {
      pointsEarned, currentQuestion, answerSelected, currentCorrectAnswer,
    } = this.state;

    if (answerSelected !== '') {
      let points: number = 0;
      let isCorrect: boolean = false;

      if (answerSelected === currentCorrectAnswer) {
        isCorrect = true;

        if (currentQuestion && currentQuestion.difficulty === 'hard') points = 30;
        else if (currentQuestion && currentQuestion.difficulty === 'medium') points = 20;
        else if (currentQuestion && currentQuestion.difficulty === 'easy') points = 10;
      }

      this.setState({
        isModalVisible: true,
        pointsEarned: pointsEarned + points,
        isCorrect,
      });
    } else {
      Alert.alert('Notification', 'Select one option.', [{ text: 'OK' }], { cancelable: false });
      this.setState({
        isModalVisible: false,
      });
    }
  }

  /**
   * Go to the next question.
   */
  nextQuestion = (): void => {
    const { currentQuestionNumber } = this.state;
    this.showQuestion(currentQuestionNumber + 1);
  }

  /**
   * Shuffle the correct answer with the incorrects.
   * @param  {string} correctAnsw
   * @param  {Array<string>} incorrectAnsw
   */
  shuffleAnswers = (correctAnsw: string, incorrectAnsw: Array<string>): Array<string> => [...incorrectAnsw, correctAnsw]
    .map((a: any) => [Math.random(), a])
    .sort((a: any, b: any) => a[0] - b[0])
    .map((a: any) => a[1])

  render(): React.Node {
    const {
      currentQuestion, currentQuestionNumber, answerSelected, currentAnswers,
      isModalVisible, isCorrect, currentCorrectAnswer,
    } = this.state;
    const { navigation } = this.props;
    const questionsLength: string = navigation.getParam('questionsLength');

    if (!currentQuestion) {
      return (<Spinner />);
    }

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Button
            buttonStyle={styles.backButton}
            icon="md-arrow-back"
            iconColor={Colors.yellow}
            action={this.goBack}
          />
          <Text style={[styles.title, styles.questionNumberText]}>
            {`${currentQuestionNumber + 1} / ${questionsLength}`}
          </Text>
        </View>
        <Text style={styles.title}>{unescape(currentQuestion.question.replace(/&#039;/g, "'"))}</Text>
        <View style={styles.questions}>
          {currentAnswers
            .map((answer, index) => (
              <Button
                buttonStyle={[answerSelected === answer && styles.selectedAnswerButtonStyle, { marginVertical: 5 }]}
                textStyle={[answerSelected === answer ? styles.selectedAnswerTextStyle : styles.answerTextStyle]}
                key={index}
                text={(answer).replace(/&#039;/g, "'")}
                noUpperCase
                action={() => this.setState({ answerSelected: answer })}
              />
            ))}
        </View>
        <View style={styles.buttonsBelow}>
          <Button
            buttonStyle={styles.backButton}
            textStyle={{ letterSpacing: 0 }}
            icon="md-hand"
            iconColor={Colors.red}
            text="Skip question"
            action={this.nextQuestion}
          />
          <Button
            buttonStyle={styles.backButton}
            textStyle={{ letterSpacing: 0 }}
            icon="md-arrow-forward"
            iconColor={Colors.red}
            text="Confirm"
            action={this.showQuestionResult}
          />
        </View>
        <QuestionResultModal
          isVisible={isModalVisible}
          isCorrect={isCorrect}
          correctAnswer={currentCorrectAnswer}
          nextQuestion={this.nextQuestion}
        />
      </View>
    );
  }
}

const styles: StyleSheet.styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
  },
  titleWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 5,
    marginVertical: 5,
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'BreeSerif',
    fontSize: 26,
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  questionNumberText: {
    flex: 1,
    textAlign: 'right',
    color: Colors.yellow,
    paddingRight: 10,
  },
  questions: {
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  buttonsBelow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  answerTextStyle: {
    letterSpacing: 0,
    fontSize: 18,
    textAlign: 'center',
  },
  selectedAnswerTextStyle: {
    color: Colors.black,
    letterSpacing: 0,
    fontSize: 18,
    textAlign: 'center',
  },
  selectedAnswerButtonStyle: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.red,
    borderWidth: 1,
  },
});
