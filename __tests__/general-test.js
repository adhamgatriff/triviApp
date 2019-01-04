import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../components/views/Home';
import Menu from '../components/views/Menu';
import QuestionScreen from '../components/views/QuestionScreen';
import ResultScreen from '../components/views/ResultScreen';
import Stats from '../components/views/Stats';

describe('Mains Componets render correctly', () => {
  test('Home should render correctly', () => {
    const home = renderer.create(<Home />).toJSON();
    expect(home).toMatchSnapshot();
  });

  test('Menu should render correctly', () => {
    const menu = renderer.create(<Menu />).toJSON();
    expect(menu).toMatchSnapshot();
  });

  test('QuestionScreen should render correctly', () => {
    const navigationMock = {
      getParam: jest.fn((x) => {
        if (x === 'questions') {
          return [{
            question: 'Random Question',
            correct_answer: 'a', // don't judge me
            incorrect_answers: ['a'],
          }];
        }
        if (x === 'questionsLength') return '1';
        return 'test';
      }),
    };

    const questionS = renderer.create(<QuestionScreen navigation={navigationMock} />).toJSON();
    expect(questionS).toMatchSnapshot();
  });

  test('ResultScreen should render correctly', () => {
    const navigationMock = {
      getParam: jest.fn((x) => {
        if (x === 'username') return 'testuser';
        if (x === 'pointsEarned') return '100';
        return 'test';
      }),
    };

    const result = renderer.create(<ResultScreen navigation={navigationMock} />).toJSON();
    expect(result).toMatchSnapshot();
  });

  test('Stats should render correctly', () => {
    const stats = renderer.create(<Stats />).toJSON();
    expect(stats).toMatchSnapshot();
  });
});
