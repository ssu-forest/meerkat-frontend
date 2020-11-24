import React from 'react';
import Axios from 'axios';

import Card from '../components/Card';
import Editor from '../components/Editor';

export default () => {
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
