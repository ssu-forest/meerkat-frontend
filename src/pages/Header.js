import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';

import LogoImage from '../assets/images/logo.png';

import { isLogin } from '../utils/Auth';

const menu = (
  <Menu>
    {/* <Menu.Item>
      <Link to={'/mypage/view'}>마이페이지</Link>
    </Menu.Item> */}
    <Menu.Item>
      <Link to={'/account/logout'}>로그아웃</Link>
    </Menu.Item>
  </Menu>
);

export default () => {
  return (
    <header id={'header'}>
      <div className={'layout'}>
        <Link to={'/'}>
          <img className={'header-logo'} src={LogoImage} alt={'Logo'} />
        </Link>
        {isLogin() && (
          <div className={'right-nav'}>
            <Dropdown overlay={menu} size={40} placement='bottomRight' arrow>
              <Avatar
                style={{
                  marginTop: 5,
                }}
                size={40}>
                익
              </Avatar>
            </Dropdown>
          </div>
        )}
      </div>
    </header>
  );
};
