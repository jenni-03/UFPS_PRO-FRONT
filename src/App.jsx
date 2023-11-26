import React from 'react';
import './App.css';
import {AppProvider} from './components/context/AppProvider';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <AppProvider>
      <AppRouter/>
    </AppProvider>
  );
}

export default App;
