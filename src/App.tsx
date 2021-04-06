import React from 'react';
import MainScreen from './pages/main';
import {store} from './models/index';
import {Provider} from 'react-redux'
import './App.css';

function App() {
  return (
  <Provider store={store}>
    <MainScreen />
  </Provider>)
 
}

export default App;
