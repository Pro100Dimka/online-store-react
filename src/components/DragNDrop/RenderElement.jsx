import React from 'react';
import { Typography } from '@mui/material';

const RenderElement = (doc) => {
  const fileExtension = doc.name.split('.').pop();
  const pdfIframe = (
    <iframe
      key={doc.name}
      className="iFrameStyles"
      src={doc.data}
      title={`PDF Document: ${doc.name}`}
    />
  );
  const wordIframe = <Typography textAlign="center">Предпросмотр файлов Word запрещен</Typography>;
  const defIframe = (
    <iframe
      key={doc.name}
      className="iFrameStyles"
      src={doc.data}
      title={`Def Document: ${doc.name}`}
    />
  );
  const videoElement = (
    <video className="iFrameStyles" style={{ background: 'black' }} controls key={doc.name}>
      <source src={doc.data} type={`video/${fileExtension}`} />
      Ваш браузер не поддерживает просмотр видео
    </video>
  );

  switch (fileExtension) {
    case 'pdf':
      return pdfIframe;
    case 'zip':
      return pdfIframe;
    case 'flv':
      return videoElement;
    case 'mp4':
      return videoElement;
    case 'docx':
      return wordIframe;
    default:
      return defIframe;
  }
};
export default RenderElement;
