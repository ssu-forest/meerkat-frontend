import { RedEnvelopeFilled } from '@ant-design/icons';
import React from 'react';

//import Comment from '../components/Comment';

export default ({
  boardContents = '',
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
      <p>날짜 : {dateTime}</p>
      <p>게시글내용 : {boardContents}</p>
      <p>Like : {like}</p>
      {comments.map((comment, i) => {
        return (
          <p
            key={i}
            style={{
              backgroundColor: 'red',
              margin: 20,
            }}>
            <span>
              - <b>{comment.writer}</b>
            </span>
            <span> : {comment.comment}</span>
            <span> / {comment.datetime}</span>
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
