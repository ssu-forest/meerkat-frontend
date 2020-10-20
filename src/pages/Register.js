import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import {
  UserOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
} from '@ant-design/icons';

import LogoImage from '../assets/images/logo.png';

import Colors from '../constants/Colors';

export default props => {
  const [name, setName] = React.useState(props.value); // hook

  return (
    <div className={'layout'}>
      <div
        style={{
          width: '100%',
          maxWidth: 300,
          margin: '50px auto',
          textAlign: 'center',
        }}>
        <img
          style={{
            maxWidth: 200,
          }}
          src={LogoImage}
          alt={'logo'}
        />
        <div
          style={{
            padding: '20px 0',
          }}>
          <Input
            style={{
              height: 35,
              marginBottom: 10,
            }}
            prefix={<UserOutlined />}
            placeholder={'이메일'}
          />
          <Input
            style={{
              height: 35,
              marginBottom: 25,
            }}
            prefix={<SafetyCertificateOutlined />}
            placeholder={'이메일 인증코드'}
          />
          <Input
            type={'password'}
            style={{
              height: 35,
              marginBottom: 10,
            }}
            prefix={<LockOutlined />}
            placeholder={'패스워드'}
          />
          <Input
            type={'password'}
            style={{
              height: 35,
              marginBottom: 10,
            }}
            prefix={<LockOutlined />}
            placeholder={'패스워드 재입력'}
          />
          <Button
            block
            style={{
              height: 40,
              backgroundColor: Colors.mainColor,
              marginBottom: 10,
              color: '#fff',
            }}>
            <span
              style={{
                color: Colors.white,
              }}>
              회원가입
            </span>
          </Button>
        </div>
        <div
          style={{
            paddingTop: 20,
            borderTop: '1px solid #eee',
          }}>
          <div>
            <Link
              style={{
                color: Colors.mainColor,
              }}
              to={'/account/login'}>
              이미 계정이 있으신가요?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
