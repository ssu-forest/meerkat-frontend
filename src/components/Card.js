import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Input, Button, message, Menu } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Heart from 'react-animated-heart';
import Moment from 'moment';

import useReactRouter from 'use-react-router';
import { Define, Colors } from '../constants';
import Axios from 'axios';

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
  const [tryBoardUpdate, setTryBoardUpdate] = React.useState(false);
  const [tryCommentUpdate, setTryCommentUpdate] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(like);
  const [inputComment, setInputComment] = React.useState('');
  const [commentList, setCommentList] = React.useState(comment);
  const { history } = useReactRouter();
  const writerName = `익명${boardWriter}`;

  // 댓글 추가
  const addCommentList = (boardId, comment) => {
    Axios.post('/comment/write', {
      boardId,
      comment,
    })
      .then(({ data }) => {
        setTimeout(() => {
          history.push('/');
          window.location.reload();
        }, 300);
      })
      .catch(error => {
        const { data } = error.response;
        message.warning(data.message);
      });
  };
  //댓글 삭제
  const delCommentList = commentId => {
    Axios.post('/comment/delete', {
      commentId,
    })
      .then(({ data }) => {
        console.log(data);
        setTimeout(() => {
          history.push('/');
          window.location.reload();
        }, 300);
      })
      .catch(error => {
        const { data } = error.response;
        message.warning(data.message);
      });
  };
  //댓글 수정
  const commentMenu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            //TODO  댓글 에디터블
            setTryCommentUpdate(true);

            /*Axios.post('/comment/modify', {
              title: '', //질문 1. 여기에 파라메터 어떻게 넘기는가
              content: `${boardContents}`,
              category: 'free',
            })
              .then(({ data }) => {
                //onUpload();
                console.log(data);
                setTimeout(() => {
                  history.push('/');
                  window.location.reload();
                }, 300);
              })
              .catch(error => {
                const { data } = error.response;
                message.warning(data.message);
              });*/
          }}>
          수정
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            //TODO 권한 체크
            Axios.post(`/comment/delete/${comment.commentId}`)
              .then(({ data }) => {
                setTimeout(() => {
                  window.location.reload();
                }, 300);
              })
              .catch(error => {
                const { data } = error.response;
                console.log(data);
                message.warning(data.message);
              });
          }}>
          삭제
        </Button>
      </Menu.Item>
    </Menu>
  );
  const buttonMenu = (
    <Menu>
      <Menu.Item>
        <Button
          onClick={() => {
            //TODO edit mode 로 전환
            setTryCommentUpdate(true);
            /*
            Axios.post('/board/modify', {
              title: '', //질문 1. 여기에 파라메터 어떻게 넘기는가
              content: `${boardContents}`,
              category: 'free',
            })
              .then(({ data }) => {
                //onUpload();
                console.log(data);
                setTimeout(() => {
                  history.push('/');
                  window.location.reload();
                }, 300);
              })
              .catch(error => {
                const { data } = error.response;
                message.warning(data.message);
              });*/
          }}>
          수정
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button
          onClick={() => {
            //TODO 권한 체크
            Axios.post(`/board/delete/${boardId}`)
              .then(({ data }) => {
                setTimeout(() => {
                  window.location.reload();
                }, 300);
              })
              .catch(error => {
                const { data } = error.response;
                console.log(data);
                message.warning(data.message);
              });
          }}>
          삭제
        </Button>
      </Menu.Item>
    </Menu>
  );
  //카드삭제 - 원래 이렇게 했던것
  const delCard = async (board_id = '') => {
    //TODO 권한 체크
    Axios.post('/board/delete', { board_id })
      .then(({ data }) => {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(error => {
        const { data } = error.response;
        message.warning(data.message);
      });
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
            <Dropdown
              overlay={buttonMenu}
              size={40}
              placement='bottomRight'
              arrow>
              <Button
                shape={'circle'}
                style={{
                  marginLeft: 115,
                }}
                onClick={() => {}}>
                ...
              </Button>
            </Dropdown>
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
        {boardContents.split('\n').map((text, i) => {
          return (
            <p
              key={i}
              style={{
                fontSize: 15,
                marginBottom: 5,
              }}>
              {text}
            </p>
          );
        })}
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
                <Dropdown
                  overlay={commentMenu}
                  size={40}
                  placement='bottomRight'
                  arrow>
                  <Button
                    shape={'circle'}
                    style={{
                      marginLeft: 15,
                    }}
                    onClick={() => {
                      //댓글 삭제 버튼
                      delCommentList(comment.commentId);
                    }}>
                    X
                  </Button>
                </Dropdown>
              </span>
              {/*comment.reply &&
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
                })*/}
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
            //엔터 치면 댓글 등록
            onKeyPress={({ which }) => {
              if (which === 13 && inputComment.trim() !== '') {
                addCommentList(boardId, inputComment);
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
              //댓글 등록 버튼
              if (inputComment.trim() !== '') {
                addCommentList(boardId, inputComment);
              }
            }}>
            <span>작성</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
