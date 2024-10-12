import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Questionnaire from './Components/Questionnaire';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);

  };

  return (
    <div className="App">
      {isLoggedIn ? <Questionnaire onLogin={handleLogin} /> : <Login onLogin={handleLogin} />} 
    </div>
  );
}

export default App;