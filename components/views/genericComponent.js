import React, { Component } from 'react';
// import { Text } from 'react-native';
import QuestionScreen from './QuestionScreen';

type Props = {
  navigation: {
    navigate: Function
  },
};

type state = {
  questions: Array<{}>
}

export default class GenericComponent extends Component<Props, state> {
  constructor(props) {
    super(props);

    this.state = {
      questions: null,
      questionsLength: 0,
    };

    this.fetchQuestions();
  }

  fetchQuestions = () => {
    fetch('https://opentdb.com/api.php?amount=30')
      .then(res => res.json())
      .then((question) => {
        this.setState({
          questions: question.results,
          questionsLength: question.results.length,
        });
      });
  }

  render() {
    const { questions, questionsLength } = this.state;

    return (
      <QuestionScreen
        questions={questions}
        questionsLength={questionsLength}
      />
    );
  }
}
