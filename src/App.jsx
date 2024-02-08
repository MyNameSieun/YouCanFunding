// App.js
import React, { useEffect } from 'react';
import Router from './shared/Router';
import { app } from './firebase';

function App() {
  useEffect(() => {
    console.log('app', app);
  }, []);
  return <Router />;
}

export default App;
