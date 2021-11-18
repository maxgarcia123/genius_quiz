import React from 'react';
import './style.css';
import {styled} from '@mui/material/styles';
import RadioGroup, {useRadioGroup} from '@mui/material/RadioGroup';
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {QuestionComponentProps} from '../../utils/types';

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const Question: React.FC<QuestionComponentProps> = ({
  question,
  answers,
  name,
  index,
}) => {
  const StyledFormControlLabel = styled(
    (props: StyledFormControlLabelProps) => <FormControlLabel {...props} />,
  )(({theme, checked}) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }));

  const MyFormControlLabel = (props: FormControlLabelProps) => {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      // eslint-disable-next-line react/destructuring-assignment
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  };
  return (
    <div id={`${index}`} className="question-container">
      <p>{question}</p>
      <RadioGroup name={name}>
        {answers.map((value, indexAnswers) => {
          return (
            <MyFormControlLabel
              id={`${name}.${index}.${indexAnswers}`}
              value={value}
              label={value}
              control={<Radio />}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default Question;
