import React from 'react';
import { message, Spin } from 'antd';
import Axios from 'axios';
import useReactRouter from 'use-react-router';

export default props => {
  const { history } = useReactRouter();

  const procLogout = () => {
    Axios.post('/auth/logout')
      .then(() => {
        Axios.defaults.headers.common['Authorization'] = undefined;
        window.sessionStorage.removeItem('authorization');
        setTimeout(() => {
          history.push('/account/login');
          window.location.reload();
        }, 300);
      })
      .catch(error => {
        const { data } = error.response;
        message.warning(data.message);
      });
  };

  React.useEffect(() => {
    procLogout();
  }, []);

  return (
    <div className={'layout'}>
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '10%',
        }}>
        <Spin size={'large'} />
      </div>
    </div>
  );
};
