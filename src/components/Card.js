import { RedEnvelopeFilled } from '@ant-design/icons';
import React from 'react';
import { Input, Button } from 'antd';
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
  return (
    <div
      style={{
        width: '100%',
        border: '1px solid #eee',
        borderRadius: 10,
        backgroundColor: '#fff',
      }}>
      <p>제목 : {boardTitle}</p>
      <p>작성자 : {boardWriter}</p>
      {<p>날짜 : {dateTime}</p>}
      <p>게시글내용 : {boardContents}</p>

      <Button
        onClick={() => {
          console.log('button clicked');
          /*
          update like increase api

          */
        }}
        block
        style={{
          height: 30,
          width: 50,
          backgroundColor: 'red',
          marginBottom: 10,
          padding: 0,
          color: '#fff',
        }}>
        <span
          style={{
            color: Colors.white,
          }}>
          🤍 {like}
        </span>
      </Button>
      {comments.map((comment, i) => {
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
    </div>
  );
};
