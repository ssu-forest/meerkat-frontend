import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/common.css';
import './styles/styles.css';

import Header from './pages/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import FindAccount from './pages/FindAccount';
import Main from './pages/Main';

const Pages = () => {
  return (
    <BrowserRouter>
      <div className={'application'}>
        <Header />
        <Route exact path={'/'} component={Main} />
        <Route exact path={'/account/login'} component={Login} />
        <Route exact path={'/account/register'} component={Register} />
        <Route exact path={'/account/find'} component={FindAccount} />
      </div>
    </BrowserRouter>
  );
};

export default Pages;
