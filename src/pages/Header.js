import React from 'react';
import { Link } from 'react-router-dom';

import LogoImage from '../assets/images/logo.png';

export default () => {
  return (
    <header id={'header'}>
      <div className={'layout'}>
        <Link to={'/'}>
          <img className={'header-logo'} src={LogoImage} alt={'Logo'} />
        </Link>
      </div>
    </header>
  );
};
