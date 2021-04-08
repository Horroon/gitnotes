import React from 'react';
import {RouterComponent} from './routes/index';
import {store} from './models/index';
import {Provider} from 'react-redux'

import './App.css';

function App() {
  return (
  <Provider store={store}>
    <RouterComponent />
  </Provider>)
 
}

export default App;
