import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { submit, initialValues, Schema, AcceptButtons } from '../../components/index';
import { CustomModal, NewFormikObject, GridTextField, ApiService } from '../../../../components';
import { TYPE_ROUTE } from '../../../../utils/consts';

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
      title={`${typeID ? 'Редагувати' : 'Додати'} тип`}
      sx={{ width: '30%' }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="form-styles">
          <Grid container spacing={2} sx={{ mb: '5%' }}>
            <GridTextField
              sm={12}
              xs={12}
              md={12}
              labelParagraph="Введіть новий тип"
              field="name"
              formik={formik}
            />
          </Grid>
          <AcceptButtons handleClick={() => setIsOpenTypeModal(!isOpenTypeModal)} />
        </Form>
      </FormikProvider>
    </CustomModal>
  );
}

export default CreateType;
