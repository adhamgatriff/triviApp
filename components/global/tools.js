// @flow
import { AsyncStorage, Alert } from 'react-native';

type FetchedQuestions = {
  results: Array<{
    category: string,
    correct_answer: string,
    difficulty: string,
    incorrect_answers: Array<string>,
    question: string,
    type: string,
  }>
}

export const fetchQuestions = (difficulty: string, questionNumber: string, categorySelected: string) : Promise<FetchedQuestions> => {
  const APIURL: string = `https://opentdb.com/api.php?amount=${questionNumber || '10'}&category=${(categorySelected !== 'any') ? categorySelected : ''}&difficulty=${difficulty || ''}`;

  return fetch(APIURL)
    .then(res => res.json())
    .then(question => question);
};

export const storeData = async (data: {user: string, points: number }) : Promise<void> => {
  try {
    const stats:Array<{user: string, points: number }> = JSON.parse(await AsyncStorage.getItem('stats'));
    await AsyncStorage.setItem('stats', JSON.stringify(stats !== null ? [data, ...stats] : [data]));
  } catch (error) {
    Alert.alert('Notification', 'An error has occurred saving the data.', [{ text: 'OK' }], { cancelable: false });
  }
};
