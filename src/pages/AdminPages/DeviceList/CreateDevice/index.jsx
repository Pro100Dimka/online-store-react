import React, { useContext, useEffect, useState } from 'react';
import { Grid, MenuItem, Button } from '@mui/material';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { Context } from '../../../..';
import CustomModal from '../../../../components/Modal/CustModal';
import GridTextField from '../../../../components/fields/GridTextField';
import GridSelect from '../../../../components/fields/GridSelect';
import ApiService from '../../../../components/apiHelper/apiDevice';
import NewFormikObject from '../../../../components/getFormik';
import { submit, initialValues, Schema, AcceptButtons } from '../../components/index';
import { DEVICE_ROUTE } from '../../../../utils/consts';
import fetchFileInfo from '../../../../components/apiHelper/fetchFile';
import DragNDrop from '../../../../components/fields/DragNDrop';

function CreateDevice({ isOpenDeviceModal, setIsOpenDeviceModal, deviceID, tableRef }) {
  const apiDevice = new ApiService(DEVICE_ROUTE);
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const labelId = 'add-new-device';
  const apiTypes = new ApiService(DEVICE_ROUTE);
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = (values) => {
    submit(values, apiTypes, enqueueSnackbar, setIsOpenDeviceModal, tableRef);
  };
  const formik = NewFormikObject(initialValues, Schema(), onSubmit);
  const { handleSubmit, setFieldValue, values, setValues } = formik;
  useEffect(() => {
    if (deviceID) {
      apiDevice.getItemById(deviceID).then((response) => {
        Object.keys(response).forEach((key) => {
          setFieldValue(key, key === 'img' ? [response[key]] : response[key]);
        });
        fetchFileInfo(`${process.env.REACT_APP_API_URL}/${response.img}`)
          .then((files) => {
            if (files) {
              setFieldValue(
                'img',
                files.map((file) =>
                  Object.assign(file, {
                    preview: URL.createObjectURL(file)
                  })
                )
              );
            }
          })
          .catch((error) => {
            console.error('Error fetching file info:', error);
          });
      });
    }
  }, [deviceID]);
  useEffect(() => {
    if (isOpenDeviceModal) setValues(initialValues);
  }, [isOpenDeviceModal]);

  return (
    <CustomModal
      isOpenBrandModal={isOpenDeviceModal}
      setIsOpenBrandModal={setIsOpenDeviceModal}
      labelId={labelId}
      title={`${deviceID ? 'Редагувати' : 'Додати'} товар`}
      sx={{ width: '60%' }}
    >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="form-styles">
          <Grid container spacing={2}>
            <Grid
              item
              sm={12}
              xs={12}
              md={5}
              sx={{ display: 'flex', alignItems: 'center', minHeight: '300px' }}
            >
              <DragNDrop
                file={values.img}
                setFiles={(acceptedFiles) => {
                  setFieldValue(
                    'img',
                    acceptedFiles.map((file) => {
                      console.log(
                        Object.assign(file, {
                          preview: URL.createObjectURL(file)
                        })
                      );
                      return Object.assign(file, {
                        preview: URL.createObjectURL(file)
                      });
                    })
                  );
                }}
                onRemove={() => setFieldValue('img', [])}
              />
            </Grid>
            <Grid item sm={12} xs={12} md={7}>
              <Grid container spacing={2}>
                {device._types?.rows && (
                  <GridSelect
                    sm={12}
                    xs={12}
                    md={12}
                    labelParagraph="Оберіть тип"
                    field="typeId"
                    formik={formik}
                    option={device._types?.rows.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  />
                )}
                {device._brands?.rows && (
                  <GridSelect
                    sm={12}
                    xs={12}
                    md={12}
                    labelParagraph="Оберіть бренд"
                    field="brandId"
                    formik={formik}
                    option={device._brands.rows.map((brand) => (
                      <MenuItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </MenuItem>
                    ))}
                  />
                )}
                <GridTextField
                  sm={12}
                  xs={12}
                  md={12}
                  labelParagraph="Додати назву пристрою"
                  field="name"
                  formik={formik}
                />
                <GridTextField
                  sm={12}
                  xs={12}
                  md={12}
                  labelParagraph="Додати ціну"
                  field="price"
                  formik={formik}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 1, mb: 3 }}>
            <Grid item md={12} xs={12} sm={12} className="horizontal-vertical-center-flex">
              <Button variant="contained" onClick={() => addInfo()}>
                Додати характеристику
              </Button>
            </Grid>
            {info.map((i, key) => (
              <>
                <GridTextField
                  sm={12}
                  xs={12}
                  md={4}
                  labelParagraph="Додати ціну"
                  field="info.title"
                  formik={formik}
                  size="small"
                />
                <GridTextField
                  sm={12}
                  xs={12}
                  md={4}
                  labelParagraph="Додати опис"
                  field="price.description"
                  formik={formik}
                  size="small"
                />
                <Grid
                  key={key + 2}
                  item
                  md={4}
                  xs={12}
                  sm={12}
                  className="horizontal-vertical-center-flex"
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeInfo(i.number)}
                    fullWidth
                  >
                    Видалити
                  </Button>
                </Grid>
              </>
            ))}
          </Grid>
          <AcceptButtons handleClick={() => setIsOpenDeviceModal(!isOpenDeviceModal)} />
        </Form>
      </FormikProvider>
    </CustomModal>
  );
}

export default CreateDevice;
