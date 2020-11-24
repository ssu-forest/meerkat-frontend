import React from 'react';
import { message, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import TextareaAutoSize from 'react-textarea-autosize';
import { FilePond } from 'react-filepond';
import Axios from 'axios';

import 'filepond/dist/filepond.min.css';

import Colors from '../constants/Colors';

const allowImageExtension = ['png', 'pneg', 'jpg', 'jpeg', 'gif', 'bmp'];

const randomCommentTemplate = [
  '오늘의 기분은 어떠세요?',
  '오늘의 한 줄 일기 어때요?',
  '오늘 먹은 걸 자랑할 수 있는 기회에요!',
  '오늘 술 한잔할 사람을 찾아보세요!',
  '과제를 도와줄 사람을 찾아보세요!',
  '같이 밥 먹을 친구를 찾아보세요!',
  '집 가는 길 통화할 사람을 찾는다면?',
  '오늘은 어떤 재밌는 일이 있었나요?',
  '무슨 생각을 하고 계신가요?',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default ({ onUpload = () => {} }) => {
  const [randomComment, setRandomComment] = React.useState('');
  const [useImage, setUseImage] = React.useState(false);
  const [imageList, setImageList] = React.useState([]);
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
            fontSize: 15,
            borderRadius: 5,
            border: 'none',
            resize: 'none',
            backgroundColor: Colors.placeholder,
          }}
          placeholder={randomComment}
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
        />
        <div
          style={{
            margin: '10px 0',
          }}>
          <Button
            type={useImage ? 'primary' : 'default'}
            shape={'round'}
            icon={<FileImageOutlined />}
            onClick={() => {
              setUseImage(!useImage);
            }}>
            사진
          </Button>
        </div>
        {useImage && (
          <FilePond
            files={imageList}
            onupdatefiles={async images => {
              let temp = [];
              for await (let image of images) {
                if (allowImageExtension.includes(image.fileExtension)) {
                  temp.push(image.file);
                } else {
                  message.warn('선택 파일이 사진 형식이 아닙니다.');
                }
              }
              setImageList(temp);
            }}
            allowMultiple
            allowReorder
            maxFiles={5}
            // server='/api'
            name={'image'}
            labelIdle='이 곳을 선택하여<br/>업로드할 이미지를 선택해주세요.'
          />
        )}
        <Button
          type={'primary'}
          style={{
            marginTop: 5,
          }}
          block
          onClick={() => {
            let text = content.replace(/\n$/gm, '');

            Axios.post('/board/write', {
              title: '',
              content: text,
              images: useImage ? imageList : [],
              category: 'free',
            })
              .then(() => {
                onUpload();
              })
              .catch(error => {
                const { data } = error.response;
                message.warning(data.message);
              });
            setContent('');
            setUseImage(false);
            setImageList([]);
          }}>
          <span>게시</span>
        </Button>
      </div>
    </div>
  );
};
