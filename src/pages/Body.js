import React from 'react';
import Axios from 'axios';

import Card from '../components/Card';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';
import Colors from '../constants/Colors';
export default props => {
  const [name, setName] = React.useState(props.value); // hook
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    Axios.get('https://ian-api.herokuapp.com/test/api').then(reseponse => {
      const {
        data: { data },
      } = reseponse;

      console.log(data);

      setCardList(data);
    });
  }, []);

  return (
    <div className={'layout'}>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          {cardList.map((v, i) => {
            return (
              <div
                style={{
                  margin: 20,
                }}>
                <Card
                  key={i}
                  boardTitle={v.title}
                  boardContents={v.contents}
                  boardWriter={v.writer}
                  dateTime={v.datetime}
                  like={v.like}
                  comments={v.comments}
                />
                <Input
                  style={{
                    height: 35,
                    marginBottom: 10,
                  }}
                  prefix={<UserOutlined />}
                  placeholder={'댓글입력'}
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
                    입력
                  </span>
                </Button>
              </div>
            );
          })}
        </div>
        <div className={'layout-side'}>
          <span>B</span>
        </div>
      </div>
    </div>
  );
};
