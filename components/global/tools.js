import { AsyncStorage, Alert } from 'react-native';

export const fetchQuestions = (difficulty: string, questionNumber: string, categorySelected: string) => {
  const APIURL = `https://opentdb.com/api.php?amount=${questionNumber || '10'}&category=${(categorySelected !== 'any') ? categorySelected : ''}&difficulty=${difficulty || ''}`;

  return fetch(APIURL)
    .then(res => res.json())
    .then(question => question);
};

export const storeData = async (data: {user: string, points: number }) => {
  try {
    const stats = JSON.parse(await AsyncStorage.getItem('stats'));
    await AsyncStorage.setItem('stats', JSON.stringify(stats !== null ? [data, ...stats] : [data]));
  } catch (error) {
    Alert.alert('Notification', 'An error has occurred saving the data.', [{ text: 'OK' }], { cancelable: false });
  }
};
