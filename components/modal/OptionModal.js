// @flow
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { Sae } from 'react-native-textinput-effects';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../../resources/Colors';
import Button from '../global/Button';
import { questionNumber as questionsItems, difficulty as difficultyItems } from '../../resources/data';
import { fetchQuestions } from '../global/tools';

type State = {
  username: string,
  difficulty: string,
  questionNumber: string,
};

type Props = {
  navigation: {
    navigate: Function,
  },
  isVisible: boolean,
  toggleModal: Function,
  categorySelected: null | string,
}

export default class OptionModal extends Component <Props, State> {
  state = {
    username: 'User',
    difficulty: 'easy',
    questionNumber: '10',
  }

  setUsername = (username: string) => this.setState({ username });

  setDifficulty = (difficulty: string) => this.setState({ difficulty });

  setQuestionNumber = (questionNumber: string) => this.setState({ questionNumber });

  handleSubmit = async () => {
    const { username, difficulty, questionNumber } = this.state;
    const { navigation, categorySelected, toggleModal } = this.props;

    if (!username.trim()) {
      Alert.alert('Notification', 'The user is empty.', [{ text: 'OK' }], { cancelable: false });
    } else if (!difficulty.trim()) {
      Alert.alert('Notification', 'Select a difficulty.', [{ text: 'OK' }], { cancelable: false });
    } else if (!questionNumber.trim()) {
      Alert.alert('Notification', 'Select a number of questions.', [{ text: 'OK' }], { cancelable: false });
    } else {
      const questions = await fetchQuestions(difficulty, questionNumber, categorySelected)
        .catch(() => {
          Alert.alert(
            'Notification',
            'Error fetching questions, try again',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        });

      if (questions) {
        toggleModal();
        navigation.navigate('QuestionScreen', {
          questions: questions.results,
          questionsLength: questions.results.length,
          username,
        });
      }
    }
  }

  render() {
    const { isVisible, toggleModal } = this.props;
    const { username, difficulty, questionNumber } = this.state;

    return (
      <View>
        <Modal isVisible={isVisible}>
          <View style={styles.dialogStyle}>
            <View style={styles.titleWrapper}>
              <Button
                buttonStyle={styles.backButton}
                icon="md-arrow-back"
                iconColor={Colors.black}
                action={() => toggleModal()}
              />
              <Text style={styles.title}>Options</Text>
            </View>
            <View style={styles.container}>
              <Sae
                label="Username"
                iconClass={Icon}
                iconName="md-person"
                labelStyle={styles.labelStyle}
                inputStyle={styles.inputStyle}
                iconColor={Colors.red}
                onChangeText={text => this.setUsername(text)}
                defaultValue={username}
              />
              <View style={styles.firstInputContainer}>
                <Text style={styles.dialogText}>Number of questions</Text>
                <RNPickerSelect
                  style={{ underline: { borderTopColor: Colors.red, borderTopWidth: 1.5 } }}
                  placeholder={{ label: 'Select a number of questions', value: null }}
                  placeholderTextColor={Colors.gray}
                  items={questionsItems}
                  onValueChange={q => this.setQuestionNumber(q)}
                  value={questionNumber}
                />
              </View>
              <View style={styles.secondInputContainer}>
                <Text style={styles.dialogText}>Difficulty</Text>
                <RNPickerSelect
                  style={{ underline: { borderTopColor: Colors.red, borderTopWidth: 1.5 } }}
                  placeholder={{ label: 'Select a difficulty', value: null }}
                  placeholderTextColor={Colors.gray}
                  items={difficultyItems}
                  onValueChange={diff => this.setDifficulty(diff)}
                  value={difficulty}
                />
              </View>
              <Button text="GO" action={this.handleSubmit} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: Colors.yellow,
    borderRadius: 18,
  },
  container: {
    paddingHorizontal: 10,
    marginTop: 0,
    paddingBottom: 5,
  },
  labelStyle: {
    color: Colors.black,
    fontSize: 16,
  },
  inputStyle: {
    color: Colors.black,
    paddingTop: 0,
    fontSize: 16,
  },
  firstInputContainer: {
    marginTop: 10,
  },
  secondInputContainer: {
    marginVertical: 10,
  },
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    marginTop: 5,
    flexDirection: 'row',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  title: {
    flex: 1,
    fontFamily: 'BreeSerif',
    fontSize: 26,
    color: Colors.black,
    textAlign: 'center',
  },
  dialogText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: 'bold',
  },
});
