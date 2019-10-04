import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Switch } from "react-router";
import * as serviceWorker from './serviceWorker';
import EmployeesList from './components/EmployeesList';

ReactDOM.render(
    <Router path="/" component={EmployeesList}>
        <App />
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
