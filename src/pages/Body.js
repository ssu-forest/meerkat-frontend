import React from 'react';
import Axios from 'axios';

import { message, Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

import Card from '../components/Card';
import Editor from '../components/Editor';

export default () => {
  const [cardList, setCardList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadContents = () => {
    Axios.get('/board/free').then(response => {
      const { data } = response;
      setIsLoading(false);
      setCardList(data);
    });
  };

  React.useEffect(() => {
    loadContents();
  }, []);

  return (
    <div className={'layout'}>
      <Button
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 10,
        }}
        type={isLoading ? 'primary' : 'default'}
        shape={'round'}
        size={'large'}
        icon={
          <RedoOutlined
            style={{ color: isLoading ? '#fff' : '#1890ff' }}
            spin={isLoading}
          />
        }
        onClick={() => {
          setIsLoading(true);
          setTimeout(() => {
            loadContents();
          }, 500);
        }}>
        {isLoading ? '피드를 새로고침 중입니다!' : ''}
      </Button>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          <Editor
            onUpload={() => {
              setTimeout(() => {
                loadContents();
              }, 500);
            }}
          />
          {cardList.map((v, i) => {
            return (
              <div key={i}>
                <Card
                  key={i}
                  boardId={v.id}
                  boardTitle={v.title}
                  boardWriter={v.userId}
                  boardContents={v.contents}
                  boardImages={v.images || []}
                  dateTime={v.writeDt}
                  like={v.likeCount}
                  isLike={v.mylike}
                  comment={v.comment}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
