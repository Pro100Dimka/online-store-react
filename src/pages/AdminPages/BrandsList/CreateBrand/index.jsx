import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { GridTextField, CustomModal, ApiService, NewFormikObject } from '../../../../components';
import { submit, initialValues, Schema, AcceptButtons } from '../../components';
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
      title={`${brandID ? 'Редагувати' : 'Додати'} бренд`}
      sx={{ width: '30%' }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="form-styles">
          <Grid container spacing={2} sx={{ mb: '5%' }}>
            <GridTextField
              sm={12}
              xs={12}
              md={12}
              labelParagraph="Введіть новий бренд"
              field="name"
              formik={formik}
            />
          </Grid>
          <AcceptButtons handleClick={() => setIsOpenBrandModal(!isOpenBrandModal)} />
        </Form>
      </FormikProvider>
    </CustomModal>
  );
}

export default CreateBrand;
