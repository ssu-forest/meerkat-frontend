import React from 'react';
import Axios from 'axios';
import { message, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';
import TextareaAutoSize from 'react-textarea-autosize';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';

import { getToken } from '../utils/Auth';
import { getRandomInt } from '../utils/Data';
import Constants from '../constants/Define';
import Colors from '../constants/Colors';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const labels = {
  labelIdle: '이 곳에 드래그하거나 클릭하여 파일을 업로드할 수 있습니다.',
  labelInvalidField: '올바르지 못한 필드입니다.',
  labelFileWaitingForSize: '크기를 계산하고 있습니다.',
  labelFileSizeNotAvailable: '허용되지 않은 파일 사이즈입니다.',
  labelFileLoading: '파일을 불러오는 중입니다.',
  labelFileLoadError: '파일 불러오는 중 문제가 발생했습니다.',
  labelFileProcessing: '업로드 중 입니다.',
  labelFileProcessingComplete: '업로드가 완료되었습니다.',
  labelFileProcessingAborted: '업로드가 취소되었습니다.',
  labelFileProcessingError: '업로드에 문제가 발생했습니다.',
  labelFileProcessingRevertError: '삭제 중 문제가 발생했습니다.',
  labelTapToCancel: '이 곳을 클릭하여 취소',
  labelTapToRetry: '이 곳을 클릭하여 재시도',
  labelTapToUndo: '이 곳을 클릭하여 삭제',
  labelButtonRemoveItem: '삭제',
  labelButtonAbortItemLoad: '중지',
  labelButtonRetryItemLoad: '재시도',
  labelButtonAbortItemProcessing: '취소',
  labelButtonUndoItemProcessing: '삭제',
  labelButtonRetryItemProcessing: '재시도',
  labelButtonProcessItem: '업로드',
};

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

const uploadedImagePath = [];

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
            {...labels}
            files={imageList}
            onaddfile
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
            server={{
              process: {
                url: `${Constants.host}board/upload`,
                method: 'POST',
                withCredentials: false,
                headers: { Authorization: getToken() },
                timeout: 10000,
                onload: response => {
                  try {
                    const pathInfo = JSON.parse(response);
                    uploadedImagePath.push(pathInfo.images[0]);
                  } catch (e) {
                    message.warn('사진을 업로드하지 못했습니다.');
                  }
                },
                onerror: null,
                ondata: null,
              },
              load: '/',
              restore: null,
              fetch: null,
              patch: null,
              revert: null,
              remove: null,
            }}
            allowMultiple
            allowReorder
            maxFiles={5}
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
              images: useImage ? uploadedImagePath : [],
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
