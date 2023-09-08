import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import CustomModal from '../../../../components/CustModal';
import initialValues from '../../AdminPanel/Modal/formik/initialValues';
import submit from '../../AdminPanel/Modal/formik/Submit';
import Schema from '../../AdminPanel/Modal/formik/Schema';
import NewFormikObject from '../../../../components/getFormik';
import GridTextField from '../../../../components/fields/GridTextField';
import { TYPE_ROUTE } from '../../../../utils/consts';
import ApiService from '../../../../components/apiHelper/apiDevice';

function CreateType({ isOpenTypeModal, setIsOpenTypeModal, tableRef, typeID }) {
  const apiTypes = new ApiService(TYPE_ROUTE);
  const { enqueueSnackbar } = useSnackbar();
  const labelId = 'add-new-type';
  const onSubmit = (values) => {
    submit(values, apiTypes, enqueueSnackbar, setIsOpenTypeModal, tableRef);
  };
  useEffect(() => {
    if (typeID) {
      apiTypes.getItemById(typeID).then((response) => {
        Object.keys(response).forEach((key) => {
          setFieldValue(key, response[key]);
        });
      });
    }
  }, [typeID]);
  useEffect(() => {
    if (!isOpenTypeModal) setValues(initialValues);
  }, [isOpenTypeModal]);
  const formik = NewFormikObject(initialValues, Schema(), onSubmit);
  const { handleSubmit, setFieldValue, setValues } = formik;
  return (
    <CustomModal
      isOpenBrandModal={isOpenTypeModal}
      setIsOpenBrandModal={setIsOpenTypeModal}
      labelId={labelId}
    >
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10px'
          }}
        >
          <Typography id={labelId} variant="h4" component="h2" textAlign="center">
            Додати новий тип
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <GridTextField
              sm={12}
              xs={12}
              md={12}
              labelParagraph="Введіть новий тип"
              field="name"
              formik={formik}
            />
            <Grid
              item
              sm={12}
              xs={12}
              md={12}
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '7px',
                marginTop: '10px'
              }}
            >
              <Button variant="outline-danger" onClick={() => setIsOpenTypeModal(!isOpenTypeModal)}>
                Закрити
              </Button>
              <Button variant="outline-success" type="submit">
                Додати
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </CustomModal>
  );
}

export default CreateType;
