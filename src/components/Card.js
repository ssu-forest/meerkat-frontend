import React from 'react';
import { Input, Button } from 'antd';
import { ConsoleSqlOutlined, RedEnvelopeFilled } from '@ant-design/icons';
import Heart from 'react-animated-heart';

import Colors from '../constants/Colors';

export default ({
  boardContents = '',
  boardId = '',
  boardWriter = '',
  dateTime = '',
  boardTitle = '',
  like = 0,
  comments = [],
}) => {
  // 이미 하트를 누른 상태를 나타내는 변수
  const [isAlreadyLike, setIsAlreadyLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(like);
  const [inputComment, setInputComment] = React.useState('');

  return (
    <div
      className={'ui-card'}
      style={{
        marginTop: 15,
      }}>
      <p>작성자 : {boardWriter}</p>
      <p>날짜 : {dateTime}</p>
      <p>게시글내용 : {boardContents}</p>
      <div className='App'>
        <Heart
          isClick={isAlreadyLike}
          onClick={() => {
            if (!isAlreadyLike) {
              setLikeCount(likeCount + 1);
            } else {
              setLikeCount(likeCount - 1);
            }
            setIsAlreadyLike(!isAlreadyLike);
          }}
        />
        <span>{likeCount}</span>
      </div>
      {comments.userId &&
        comments.map((comment, i) => {
          return (
            <p
              key={i}
              style={{
                margin: 20,
              }}>
              <span>
                - <b>{comment.userId}</b>
              </span>
              <span> : {comment.contents}</span>
              {comment.reply &&
                comment.reply.map((reComment, i) => {
                  return (
                    <p key={i}>
                      <span>
                        <b> --- {reComment.writer}</b>
                      </span>
                      <span> : {reComment.comment}</span>
                      <span>{reComment.datetime}</span>
                    </p>
                  );
                })}
            </p>
          );
        })}
      <Input
        style={{
          height: 35,
          marginBottom: 10,
        }}
        placeholder={'댓글을 입력해주세요.'}
        onChange={({ target }) => {
          setInputComment(target.value);
        }}
        onKeyPress={({ which }) => {
          if (which === 13) {
            alert(inputComment);
          }
        }}
      />
    </div>
  );
};
