/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import './DragNDrop.css';
import RenderElement from './RenderElement';

const DragNDrop = ({ multiply, file, setFiles, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const selectFiles = () => {
    fileInputRef.current.click();
  };
  const onFileSelect = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setFiles(Array.from(files));
    }
  };
  const deleteDocument = (index) => {
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    onRemove(updatedFiles);
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
    setFiles(Array.from(files));
  };

  return (
    <div className="card">
      {(file?.length === 0 || (file?.length > 0 && multiply)) && (
        <div className="top">
          <p>Завантаження файлу</p>
          {file?.length !== 0 && (
            <>
              {`Выбрано ${file?.length} файлов`}
              <br />
            </>
          )}
        </div>
      )}
      {file?.length === 0 && (
        <div
          className="drag-area"
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          style={{
            ...(isDragging && { background: 'rgba(0, 0, 0, 0.30)' })
          }}
        >
          {isDragging ? (
            <span className="select">Перетягніть файл сюди</span>
          ) : (
            ((multiply && file?.length > 0) || file?.length === 0) && (
              <>
                Перетягніть файл сюди або{' '}
                {
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <span className="select" onClick={selectFiles}>
                    Оберіть
                  </span>
                }
                <input
                  ref={fileInputRef}
                  onChange={onFileSelect}
                  aria-label="Оберіть файл"
                  name="file"
                  type="file"
                  style={{ display: 'none' }}
                />
              </>
            )
          )}
        </div>
      )}
      <div className="container" style={{ height: file?.length > 0 ? '90%' : 'auto' }}>
        {file?.length > 0 &&
          file?.map((file, index) => (
            <div className="image" key={index}>
              {
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <span className="delete" onClick={() => deleteDocument(index)}>
                  &nbsp;&times;&nbsp;
                </span>
              }
              <RenderElement doc={file} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DragNDrop;
