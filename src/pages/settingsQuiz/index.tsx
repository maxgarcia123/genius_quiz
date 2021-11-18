import React, {useState} from 'react';
import './style.css';
import Settings from '@material-ui/icons/Settings';
import {SelectChangeEvent} from '@mui/material/Select';
import {TextField} from '@mui/material';
import SimpleSelect, {MenuItemProps} from '../../components/select';
import SimpleButton from '../../components/simpleButton';
import {useQuizContext} from '../../contexts/quizContexts';

const SettingsQuiz = () => {
  const [errorNumberQuestions, setErrorNumberQuestions] = useState(false);
  const [difficultyValue, setDifficultyValue] = useState(10);
  const [finishedSettings, setFinishedSettings] = useState(false);
  const {numberQuestions, setNumberQuestions, getAnswers} = useQuizContext();
  const selectDifficultyItemsData: MenuItemProps[] = [
    {
      value: 10,
      label: 'Easy',
    },
    {
      value: 20,
      label: 'Medium',
    },
    {
      value: 30,
      label: 'Hard',
    },
  ];

  const handleDifficultyChange = (value: SelectChangeEvent) => {
    setDifficultyValue(Number(value.target.value));
  };

  const handleFinishSettings = () => {
    if (numberQuestions > 0 && Number.isInteger(numberQuestions)) {
      return setFinishedSettings(true);
    }

    return setErrorNumberQuestions(true);
  };

  return (
    <div id="background-settings">
      <div id="container">
        {finishedSettings ? (
          <div id="start-quiz-container">
            <div id="title-container">
              <h1 style={{marginTop: '-8rem', width: '90%'}}>You are ready?</h1>
            </div>
            <div id="button-group">
              <SimpleButton
                title="Cancel"
                color={{type: 'secondary'}}
                handleClick={() => setFinishedSettings(false)}
              />
              <SimpleButton
                title="Yes, Start!"
                color={{type: 'primary'}}
                handleClick={getAnswers}
              />
            </div>
          </div>
        ) : (
          <>
            <div id="title-container">
              <h1>Quiz Settings</h1>
              <Settings fontSize="large" id="setting-icon" />
            </div>
            <div id="form-container">
              <TextField
                style={{margin: '1rem', width: '100%'}}
                onChange={value =>
                  setNumberQuestions(Number(value.target.value))
                }
                error={errorNumberQuestions}
                required
                id={
                  errorNumberQuestions
                    ? 'outlined-error-helper-text'
                    : 'outlined-required'
                }
                label="Number of Questions"
                defaultValue={10}
                helperText={errorNumberQuestions ? 'Incorrect number' : ''}
              />
              <SimpleSelect
                value={difficultyValue}
                handleChange={handleDifficultyChange}
                label="Select Difficulty"
                items={selectDifficultyItemsData}
              />
            </div>
            <SimpleButton
              title="Done"
              color={{type: 'primary'}}
              handleClick={handleFinishSettings}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsQuiz;
