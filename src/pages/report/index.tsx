import React from 'react';
import './style.css';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from '@material-ui/core';
import Radio from '@mui/material/Radio';
import {green, red} from '@mui/material/colors';
import {Link} from 'react-router-dom';
import {useQuizContext} from '../../contexts/quizContexts';
import SimpleButton from '../../components/simpleButton';

const Report = () => {
  const {numberCorrectAnswers, numberQuestions, answeredForm} =
    useQuizContext();

  const handleRadioColor = (correctAnswer: string, Answer: string) => {
    if (correctAnswer === Answer) {
      return {
        color: green[800],
        '&.Mui-checked': {
          color: green[600],
        },
      };
    }
    return {
      color: red[600],
      '&.Mui-checked': {
        color: red[800],
      },
    };
  };

  const handleIsChecked = (markedAnswer?: string | null, Answer?: string) => {
    return markedAnswer === Answer;
  };

  return (
    <div className="container gradient-wave-background bg-full ">
      <div className="quiz-container">
        <div className="title-container">
          <h1>Report of your quiz</h1>
          <LibraryBooks fontSize="large" id="setting-icon" />
        </div>
        {answeredForm?.length > 0 ? (
          <>
            <div id="report-container">
              <h3>{numberCorrectAnswers} right answers</h3>
              <h3 style={{marginLeft: '1rem'}}>
                {numberQuestions - numberCorrectAnswers} wrong answers
              </h3>
            </div>
            <div id="answered-form-container">
              {answeredForm.map((question, index) => {
                return (
                  <div key={Math.random()}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        {index + 1}) {question.question}
                      </FormLabel>
                      <RadioGroup>
                        {question.answers.map((value, indexAnswers) => {
                          return (
                            <FormControlLabel
                              id={`${index}.${indexAnswers}`}
                              value={`${value}${index}`}
                              label={value}
                              checked={handleIsChecked(
                                question.answerMarked,
                                `${value}${index}`,
                              )}
                              control={
                                <Radio
                                  sx={handleRadioColor(
                                    question.correctAnswer,
                                    value,
                                  )}
                                />
                              }
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </div>
                );
              })}
            </div>
            <Link to="/">
              <SimpleButton
                title="Finish"
                color={{type: 'primary'}}
                style={{
                  marginTop: '1rem',
                  marginBottom: '1rem',
                  width: '150px',
                }}
              />
            </Link>
          </>
        ) : (
          <>
            <p style={{marginTop: '20%'}}>
              In this moment you do not have any quiz saved :(
            </p>
            <Link to="/">
              <SimpleButton
                title="Go to Home"
                color={{type: 'primary'}}
                style={{marginTop: '3rem', width: '150px'}}
              />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
