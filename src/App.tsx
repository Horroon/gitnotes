import React from 'react';
import {RouterComponent} from './routes/index';
import {store} from './models/index';
import {Provider} from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import './App.css';

function App() {
  return (
  <Provider store={store}>
    <ToastProvider>
      <RouterComponent />
    </ToastProvider>
  </Provider>)
 
}

export default App;
