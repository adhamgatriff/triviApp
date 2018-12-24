// @flow
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import unescape from 'unescape';
import Button from '../global/Button';
import Colors from '../../resources/Colors';

type state = {
  currentQuestionNumber: number,
  currentQuestion: {
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: Array<string>,
    question: string,
    type: string,
  }
}

export default class QuestionScreen extends Component <state> {
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionNumber: 0,
      currentQuestion: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { questions } = this.props;

    if (!prevProps.questions && questions) {
      this.showQuestion(0);
    }
  }

  showQuestion = (questionNumber: number) => {
    const { questions, questionsLength } = this.props;

    if (questionNumber > questionsLength - 1) {
      console.log('do something when is over');
    } else {
      this.setState({
        currentQuestion: questions[questionNumber],
        currentQuestionNumber: questionNumber,
      });
    }
  }

  nextQuestion = () => {
    const { currentQuestionNumber } = this.state;
    this.showQuestion(currentQuestionNumber + 1);
  }

  shuffleAnswers = (correctAnsw: Array<String>, incorrectAnsw: Array<String>) => [...incorrectAnsw, correctAnsw]
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0]).map(a => a[1])

  render() {
    const { currentQuestion, currentQuestionNumber } = this.state;
    const { questionsLength } = this.props;

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
          {this.shuffleAnswers(currentQuestion.correct_answer, currentQuestion.incorrect_answers)
            .map((answer, index) => (
              <Button
                buttonStyle={{ marginVertical: 5 }}
                textStyle={styles.answerTextStyle}
                key={index}
                text={answer.replace(/&#039;/g, "'")}
                noUpperCase
                action={() => {}}
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
            text="Next question"
            action={() => this.nextQuestion()}
          />
        </View>
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
});
