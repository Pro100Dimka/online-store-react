import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateBrand from './Modal/CreateBrand';
import CreateType from './Modal/CreateType';
import CreateDevice from './Modal/CreateDevice';

function AdminPanel() {
  const [isOpenTypeModal, setIsOpenTypeModal] = useState(false);
  const [isOpenBrandModal, setIsOpenBrandModal] = useState(false);
  const [isOpenDeviceModal, setIsOpenDeviceModal] = useState(false);

  return (
    <>
      <CreateType
        isOpenTypeModal={isOpenTypeModal}
        setIsOpenTypeModal={setIsOpenTypeModal}
      />
      <CreateBrand
        isOpenBrandModal={isOpenBrandModal}
        setIsOpenBrandModal={setIsOpenBrandModal}
      />
      <CreateDevice
        isOpenDeviceModal={isOpenDeviceModal}
        setIsOpenDeviceModal={setIsOpenDeviceModal}
      />
      <Container className="d-flex flex-column ">
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => setIsOpenTypeModal(!isOpenTypeModal)}
        >
          Добавить тип
        </Button>
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => setIsOpenBrandModal(!isOpenBrandModal)}
        >
          Добавить бренд
        </Button>
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => setIsOpenDeviceModal(!isOpenDeviceModal)}
        >
          Добавить устройство
        </Button>
      </Container>
    </>
  );
}

export default AdminPanel;
