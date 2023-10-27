import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { TYPE_ROUTE } from '../../../utils/consts';
import convertDate from '../../../utils/convertDate';
import { getTableDefault } from '../../../components/MaterialTable/table-helper';
import { PageTitle, Table, ApiService, EditIcon, DeleteIcon, AddIcon } from '../../../components';
import CreateType from './CreateType';

function TypesList() {
  const tableRefType = useRef();
  const typeApi = new ApiService(TYPE_ROUTE);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenTypeModal, setIsOpenTypeModal] = useState(false);
  const [typeID, setTypeID] = useState(null);
  const getData = () => {
    return typeApi.getAllItems().then((responce) => {
      return {
        data: responce.rows,
        page: 0,
        pageSize: 1,
        totalCount: responce.count
      };
    });
  };
  useEffect(() => {
    if (!isOpenTypeModal) setTypeID(null);
  }, [isOpenTypeModal]);
  const editItem = (rowData) => {
    setTypeID(rowData.id);
    setIsOpenTypeModal(true);
  };
  const action = {
    icon: <DeleteIcon />,
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        typeApi
          .deleteItem(oldData.id)
          .then(() => {
            tableRefType.current.onQueryChange();
            enqueueSnackbar(`Елемент ${oldData.name} успішно видалено`, {
              variant: 'success'
            });
            resolve();
          })
          .catch((error) => {
            enqueueSnackbar(error.response.data.message, { variant: 'error' });
            reject();
          });
      })
  };
  return (
    <Container style={{ maxWidth: '1850px' }}>
      <PageTitle text="Типи" isReturnButton />
      <CreateType
        tableRef={tableRefType}
        typeID={typeID}
        isOpenTypeModal={isOpenTypeModal}
        setIsOpenTypeModal={setIsOpenTypeModal}
      />
      <Card>
        <Table
          tableRef={tableRefType}
          {...getTableDefault()}
          columns={[
            {
              title: 'Назва',
              field: 'name',
              width: '50%'
            },
            {
              title: 'Дата створення',
              field: 'createdAt',
              width: '25%',
              render: (rowData) => convertDate(rowData.createdAt)
            },
            {
              title: 'Дата змінення',
              field: 'updatedAt',
              width: '25%',
              render: (rowData) => convertDate(rowData.updatedAt)
            }
          ]}
          icons={{
            Delete: () => <DeleteIcon />
          }}
          headerButtons={[
            <Button
              key="addNewBrandButton"
              variant="contained"
              sx={{ backgroundColor: 'black', borderRadius: '10px' }}
              startIcon={<AddIcon />}
              onClick={() => {
                setIsOpenTypeModal(true);
              }}
            >
              Додати новий бренд
            </Button>
          ]}
          data={getData}
          editable={action}
          actions={[
            {
              icon: () => (
                <EditIcon
                  style={{
                    cursor: 'pointer'
                  }}
                />
              ),
              tooltip: 'Редагувати бренд',
              onClick: (_event, rowData) => editItem(rowData)
            }
          ]}
        />
      </Card>
    </Container>
  );
}

export default TypesList;
