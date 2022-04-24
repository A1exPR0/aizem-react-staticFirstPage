import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

window.onload=()=>{console.log("window loaded")};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

