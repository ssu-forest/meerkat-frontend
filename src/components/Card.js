import React from 'react';
import { Input, Button } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
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
  const [isAlreadyLike, setIsAlreadyLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(like);
  const [inputComment, setInputComment] = React.useState('');

  return (
    <div
      className={'ui-card'}
      style={{
        marginTop: 15,
      }}>
      <div
        style={{
          padding: 10,
          borderBottom: '1px solid #eee',
        }}>
        <span
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            display: 'block',
          }}>
          익명{boardWriter}
        </span>
        <span>{dateTime}</span>
      </div>
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          backgroundImage: `url(https://picsum.photos/700/700)`,
          backgroundSize: 'cover',
        }}
      />
      <div
        style={{
          padding: 10,
          borderBottom: '1px solid #eee',
        }}>
        <p
          style={{
            fontSize: 15,
          }}>
          {boardContents}
        </p>
        <div>
          <HeartTwoTone
            style={{
              fontSize: 16,
              marginRight: 3,
            }}
            twoToneColor={isAlreadyLike ? '#eb2f96' : '#aaa'}
            onClick={() => {
              if (!isAlreadyLike) {
                setLikeCount(likeCount + 1);
              } else {
                setLikeCount(likeCount - 1);
              }
              setIsAlreadyLike(!isAlreadyLike);
            }}
          />
          <span
            style={{
              fontSize: 16,
            }}>
            {likeCount}
          </span>
        </div>
      </div>
      {/* <div className='App'>
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
      </div> */}
      <div
        style={{
          padding: 10,
        }}>
        {comments.map((comment, i) => {
          return (
            <div key={i}>
              <span>
                <b>익명{comment.userId}</b> {comment.contents}
              </span>
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
            </div>
          );
        })}
        <div
          style={{
            marginTop: 10,
            display: 'flex',
          }}>
          <Input
            style={{
              flex: 1,
              height: 35,
              marginRight: 5,
              float: 'left',
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
          <Button
            type='primary'
            style={{
              height: 35,
            }}
            onClick={() => {
              alert(inputComment);
            }}>
            <span>작성</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
