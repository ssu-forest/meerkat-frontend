import React from 'react';
import { Avatar, Input, Button } from 'antd';
import {
  HeartTwoTone,
  RightCircleFilled,
  RightCircleTwoTone,
  RightOutlined,
} from '@ant-design/icons';
import Heart from 'react-animated-heart';
import Moment from 'moment';

import { Define, Colors } from '../constants';

export default ({
  boardContents = '',
  boardId = '',
  boardWriter = '',
  dateTime = '',
  boardTitle = '',
  like = 0,
  comment = [],
}) => {
  const [heartAnimation, activeHeartAnimation] = React.useState(false);
  const [animationFlag, setAnimationFlag] = React.useState(false);
  const [isAlreadyLike, setIsAlreadyLike] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(like);
  const [inputComment, setInputComment] = React.useState('');
  const [commentList, setCommentList] = React.useState(comment);

  const writerName = `익명${boardWriter}`;

  // 데모용 코드
  const addCommentList = () => {
    setCommentList([
      ...commentList,
      {
        userId: 0,
        contents: inputComment,
      },
    ]);
    setInputComment('');
  };

  React.useEffect(() => {
    if (heartAnimation) {
      setTimeout(() => {
        setAnimationFlag(true);
      }, 0);

      setTimeout(() => {
        setAnimationFlag(false);
        activeHeartAnimation(false);
      }, 1000);
    }
  }, [heartAnimation]);

  return (
    <div
      className={'ui-card'}
      style={{
        marginTop: 15,
      }}>
      <div
        style={{
          padding: 15,
          borderBottom: '1px solid #eee',
        }}>
        <div>
          <div
            style={{
              marginRight: 10,
              verticalAlign: 'middle',
              display: 'inline-block',
            }}>
            <Avatar>{writerName[0]}</Avatar>
          </div>
          <div
            style={{
              verticalAlign: 'middle',
              display: 'inline-block',
            }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                display: 'block',
              }}>
              {writerName}
            </span>
            <span
              style={{
                color: '#aaa',
              }}>
              {Moment(dateTime, Define.dateFormat).startOf('hour').fromNow()}
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          paddingTop: '100%',
          backgroundImage: `url(https://picsum.photos/700/700?${boardId})`,
          backgroundSize: 'cover',
        }}
        onDoubleClick={() => {
          activeHeartAnimation(true);
          if (!isAlreadyLike) {
            setIsAlreadyLike(true);
            setLikeCount(likeCount + 1);
          }
        }}>
        {heartAnimation && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, .3)',
              borderRadius: '50%',
              transition: 'all .3s',
              zoom: 1.2,
            }}>
            <Heart isClick={animationFlag} />
          </div>
        )}
      </div>
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
              //TODO 좋아요 업데이트 기능 구현 필요
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
        {commentList.map((comment, i) => {
          if (!comment.contents) {
            return <div key={i} />;
          }

          return (
            <div key={i}>
              <span>
                <b
                  style={{
                    marginRight: 5,
                  }}>
                  익명{comment.userId}
                </b>
                {comment.contents}
                <Button
                  type='dashed'
                  shape={'circle'}
                  style={{
                    marginLeft: 15,
                    height: 30,
                  }}>
                  X
                </Button>
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
                      <span>X</span>
                    </p>
                  );
                })}
            </div>
          );
        })}
        <div
          style={{
            marginTop: 10,
            marginBottom: 5,
            display: 'flex',
          }}>
          <Input
            style={{
              flex: 1,
              height: 36,
              marginRight: 5,
              float: 'left',
              backgroundColor: Colors.placeholder,
              borderRadius: 16,
            }}
            bordered={false}
            value={inputComment}
            placeholder={'등록하실 댓글을 입력해주세요.'}
            onChange={({ target }) => {
              setInputComment(target.value);
            }}
            onKeyPress={({ which }) => {
              if (which === 13 && inputComment.trim() !== '') {
                addCommentList();
              }
            }}
          />
          <Button
            type='primary'
            shape={'round'}
            style={{
              height: 36,
            }}
            onClick={() => {
              //TODO 댓글 등록 기능 구현 필요
              if (inputComment.trim() !== '') {
                addCommentList();
              }
            }}>
            <span>작성</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
