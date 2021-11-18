import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import Header from '../../components/header';
import Logo from '../../assets/images/home_logo.svg';
import SimpleButton from '../../components/simpleButton';
import {useQuizContext} from '../../contexts/quizContexts';

const Home = () => {
  const {answeredForm} = useQuizContext();

  return (
    <div
      id="background-img"
      style={{
        backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/home_background.jpg`})`,
      }}>
      <div id="image-cover">
        <Header
          logo={Logo}
          subTitle="test your intelligence end proved you are a genius"
          size="logo-large"
        />
        <div id="body">
          <Link to="/setting-quiz">
            <SimpleButton
              title="Let's Go!!"
              color={{type: 'primary'}}
              style={{marginTop: '3rem', width: '150px'}}
            />
          </Link>
          {answeredForm?.length && (
            <Link to="/report">
              <SimpleButton
                title="View your last quiz"
                color={{
                  gradient: {
                    primaryColor: '#140544',
                    primaryPercent: 0,
                    secondaryColor: '#5C03BC',
                    secondaryPercent: 40,
                    ternaryColor: '#E536AB',
                    ternaryPercent: 100,
                    deg: 45,
                  },
                }}
                style={{marginTop: '1.5rem', width: '220px'}}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
