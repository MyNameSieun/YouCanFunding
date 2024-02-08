// App.js
import React, { useEffect } from 'react';
import { app } from './firebase';
import Router from 'shared/Router';
import GlobalStyle from 'styles/GlobalStyle';

function App() {
  useEffect(() => {
    console.log('app', app);
  }, []);
  return (
    <>
      <GlobalStyle />
      <Router />
    </>
  );
}

export default App;
