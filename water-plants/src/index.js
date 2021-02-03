import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Provider  from './context/globalContext'
import './index.css';
import App from './App';

ReactDOM.render(
  <Router>
    <Provider>
       <App />
    </Provider>
   
  </Router>,
  document.getElementById('root')
);
