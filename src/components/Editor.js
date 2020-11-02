import React from 'react';
import { Input, Button } from 'antd';
import TextareaAutoSize from 'react-textarea-autosize';
import Axios from 'axios';

import Colors from '../constants/Colors';

const randomCommentTemplate = [
  '오늘의 기분은 어떠세요?',
  '오늘은 어떤 재밌는 일이 있으셨나요?',
  '지금 무슨 생각을 하고 계신가요?',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default props => {
  const [randomComment, setRandomComment] = React.useState('');
  const [content, setContent] = React.useState('');

  React.useEffect(() => {
    const templateIndex = getRandomInt(0, randomCommentTemplate.length - 1);
    setRandomComment(randomCommentTemplate[templateIndex]);
  }, []);

  return (
    <div className={'ui-card'}>
      <div
        style={{
          padding: '15px 20px',
        }}>
        <TextareaAutoSize
          style={{
            width: '100%',
            padding: 10,
            fontSize: 16,
            border: 'none',
            resize: 'none',
            backgroundColor: '#fafafa',
          }}
          placeholder={randomComment}
        />
        <Button
          style={{
            marginTop: 5,
          }}
          block
          onClick={() => {
            Axios.post('/board/write', {
              title: '',
              content,
              category: 'free',
            }).then(response => {
              console.log(response);
            });
          }}>
          <span>게시</span>
        </Button>
      </div>
    </div>
  );
};
