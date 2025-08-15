import React from 'react';
import './style.css';
import {FieldArray, Form, Formik, getIn} from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import {green, red} from '@mui/material/colors';
import {FormControl, FormLabel} from '@material-ui/core';
import {Button} from '@mui/material';
import {useQuizContext} from '../../contexts/quizContexts';

const Quiz = () => {
  const {questions, handleFinishQuiz} = useQuizContext();

  const handleRadioColor = (answeredCorrectly: boolean | null) => {
    if (answeredCorrectly === null) {
      return {};
    }
    if (answeredCorrectly) {
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
  const formQuestions = questions;
  return (
    <div className="container gradient-wave-background bg-full ">
      <div
        style={{overflow: 'scroll', padding: '2.2rem'}}
        className="quiz-container">
        <Formik
          initialValues={{formQuestions}}
          onSubmit={values => {
            handleFinishQuiz(values.formQuestions);
          }}>
          {({values, setFieldValue, touched, setFieldTouched}) => (
            // noinspection BadExpressionStatementJS
            <Form
              style={{display: 'flex', flexDirection: 'column'}}
              noValidate
              autoComplete="off">
              <FieldArray
                name="questions-quiz"
                render={() => (
                  <div>
                    {
                      // @ts-ignore
                      values.formQuestions.map((question, index) => {
                        const name = `formQuestions[${index}].answeredCorrectly`;
                        const touchedRadio = getIn(touched, name);
                        return (
                          <div key={Math.random()}>
                            <FormControl component="fieldset">
                              <FormLabel component="legend">
                                {index + 1}) {question.question}
                              </FormLabel>
                              <RadioGroup
                                name={name}
                                value={question?.answerMarked}
                                onChange={event => {
                                  setFieldTouched(name, true);
                                  setFieldValue(
                                    `formQuestions[${index}].answerMarked`,
                                    `${event.target.value}`,
                                  );
                                  if (
                                    `${event.target.value}` ===
                                    `${question.correctAnswer}${index}`
                                  ) {
                                    return setFieldValue(name, true);
                                  }
                                  return setFieldValue(name, false);
                                }}>
                                {question.answers.map((value, indexAnswers) => {
                                  return (
                                    <FormControlLabel
                                      id={`${name}.${index}.${indexAnswers}`}
                                      value={`${value}${index}`}
                                      name={name}
                                      label={value}
                                      disabled={touchedRadio}
                                      control={
                                        <Radio
                                          sx={
                                            touchedRadio
                                              ? handleRadioColor(
                                                  question.answeredCorrectly,
                                                )
                                              : {}
                                          }
                                        />
                                      }
                                    />
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                          </div>
                        );
                      })
                    }
                  </div>
                )}
              />
              <Button
                id="submit-button"
                type="submit"
                color="success"
                variant="contained"
                // disabled={!isValid || values.people.length === 0}
              >
                submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Quiz;
