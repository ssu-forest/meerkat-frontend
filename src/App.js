import React from 'react';
import './styles/common.css';
import './styles/styles.css';

import Header from './pages/Header';
import Body from './pages/Body';

export default () => {
  return (
    <div className={'application'}>
      <Header />
      <Body value={'대호'} />
    </div>
  );
};
