import React, { useEffect, useRef, useState } from 'react';
import PageTitle from '../../../components/Page/PageTitle';
import { Container, Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ApiService from '../../../components/apiHelper/apiDevice';
import { DEVICE_ROUTE } from '../../../utils/consts';
import { getTableDefault } from '../../../components/MaterialTable/table-helper';
import Table from '../../../components/MaterialTable';
import CreateDevice from './Modal';

function DeviceList() {
  const tableRef = useRef();
  const deviceApi = new ApiService(DEVICE_ROUTE);
  const [isOpenDeviceModal, setIsOpenDeviceModal] = useState(false);
  const [deviceID, setDeviceID] = useState(null);
  const getData = () => {
    return deviceApi.getAllItems().then((responce) => {
      return {
        data: responce.rows,
        page: 1,
        pageSize: 5,
        totalCount: responce.count,
      };
    });
  };
  useEffect(() => {
    if (!isOpenDeviceModal) setDeviceID(null);
  }, [isOpenDeviceModal]);
  const editItem = (rowData) => {
    setDeviceID(rowData.id);
    setIsOpenDeviceModal(true);
  };

  return (
    <Container style={{ maxWidth: '1850px' }}>
      <PageTitle text="Пристрої" isReturnButton />
      <CreateDevice
        deviceID={deviceID}
        setDeviceID={setDeviceID}
        isOpenDeviceModal={isOpenDeviceModal}
        setIsOpenDeviceModal={setIsOpenDeviceModal}
      />
      <Card>
        <Table
          tableRef={tableRef}
          {...getTableDefault()}
          columns={[
            {
              title: 'Зображення',
              field: 'img',
              width: '25%',
              render: (rowData) => (
                <img
                  src={`${process.env.REACT_APP_API_URL}/${rowData.img}`}
                  width={'100%'}
                  alt={rowData.name}
                />
              ),
            },
            {
              title: 'Назва',
              field: 'name',
            },
            {
              title: 'Бренд',
              field: 'brandId',
            },
            {
              title: 'Тип',
              field: 'typeId',
            },
            {
              title: 'Ціна',
              field: 'price',
            },
            {
              title: 'Рейтинг',
              field: 'rating',
              width: '10%',
            },
          ]}
          headerButtons={[
            <Button
              variant="contained"
              sx={{ backgroundColor: 'black', borderRadius: '10px' }}
              startIcon={<AddIcon />}
              onClick={() => {
                setIsOpenDeviceModal(true);
              }}
            >
              Додати новий пристрій
            </Button>,
          ]}
          data={getData}
          actions={[
            {
              icon: () => (
                <EditIcon
                  style={{
                    cursor: 'pointer',
                  }}
                />
              ),
              tooltip: 'Редагувати пристрій',
              onClick: (_event, rowData) => editItem(rowData),
            },
          ]}
        ></Table>
      </Card>
    </Container>
  );
}

export default DeviceList;
