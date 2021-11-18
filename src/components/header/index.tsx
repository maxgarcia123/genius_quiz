import React from 'react';
import './style.css';

export type HeaderProps = {
  logo: string;
  subTitle?: string;
  size: 'logo-sm' | 'logo-medium' | 'logo-large';
  style?: React.CSSProperties;
};

const Header: React.FC<HeaderProps> = ({logo, subTitle, size, style = {}}) => {
  return (
    <header style={style}>
      <img id={size} alt="logo" src={logo} />
      {subTitle && <h2>{subTitle}</h2>}
    </header>
  );
};

export default Header;
