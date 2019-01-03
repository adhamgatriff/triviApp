// @flow
import * as React from 'react';
import {
  View, Text, StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../../resources/Colors';
import Button from '../global/Button';

type Props = {
  isVisible: boolean,
  isCorrect: boolean,
  correctAnswer ?:? string,
  nextQuestion: Function,
}

const QuestionResultModal = (props: Props): React.Node => {
  const {
    isVisible, isCorrect, correctAnswer, nextQuestion,
  } = props;

  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={styles.dialogStyle}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{isCorrect ? 'Correct!!' : 'Error!!'}</Text>
          </View>
          {!isCorrect && (
            <View>
              <Text style={styles.dialogText}>The correct answer is</Text>
              <Text style={styles.correctAnswer}>
                {correctAnswer}
              </Text>
            </View>
          )}
          <View style={styles.container}>
            <Button text="NEXT QUESTION" action={nextQuestion} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

QuestionResultModal.defaultProps = {
  correctAnswer: '',
};

const styles: StyleSheet.style = StyleSheet.create({
  dialogStyle: {
    backgroundColor: Colors.yellow,
    borderRadius: 18,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 0,
    paddingBottom: 5,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 5,
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    fontFamily: 'BreeSerif',
    fontSize: 26,
    color: Colors.black,
    textAlign: 'center',
  },
  dialogText: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
  correctAnswer: {
    fontSize: 18,
    color: Colors.red,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QuestionResultModal;
