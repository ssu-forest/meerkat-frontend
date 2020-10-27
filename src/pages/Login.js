import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Axios from 'axios';

import LogoImage from '../assets/images/logo.png';

import Colors from '../constants/Colors';

const procLogin = async (id, pw) => {
  if (id.trim() === '' || pw.trim() === '') {
    return;
  }

  // Axios.post()
};

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
            type={'password'}
            style={{
              height: 35,
              marginBottom: 10,
            }}
            prefix={<LockOutlined />}
            placeholder={'패스워드'}
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
              로그인
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
              to={'/account/find'}>
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div
            style={{
              marginTop: 5,
            }}>
            <Link
              style={{
                color: Colors.mainColor,
              }}
              to={'/account/register'}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
