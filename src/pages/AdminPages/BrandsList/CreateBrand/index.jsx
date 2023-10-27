import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { Button } from 'react-bootstrap';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import GridTextField from '../../../../components/fields/GridTextField';
import CustomModal from '../../../../components/CustModal';
import ApiService from '../../../../components/apiHelper/apiDevice';
import { submit, initialValues, Schema } from '../../components/index';
import NewFormikObject from '../../../../components/getFormik';
import { BRAND_ROUTE } from '../../../../utils/consts';

function CreateBrand({ isOpenBrandModal, setIsOpenBrandModal, tableRef, brandID }) {
  const apiBrand = new ApiService(BRAND_ROUTE);
  const labelId = 'add-new-brand';
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (values) => {
    submit(values, apiBrand, enqueueSnackbar, setIsOpenBrandModal, tableRef);
  };
  useEffect(() => {
    if (brandID) {
      apiBrand.getItemById(brandID).then((response) => {
        Object.keys(response).forEach((key) => {
          setFieldValue(key, response[key]);
        });
      });
    }
  }, [brandID]);
  useEffect(() => {
    if (!isOpenBrandModal) setValues(initialValues);
  }, [isOpenBrandModal]);
  const formik = NewFormikObject(initialValues, Schema(), onSubmit);
  const { handleSubmit, setFieldValue, setValues } = formik;

  return (
    <CustomModal
      isOpenBrandModal={isOpenBrandModal}
      setIsOpenBrandModal={setIsOpenBrandModal}
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
          <Typography id={labelId} variant="h6" component="h2">
            Додати новий бренд
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: '10px' }}>
            <GridTextField
              sm={12}
              xs={12}
              md={12}
              labelParagraph="Введіть новий бренд"
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
              <Button
                variant="outline-danger"
                onClick={() => setIsOpenBrandModal(!isOpenBrandModal)}
              >
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

export default CreateBrand;
