import React, { useContext, useEffect, useState } from 'react';
import { Typography, Grid, MenuItem } from '@mui/material';
import { Button } from 'react-bootstrap';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import { Context } from '../../../..';
import CustomModal from '../../../../components/CustModal';
import GridTextField from '../../../../components/fields/GridTextField';
import GridSelect from '../../../../components/fields/GridSelect';
import ApiService from '../../../../components/apiHelper/apiDevice';
import NewFormikObject from '../../../../components/getFormik';
import { submit, initialValues, Schema } from '../../components/index';
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
                  }))
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
          {/*  */}
          <Typography id={labelId} variant="h6" component="h2">
            Додати новий пристрій
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={5} sx={{ display: 'flex', alignItems: 'center', height: 285 }}>
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
              {/* <Dropzone
                files={values.img}
                sx={{
                  height: '100%',
                  bgcolor: 'lightgray',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}
                onDrop={(acceptedFiles) => {
                  setFieldValue(
                    'img',
                    acceptedFiles.map((file) =>
                      Object.assign(file, {
                        preview: URL.createObjectURL(file)
                      })
                    )
                  );
                }}
                onRemove={() => setFieldValue('img', [])}
              /> */}
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={2}>
                {device._types?.rows && (
                  <GridSelect
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
                  labelParagraph="Додати назву ціну"
                  field="price"
                  formik={formik}
                />
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Button variant="outline-dark" onClick={() => addInfo()}>
                Додати характеристику
              </Button>
            </Grid>
            {info.map((i, key) => (
              <>
                <GridTextField
                  sm={12}
                  xs={12}
                  md={4}
                  labelParagraph="Додати назву ціну"
                  field="info.title"
                  formik={formik}
                />
                <Grid key={key + 1} item md={4}>
                  <GridTextField
                    sm={12}
                    xs={12}
                    md={4}
                    labelParagraph="Додати опис"
                    field="price.description"
                    formik={formik}
                  />
                </Grid>
                <Grid key={key + 2} item md={4}>
                  <Button variant="outline-danger" onClick={() => removeInfo(i.number)}>
                    Видалити
                  </Button>
                </Grid>{' '}
              </>
            ))}
          </Grid>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '7px',
              marginTop: '20px'
            }}
          >
            <Button
              variant="outline-danger"
              onClick={() => setIsOpenDeviceModal(!isOpenDeviceModal)}
            >
              Закрити
            </Button>
            <Button variant="outline-success" type="submit">
              Додати
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </CustomModal>
  );
}

export default CreateDevice;
