// @flow
import React, { Component } from 'react';
import {
  Text, View, StyleSheet, Alert,
} from 'react-native';
import unescape from 'unescape';
import Button from '../global/Button';
import Colors from '../../resources/Colors';
import QuestionResultModal from '../modal/QuestionResultModal';
import { storeData } from '../global/tools';

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
    }
  },
}

export default class QuestionScreen extends Component <Props, State> {
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

  componentDidMount() {
    this.showQuestion(0);
  }

  showQuestion = (questionNumber: number) => {
    const { navigation } = this.props;
    const questions = navigation.getParam('questions');
    const questionsLength = navigation.getParam('questionsLength');

    if (!questionsLength) {
      Alert.alert('Notification', 'An error has occurred with the api, try again.', [{ text: 'OK' }], { cancelable: false });
    } else if (questionNumber > questionsLength - 1) {
      const username = navigation.getParam('username');
      const { pointsEarned } = this.state;

      storeData({ user: username, points: pointsEarned });
      this.setState({ isModalVisible: false });
    } else {
      const currentQuestion = questions[questionNumber];

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

  showQuestionResult = () => {
    const {
      pointsEarned, currentQuestion, answerSelected, currentCorrectAnswer,
    } = this.state;

    if (answerSelected !== '') {
      let points = 0;
      let isCorrect = false;


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

  nextQuestion = () => {
    const { currentQuestionNumber } = this.state;
    this.showQuestion(currentQuestionNumber + 1);
  }

  shuffleAnswers = (correctAnsw: string, incorrectAnsw: Array<string>): Array<string> => [...incorrectAnsw, correctAnsw]
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])

  render() {
    const {
      currentQuestion, currentQuestionNumber, answerSelected, currentAnswers,
      isModalVisible, isCorrect, currentCorrectAnswer,
    } = this.state;
    const { navigation } = this.props;
    const questionsLength = navigation.getParam('questionsLength');

    if (!currentQuestion) {
      return (<Text>Cargando</Text>);
    }

    return (
      <View style={styles.wrapper}>
        <View style={styles.titleWrapper}>
          <Button
            buttonStyle={styles.backButton}
            icon="md-arrow-back"
            iconColor={Colors.yellow}
            action={() => {}}
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
            action={() => {}}
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

const styles = StyleSheet.create({
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
