import React from 'react';
import Axios from 'axios';
import Moment from 'moment';

import Card from '../components/Card';
import Editor from '../components/Editor';

import { Define } from '../constants';

export default props => {
  const [cardList, setCardList] = React.useState([]);

  React.useEffect(() => {
    //Axios.get('https://ian-api.herokuapp.com/test/api').then(response => {
    Axios.get('http://211.197.33.90:3000/board/free').then(response => {
      const { data } = response;

      console.log(data);

      setCardList(data.reverse());
    });
  }, []);

  return (
    <div className={'layout'}>
      <div className={'layout-inner'}>
        <div className={'layout-main'}>
          <div className={'ui-card'}>
            <Editor
              onUpload={contents => {
                const temp = [...cardList];
                temp.unshift({
                  comment: [{}],
                  contents,
                  id: null,
                  likeCount: 0,
                  modifyDt: Moment().format(Define.dateFormat),
                  title: '',
                  userId: 0,
                  viewCount: 0,
                  writeDt: Moment().format(Define.dateFormat),
                });
                setCardList(temp);
              }}
            />
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
      </div>
    </div>
  );
};
