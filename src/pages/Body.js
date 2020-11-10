import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

import Card from '../components/Card';
import Editor from '../components/Editor';

import { Define } from '../constants';

export default props => {
  const [cardList, setCardList] = React.useState([]);

  const loadContents = () => {
    Axios.get('/board/free').then(response => {
      const { data } = response;
      setCardList(data);
    });
  };

  React.useEffect(() => {
    loadContents();
  }, []);

  return (
    <div className={'layout'}>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          <Editor
            onUpload={() => {
              loadContents();
            }}
          />
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
