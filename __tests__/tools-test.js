import { fetchQuestions, shuffleAnswers } from '../components/global/tools';
import 'isomorphic-fetch';

describe('Tools tests', () => {
  test('should bring questions from API correctly', async () => {
    const questions = await fetchQuestions();
    expect(questions.results.length).toBeGreaterThanOrEqual(0);
  });

  test('should shuffle correctly', () => {
    expect(Array.isArray(shuffleAnswers('uno', ['dos', 'tres']))).toBe(true);
  });
});
