import React, {createContext, useContext, useEffect, useState} from 'react';
// @ts-ignore
import {AxiosResponse} from 'axios';
import {useNavigate} from 'react-router-dom';
import {
  QuestionsProps,
  ResponseGetQuestion,
  GetQuestionProps,
} from '../utils/types';
import api from '../services/api';

type QuizContextProps = {
  numberQuestions: number;
  setNumberQuestions: React.Dispatch<number>;
  difficultyValue: number;
  setDifficultyValue: React.Dispatch<number>;
  questions: QuestionsProps[] | [];
  answeredForm: QuestionsProps[] | [];
  numberCorrectAnswers: number;
  percentCorrectAnswers: number;
  setPercentCorrectAnswers: React.Dispatch<number>;
  handlePercentCorrectAnswers: () => void;
  setAnswers: React.Dispatch<QuestionsProps[]> | React.Dispatch<[]>;
  getAnswers: () => void;
  // eslint-disable-next-line no-unused-vars
  handleFinishQuiz: (form: QuestionsProps[]) => void;
};

const QuizContext = createContext<QuizContextProps | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const QuizContextProvider = (props: Props) => {
  const [numberQuestions, setNumberQuestions] = useState(10);
  const [difficultyValue, setDifficultyValue] = useState(10);
  const [answeredForm, setLastForm] = useState<QuestionsProps[] | any>([]);
  const [questions, setQuestions] = useState([]);
  const [numberCorrectAnswers, setNumberCorrectAnswers] = useState(0);
  const [percentCorrectAnswers, setPercentCorrectAnswers] = useState(0);
  const {children} = props;
  const navigate = useNavigate();

  useEffect(() => {
    const form: any = localStorage.getItem('last-quiz-form');
    const formResults: any = localStorage.getItem('last-quiz-form-results');
    if (localStorage) {
      const formObj = JSON.parse(form);
      const formResultsObj = JSON.parse(formResults);
      setLastForm(formObj);
      setNumberQuestions(formResultsObj.numberQuestions);
      setNumberCorrectAnswers(formResultsObj.numberCorrectAnswers);
    }
  }, []);

  const handleSaveOnLocalStorage = (key: string, value: any) => {
    return localStorage.setItem(key, JSON.stringify(value));
  };

  const handlePercentCorrectAnswers = () => {
    return setPercentCorrectAnswers(numberCorrectAnswers / numberQuestions);
  };

  const handleDifficulty = (difficultyCode: number) => {
    switch (difficultyCode) {
      case 10:
        return 'easy';
      case 20:
        return 'medium';
      case 30:
        return 'hard';
      default:
        return 'easy';
    }
  };

  const handleGetRandomInt = (max: number) => {
    return Math.floor(Math.random() * max) - 1;
  };

  const handleSetAnswers = (questionData: GetQuestionProps[]) => {
    const newQuestions: ResponseGetQuestion[] | any = [];
    questionData.map(question => {
      const answers = question.incorrect_answers;
      answers?.splice(handleGetRandomInt(4), 0, question.correct_answer);
      return newQuestions.push({
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers,
        answers,
        answeredCorrectly: null,
      });
    });
    console.log(newQuestions);
    setQuestions(newQuestions);
    return navigate('/quiz');
  };

  const getAnswers = () => {
    api
      .get(
        `api.php?amount=${numberQuestions}&category=9&difficulty=${handleDifficulty(
          difficultyValue,
        )}&type=multiple`,
      )
      .then((res: AxiosResponse<ResponseGetQuestion>) => {
        console.log(res.data.results);
        handleSetAnswers(res.data.results);
      });
  };

  const handleFinishQuiz = async (formQuiz: QuestionsProps[]) => {
    localStorage.removeItem('last-quiz-form');
    localStorage.removeItem('last-quiz-form-results');
    let answersRight = 0;
    await formQuiz.map(question => {
      if (question.answeredCorrectly) {
        // eslint-disable-next-line no-return-assign
        return (answersRight += 1);
      }
      return null;
    });
    setNumberCorrectAnswers(answersRight);
    setLastForm(formQuiz);
    handleSaveOnLocalStorage('last-quiz-form', formQuiz);
    handleSaveOnLocalStorage('last-quiz-form-results', {
      numberCorrectAnswers: answersRight,
      numberQuestions,
    });
    navigate('/report');
  };

  const value = {
    numberQuestions,
    setNumberQuestions,
    difficultyValue,
    setDifficultyValue,
    questions,
    answeredForm,
    setAnswers: setQuestions,
    numberCorrectAnswers,
    setNumberCorrectAnswers,
    percentCorrectAnswers,
    setPercentCorrectAnswers,
    handlePercentCorrectAnswers,
    getAnswers,
    handleFinishQuiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (typeof context === 'undefined') {
    throw new Error('useQuizContext must be used within an AppContext');
  }

  return context;
};
