import React from 'react';
import Axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

import './styles/common.css';
import './styles/styles.css';

import Header from './pages/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import FindAccount from './pages/FindAccount';
import Logout from './pages/Logout';
import Main from './pages/Main';

import { isLogin, getToken } from './utils/Auth';

const Pages = () => {
  const [hasSession, setHasSession] = React.useState(false);

  React.useEffect(() => {
    if (isLogin()) {
      setHasSession(true);
      const token = getToken();
      Axios.defaults.headers.common['Authorization'] = token;
      window.sessionStorage.setItem('authorization', token);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className={'application'}>
        <Header />
        {hasSession ? (
          <Route exact path={'/'} component={Main} />
        ) : (
          <>
            <Route exact path={'/'} component={Login} />
            <Route exact path={'/account/login'} component={Login} />
            <Route exact path={'/account/register'} component={Register} />
            <Route exact path={'/account/find'} component={FindAccount} />
          </>
        )}
        <Route exact path={'/account/logout'} component={Logout} />
      </div>
    </BrowserRouter>
  );
};

export default Pages;
