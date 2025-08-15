import React from 'react';
import './style.css';
import {Link} from 'react-router-dom';
import Header from '../../components/header';
import Logo from '../../assets/images/logo.png';
import SimpleButton from '../../components/simpleButton';
import {useQuizContext} from '../../contexts/quizContexts';

const Home = () => {
  const {answeredForm} = useQuizContext();

  return (
    <div className="content gradient-wave-background">
      <div id="image-cover">
        <Header
          logo={Logo}
          subTitle="test your intelligence end proved you are a genius"
          size="logo-large"
        />
        <div id="home-button-container" className="container-row">
          <Link to="/setting-quiz">
            <SimpleButton
              id="button-gradient-wave-background"
              title="Let's Go!!"
              color={{
                gradient: {
                  primaryColor: '#0AB3AB',
                  primaryPercent: 0,
                  secondaryColor: '#0ECE22',
                  secondaryPercent: 40,
                  ternaryColor: '#15621D',
                  ternaryPercent: 100,
                  deg: 45,
                },
              }}
              style={{width: '150px'}}
            />
          </Link>
          {answeredForm?.length && (
            <Link to="/report">
              <SimpleButton
                title="View your last quiz"
                id="button-gradient-wave-background"
                color={{
                  gradient: {
                    primaryColor: '#E536AB',
                    primaryPercent: 0,
                    secondaryColor: '#5C03BC',
                    secondaryPercent: 40,
                    ternaryColor: '#140544',
                    ternaryPercent: 100,
                    deg: 45,
                  },
                }}
                style={{width: '220px'}}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
