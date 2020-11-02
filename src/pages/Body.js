import React from 'react';
import Axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

import Card from '../components/Card';
import Editor from '../components/Editor';
import Colors from '../constants/Colors';

export default props => {
  const [name, setName] = React.useState(props.value); // hook
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    //Axios.get('https://ian-api.herokuapp.com/test/api').then(response => {
    Axios.get('http://211.197.33.90:3000/board/free').then(response => {
      const { data } = response;

      console.log(data);

      setCardList(data);
    });
  }, []);

  return (
    <div className={'layout'}>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          <div className={'ui-card'}>
            <Editor />
          </div>
          {cardList.map((v, i) => {
            return (
              <div key={i}>
                <Card
                  key={i}
                  boardId={v.id}
                  boardTitle={v.title}
                  boardContents={v.contents}
                  boardWriter={v.userId}
                  dateTime={v.writeDt}
                  like={v.likeCount}
                  comments={v.comment}
                />
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
