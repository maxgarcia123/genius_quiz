import React from 'react';

export type QuestionsProps = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  answers: string[];
  incorrectAnswers: string[];
  answeredCorrectly: boolean | null;
  answerMarked?: string | null;
};

export type QuestionComponentProps = {
  question: string;
  correctAnswer: string;
  answers: string[];
  name: string;
  index: number;
  // eslint-disable-next-line no-unused-vars
  handleOnchange: (value: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ResponseGetQuestion = {
  results: GetQuestionProps[];
};

export type GetQuestionProps = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  answers: string[];
  // eslint-disable-next-line camelcase
  incorrect_answers: string[];
  // eslint-disable-next-line camelcase
  correct_answer: string;
};
