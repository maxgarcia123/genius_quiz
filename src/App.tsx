import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import SettingsQuiz from './pages/settingsQuiz';
import {QuizContextProvider} from './contexts/quizContexts';
import Quiz from './pages/quiz';
import Report from './pages/report';

const App = () => {
  return (
    <>
      <QuizContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting-quiz" element={<SettingsQuiz />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </QuizContextProvider>
    </>
  );
};

export default App;
