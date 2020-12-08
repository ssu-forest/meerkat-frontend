import React from 'react';
import Axios from 'axios';
import { Avatar, Dropdown, Input, Button, message, Menu } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Heart from 'react-animated-heart';
import Moment from 'moment';
import 'moment-timezone';
import { useWindowSize } from 'react-use';
import { useSwipeable } from 'react-swipeable';
import useReactRouter from 'use-react-router';
import TextareaAutoSize from 'react-textarea-autosize';

import { Define, Colors } from '../constants';
import { getToken, getUserId } from '../utils/Auth';

import CommentMenuImage from '../assets/images/commentMenu.png';
import MenuImage from '../assets/images/menu.png';

export default ({
  boardId = '',
  boardTitle = '',
  boardWriter = '',
  boardContents: defaultBoardContent = '',
  boardImages = [],
  dateTime = '',
  like = 0,
  isLike = false,
  comment = [],
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const contentSize = (windowWidth > 600 ? 600 : windowWidth) - 22;

  const [heartAnimation, activeHeartAnimation] = React.useState(false);
  const [animationFlag, setAnimationFlag] = React.useState(false);
  const [isAlreadyLike, setIsAlreadyLike] = React.useState(isLike);
  const [likeCount, setLikeCount] = React.useState(like);
  const [isBoardEditMode, setBoardEditMode] = React.useState(false);
  const [boardContent, setBoardContent] = React.useState(defaultBoardContent);
  const [inputComment, setInputComment] = React.useState('');
  const [commentList, setCommentList] = React.useState(comment);
  const [imageIndex, setImageIndex] = React.useState(0);

  const { history } = useReactRouter();

  const writerName = `익명${boardWriter}`;

  const imageSwipeHandler = useSwipeable({
    onSwipedLeft: () => {
      const moveIndex = imageIndex + 1;
      if (moveIndex <= boardImages.length - 1) {
        setImageIndex(moveIndex);
      }
    },
    onSwipedRight: () => {
      const moveIndex = imageIndex - 1;
      if (moveIndex >= 0) {
        setImageIndex(moveIndex);
      }
    },
  });

  // 댓글 등록
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

  const procLike = boardIdx => {
    Axios.post(`/board/like/${boardIdx}`)
      .then(response => {
        console.log(response);
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
              {Moment.tz(dateTime, 'Seoul/Asia').fromNow()}
            </span>
          </div>
          {boardWriter === getUserId() && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item>
                      <Button
                        onClick={() => {
                          setBoardEditMode(true);
                        }}>
                        게시글 수정
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
                              message.warning(data.message);
                            });
                        }}>
                        게시글 삭제
                      </Button>
                    </Menu.Item>
                  </Menu>
                )}
                size={40}
                placement='bottomRight'
                arrow>
                <Button
                  shape={'circle'}
                  style={{
                    marginLeft: 150,
                  }}
                  onClick={() => {}}>
                  <img
                    style={{
                      maxWidth: 15,
                      maxHeight: 15,
                    }}
                    src={MenuImage}
                    alt={'menu'}
                  />
                </Button>
              </Dropdown>
            </div>
          )}
        </div>
      </div>

      {boardImages.length >= 1 && (
        <div
          style={{
            position: 'relative',
            width: contentSize,
            height: contentSize,
            overflow: 'hidden',
          }}
          onDoubleClick={() => {
            activeHeartAnimation(true);
            if (!isAlreadyLike) {
              setIsAlreadyLike(true);
              setLikeCount(likeCount + 1);
            }
          }}
          {...imageSwipeHandler}>
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
                zoom: 1.1,
                zIndex: 100,
              }}>
              <Heart isClick={animationFlag} />
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              left: contentSize * -imageIndex,
              width: contentSize * boardImages.length,
              transition: 'all .3s',
            }}>
            {boardImages.map((image, i) => (
              <div
                key={i}
                style={{
                  width: contentSize,
                  height: contentSize,
                  backgroundImage: `url(${Define.host}uploads/${image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#d9d9d9',
                  float: 'left',
                }}>
                {/* <img src={`${Define.host}uploads/${image}`} alt={'사진'} /> */}
              </div>
            ))}
          </div>
          {boardImages.length >= 2 && (
            <div
              style={{
                position: 'absolute',
                width: boardImages.length * 20,
                height: 23,
                left: '50%',
                marginLeft: -(boardImages.length * 20) / 2,
                backgroundColor: 'rgba(0, 0, 0, .3)',
                bottom: 25,
                borderRadius: 20,
                textAlign: 'center',
              }}>
              {boardImages.map((e, i) => (
                <div
                  key={i}
                  style={{
                    width: 10,
                    height: 10,
                    margin: '0 2px',
                    backgroundColor:
                      imageIndex === i ? Colors.mainColor : Colors.placeholder,
                    borderRadius: 5,
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div
        style={{
          padding: 10,
          borderBottom: '1px solid #eee',
        }}>
        {isBoardEditMode ? (
          <div
            style={{
              marginBottom: 10,
              textAlign: 'right',
            }}>
            <TextareaAutoSize
              style={{
                width: '100%',
                padding: 10,
                fontSize: 15,
                borderRadius: 5,
                border: 'none',
                resize: 'none',
                backgroundColor: Colors.placeholder,
              }}
              defaultValue={defaultBoardContent}
              onChange={({ nativeEvent }) => {
                const text = nativeEvent.target.value;
                setBoardContent(text);
              }}
            />
            <Button
              type={'primary'}
              shape={'round'}
              onClick={() => {
                Axios.post(`/board/modify/${boardId}`, {
                  title: '',
                  content: `${boardContent}`,
                  images: boardImages,
                  category: 'free',
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

                setBoardEditMode(false);
              }}>
              수정완료
            </Button>
            <Button
              shape={'round'}
              style={{
                marginLeft: 5,
              }}
              onClick={() => {
                setBoardContent(defaultBoardContent);
                setBoardEditMode(false);
              }}>
              취소
            </Button>
          </div>
        ) : (
          boardContent.split('\n').map((text, i) => {
            return (
              <p
                key={i}
                style={{
                  fontSize: 15,
                  marginBottom: 5,
                  wordBreak: 'break-all',
                }}>
                {text}
              </p>
            );
          })
        )}
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
              procLike(boardId);
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

      <div
        style={{
          padding: 10,
        }}>
        {commentList.map((comment, i) => {
          if (!comment.contents) {
            return <div key={i} />;
          }

          return <Comment key={i} comment={comment} />;
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

const Comment = ({
  comment: { id, contents: defaultComment = '', userId },
}) => {
  const [isCommentEditMode, setCommentEditMode] = React.useState(false);
  const [comment, setComment] = React.useState(defaultComment);

  return (
    <div>
      <span>
        <b
          style={{
            marginRight: 5,
          }}>
          익명{userId}
        </b>
        <span
          style={{
            wordBreak: 'break-all',
          }}>
          {isCommentEditMode ? (
            <div
              style={{
                marginBottom: 10,
                textAlign: 'right',
              }}>
              <TextareaAutoSize
                style={{
                  width: '100%',
                  padding: 10,
                  fontSize: 15,
                  borderRadius: 5,
                  border: 'none',
                  resize: 'none',
                  backgroundColor: Colors.placeholder,
                }}
                defaultValue={comment}
                onChange={({ nativeEvent }) => {
                  const text = nativeEvent.target.value;
                  setComment(text);
                }}
              />
              <Button
                type={'primary'}
                shape={'round'}
                onClick={() => {
                  Axios.post(`/comment/modify`, {
                    commentId: id,
                    comment,
                  })
                    .then(({ data }) => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 300);
                    })
                    .catch(error => {
                      const { data } = error.response;
                      message.warning(data.message);
                    });

                  setCommentEditMode(false);
                }}>
                수정완료
              </Button>
              <Button
                shape={'round'}
                style={{
                  marginLeft: 5,
                }}
                onClick={() => {
                  setComment(defaultComment);
                  setCommentEditMode(false);
                }}>
                취소
              </Button>
            </div>
          ) : (
            comment.split('\n').map((text, i) => {
              return (
                <p
                  key={i}
                  style={{
                    fontSize: 15,
                    marginBottom: 5,
                    wordBreak: 'break-all',
                  }}>
                  {text}
                </p>
              );
            })
          )}
        </span>
        {userId === getUserId() && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <Button
                      onClick={() => {
                        setCommentEditMode(true);
                      }}>
                      댓글 수정
                    </Button>
                  </Menu.Item>
                  <Menu.Item>
                    <Button
                      onClick={() => {
                        Axios.post(`/comment/delete`, {
                          commentId: id,
                        })
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
                      댓글 삭제
                    </Button>
                  </Menu.Item>
                </Menu>
              }
              size={40}
              placement={'bottomRight'}>
              <Button type='text' style={{ size: 5 }} onClick={() => {}}>
                <img
                  style={{
                    maxWidth: 15,
                    maxHeight: 15,
                  }}
                  src={CommentMenuImage}
                  alt={'menu'}
                />
              </Button>
            </Dropdown>
          </div>
        )}
      </span>
    </div>
  );
};
