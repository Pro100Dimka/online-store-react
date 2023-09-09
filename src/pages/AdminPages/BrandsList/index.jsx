import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import PageTitle from '../../../components/Page/PageTitle';
import ApiService from '../../../components/apiHelper/apiDevice';
import { BRAND_ROUTE } from '../../../utils/consts';
import convertDate from '../../../utils/convertDate';
import { getTableDefault } from '../../../components/MaterialTable/table-helper';
import Table from '../../../components/MaterialTable';
import CreateBrand from './CreateBrand';

function BrandsList() {
  const tableRef = useRef();
  const brandApi = new ApiService(BRAND_ROUTE);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenBrandModal, setIsOpenBrandModal] = useState(false);
  const [brandID, setBrandID] = useState(null);
  const getData = () => {
    return brandApi.getAllItems().then((responce) => {
      return {
        data: responce.rows,
        page: 0,
        pageSize: 1,
        totalCount: responce.count
      };
    });
  };
  useEffect(() => {
    if (!isOpenBrandModal) setBrandID(null);
  }, [isOpenBrandModal]);
  const editItem = (rowData) => {
    setBrandID(rowData.id);
    setIsOpenBrandModal(true);
  };
  const action = {
    onRowDelete: (oldData) =>
      new Promise((resolve, reject) => {
        brandApi
          .deleteItem(oldData.id)
          .then(() => {
            tableRef.current.onQueryChange();
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
      <PageTitle text="Бренди" isReturnButton />
      <CreateBrand
        tableRef={tableRef}
        brandID={brandID}
        setBrandID={setBrandID}
        isOpenBrandModal={isOpenBrandModal}
        setIsOpenBrandModal={setIsOpenBrandModal}
      />
      <Card>
        <Table
          tableRef={tableRef}
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
                setIsOpenBrandModal(true);
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

export default BrandsList;
