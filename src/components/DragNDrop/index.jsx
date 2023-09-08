import React, { useState, useRef } from 'react';
import './DragNDrop.css';
import { Button } from '@mui/material';
import RenderElement from './RenderElement';

const DragNDrop = ({ multiply, file, SetFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const selectFiles = () => {
    fileInputRef.current.click();
  };
  const setFiles = (files) => {
    const documents = files.map((doc) => {
      return {
        name: doc.name,
        data: doc
      };
    });
    SetFile([...file, ...documents]);
  };
  const onFileSelect = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setFiles(files);
    }
  };
  const deleteDocument = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    SetFile(updatedFiles);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = 'copy';
  };

  const onDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const { files } = event.dataTransfer;
    setFiles(files);
  };

  return (
    <div className="card">
      <div className="top">
        <p>Загрузка файла</p>
        {file.length !== 0 && (
          <>
            {`Выбрано ${file.length} файлов`}
            <br />
          </>
        )}
      </div>
      {file.length === 0 && (
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            ...(isDragging && { background: 'rgba(34, 63, 47, 0.30)' })
          }}
        >
          {isDragging ? (
            <span className="select">Перетащите файл сюда</span>
          ) : (
            ((multiply && file.length > 0) || file.length === 0) && (
              <>
                Перетащите файл сюда или{' '}
                <Button className="select" onClick={selectFiles}>
                  Выберите
                </Button>
                <input
                  ref={fileInputRef}
                  onChange={onFileSelect}
                  aria-label="Выберите файл"
                  name="file"
                  type="file"
                  style={{ display: 'none' }}
                />
              </>
            )
          )}
        </div>
      )}
      <div className="container">
        {file &&
          file.map((file, index) => (
            <div className="file" key={index}>
              <Button className="delete" onClick={() => deleteDocument(index)}>
                &times;
              </Button>
              <RenderElement doc={file} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DragNDrop;
