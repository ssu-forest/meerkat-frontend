import React from 'react';

import LogoImage from '../assets/images/logo.png';

export default () => {
  return (
    <header id={'header'}>
      <div className={'layout'}>
        <img className={'header-logo'} src={LogoImage} alt={'Logo'} />
      </div>
    </header>
  );
};
