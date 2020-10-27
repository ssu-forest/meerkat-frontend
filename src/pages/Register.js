import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import {
  UserOutlined,
  SafetyCertificateOutlined,
  LockOutlined,
} from '@ant-design/icons';
import Axios from 'axios';
import useReactRouter from 'use-react-router';

import { Define, Colors } from '../constants';

import LogoImage from '../assets/images/logo.png';

const EmailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export default () => {
  // const {} = useReactRouter;
  const { history } = useReactRouter();

  const [email, setEmail] = React.useState('');
  const [tryVerify, setTryVerify] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState('');
  const [hasEmailVerify, setHasEmailVerify] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [rePassword, setRePassword] = React.useState('false');

  const procEmailVerify = () => {};

  const procRegister = () => {};

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
            disabled={tryVerify}
            onChange={({ target }) => setEmail(target.value)}
          />
          {!tryVerify ? (
            <Button
              block
              style={{
                height: 40,
                backgroundColor: Colors.mainColor,
                marginBottom: 10,
                color: '#fff',
              }}
              onClick={() => {
                if (!EmailRegex.test(email)) {
                  message.warning('올바른 이메일 형식이 아니에요!', 2);
                  return;
                }

                Axios.post('/join/user/find-id', {
                  email,
                }).then(({ status, data }) => {
                  console.log({ status, data });

                  if (status === 200) {
                    setTryVerify(true);
                    message.success(`${email}의 메일함을 확인해주세요.`);
                  } else {
                    message.error(data.message);
                    return;
                  }
                });
              }}>
              <span
                style={{
                  color: Colors.white,
                }}>
                이메일 인증
              </span>
            </Button>
          ) : (
            <div />
          )}

          {tryVerify && !hasEmailVerify && (
            <div>
              <Input
                style={{
                  height: 35,
                  marginBottom: 25,
                }}
                prefix={<SafetyCertificateOutlined />}
                placeholder={'이메일 인증코드'}
                disabled={hasEmailVerify}
                onChange={({ target }) => setVerifyCode(target.value)}
              />
              <Button
                block
                style={{
                  height: 40,
                  backgroundColor: Colors.mainColor,
                  marginBottom: 10,
                  color: '#fff',
                }}
                onClick={() => {
                  if (verifyCode.trim() === '') {
                    message.warning(
                      '이메일에 적힌 인증번호를 입력해주세요.!',
                      2,
                    );
                    return;
                  }

                  setHasEmailVerify(true);
                  message.success('이메일 인증이 완료되었습니다.');

                  // Axios.post('/join/user/find-id', {
                  //   email,
                  // }).then(({ status, data }) => {
                  //   console.log({ status, data });

                  //   if (status === 200) {
                  //     setTryVerify(true);
                  //     message.success('이메일 인증이 완료되었습니다.');
                  //   } else {
                  //     message.error(data.message);
                  //     return;
                  //   }
                  // });
                }}>
                <span
                  style={{
                    color: Colors.white,
                  }}>
                  이메일 인증
                </span>
              </Button>
            </div>
          )}
          {hasEmailVerify && (
            <div>
              <Input
                type={'password'}
                style={{
                  height: 35,
                  marginBottom: 10,
                }}
                prefix={<LockOutlined />}
                placeholder={'패스워드'}
                onChange={({ target }) => setPassword(target.value)}
              />
              <Input
                type={'password'}
                style={{
                  height: 35,
                  marginBottom: 10,
                }}
                prefix={<LockOutlined />}
                placeholder={'패스워드 재입력'}
                onChange={({ target }) => setRePassword(target.value)}
              />
              <Button
                block
                style={{
                  height: 40,
                  backgroundColor: Colors.mainColor,
                  marginBottom: 10,
                  color: '#fff',
                }}
                onClick={() => {
                  if (password.trim() === '') {
                    message.warn('패스워드를 입력해주세요.');
                    return;
                  } else if (password.length < 8) {
                    message.warn('패스워드가 너무 짧습니다.');
                    return;
                  } else if (password !== rePassword) {
                    message.warn('입력하신 패스워드가 일치하지 않습니다.');
                    return;
                  }

                  Axios.post('/join/user', {
                    email,
                    password,
                    serviceYn: Define.isService ? 'y' : 'n',
                    emailYn: 'y',
                  }).then(({ status, data }) => {
                    if (data.id) {
                      message.success('회원가입이 완료되었어요!');
                      history.push('/user/login');
                      return;
                    } else {
                      message.error(data.message);
                      return;
                    }
                  });
                }}>
                <span
                  style={{
                    color: Colors.white,
                  }}>
                  회원가입
                </span>
              </Button>
            </div>
          )}
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
