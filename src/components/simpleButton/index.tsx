/* eslint-disable react/require-default-props */
import React from 'react';
import Button from '@mui/material/Button';
import {styled} from '@mui/styles';

export type colorProps = {
  gradient?: {
    primaryColor: string;
    primaryPercent: number;
    secondaryColor: string;
    secondaryPercent: number;
    ternaryColor?: string;
    ternaryPercent?: number;
    deg: number;
  };
  type?: 'primary' | 'secondary';
  color?: string;
};

export type ButtonProps = {
  handleClick?: () => void;
  title: string;
  color?: colorProps;
  style?: React.CSSProperties;
};

const SimpleButton: React.FC<ButtonProps> = ({
  title,
  color,
  style,
  handleClick,
}) => {
  const handleBackgroundColor = () => {
    const gradient = color?.gradient;
    if (gradient || color?.type) {
      if (gradient?.ternaryColor)
        return `linear-gradient(${gradient.deg}deg, ${gradient.primaryColor} ${gradient.primaryPercent}%, ${gradient.secondaryColor} ${gradient.secondaryPercent}%, ${gradient?.ternaryColor} ${gradient?.ternaryPercent}%)`;
      if (gradient)
        return `linear-gradient(${gradient.deg}deg, ${gradient.primaryColor} ${gradient.primaryPercent}%, ${gradient.secondaryColor} ${gradient.secondaryPercent}%)`;
      if (color?.type === 'primary')
        return 'linear-gradient(45deg, #2A8314 10%, #B3D615 92%)';
      if (color?.type === 'secondary')
        return 'linear-gradient(45deg, #9B0C0C 20%, #FB2415 61%, #D97A16 100%)';
    }

    if (color) return color;

    return 'green';
  };

  const StyledButton = styled(Button)({
    background: `${handleBackgroundColor()}`,
    border: 0,
    borderRadius: 25,
    color: 'white',
    height: 48,
    padding: '0 30px',
    minWidth: '125px',
  });

  return (
    <>
      <StyledButton onClick={handleClick} style={style} variant="contained">
        {title}
      </StyledButton>
    </>
  );
};

export default SimpleButton;
