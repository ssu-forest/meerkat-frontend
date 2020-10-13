import React from 'react';
import './styles/App.css';

import Card from './components/Card';

export default () => {
  return (
    <div className='App'>
      <header className='App-header'>
        <Card text={'test'} />
      </header>
    </div>
  );
};
