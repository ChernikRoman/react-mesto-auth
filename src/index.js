import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Header from './components/Header';
import Footer from './components/Footer';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Login';
import InfoTooltip from './components/InfoTooltip';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <App />
      <Route path="/test">
        <InfoTooltip isOpen={true} status={false}/>
      </Route>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
