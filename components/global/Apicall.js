const fetchQuestions = (difficulty: string, questionNumber: string, categorySelected: string) => {
  const APIURL = `https://opentdb.com/api.php?amount=${questionNumber || '10'}&category=${categorySelected || ''}&difficulty=${difficulty || ''}`;
  return fetch(APIURL)
    .then(res => res.json())
    .then(question => question);
};

export default fetchQuestions;
