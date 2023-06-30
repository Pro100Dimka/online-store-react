import React, { useContext, useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import { Button } from 'react-bootstrap';
import { Context } from '../../..';
import Dropzone from '../../../components/dropzone';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CreateDevice({ isOpenDeviceModal, setIsOpenDeviceModal }) {
  const { device } = useContext(Context);
  const [file, setFile] = useState([]);
  const [info, setInfo] = useState([]);
  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  return (
    <Modal
      open={isOpenDeviceModal}
      onClose={() => setIsOpenDeviceModal(!isOpenDeviceModal)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="add-new-type"
    >
      <Fade in={isOpenDeviceModal}>
        <Box sx={style}>
          <Typography id="add-new-type" variant="h6" component="h2">
            Додати новий пристрій
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              md={5}
              sx={{ display: 'flex', alignItems: 'center', height: 285 }}
            >
              <Dropzone
                accept="image/*"
                files={file}
                sx={{
                  height: '100%',
                  bgcolor: 'lightgray',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
                onDrop={(acceptedFiles) => {
                  setFile(
                    acceptedFiles.map((files) =>
                      Object.assign(files, {
                        preview: URL.createObjectURL(files),
                      })
                    )
                  );
                }}
                onRemove={() => setFile([])}
              />
            </Grid>
            <Grid item md={7}>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="select-type">Оберіть тип</InputLabel>
                    <Select
                      labelId="select-type"
                      value={device._types[0].id}
                      // onChange={handleChange}
                      input={<OutlinedInput label="Оберіть тип" />}
                      MenuProps={MenuProps}
                    >
                      {device._types.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="select-brand">Оберіть бренд</InputLabel>
                    <Select
                      labelId="select-brand"
                      value={device._brands[0].id}
                      // onChange={handleChange}
                      input={<OutlinedInput fullWidth label="Оберіть бренд" />}
                      MenuProps={MenuProps}
                    >
                      {device._brands.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <TextField fullWidth placeholder="Додати назву пристрою" />
                </Grid>
                <Grid item md={12}>
                  <TextField fullWidth placeholder="Додати назву ціну" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={12}>
              <Button variant="outline-dark" onClick={() => addInfo()}>
                Додати характеристику
              </Button>
            </Grid>
            {info.map((i, key) => (
              <>
                <Grid key={key} item md={4}>
                  <TextField
                    fullWidth
                    placeholder="Додати назву характеристики"
                  />
                </Grid>
                <Grid key={key + 1} item md={4}>
                  <TextField
                    fullWidth
                    placeholder="Додати значення характеристики"
                  />
                </Grid>
                <Grid key={key + 2} item md={4}>
                  <Button
                    variant={'outline-danger'}
                    onClick={() => removeInfo(i.number)}
                  >
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
              marginTop: '20px',
            }}
          >
            <Button
              variant="outline-danger"
              onClick={() => setIsOpenDeviceModal(!isOpenDeviceModal)}
            >
              Закрити
            </Button>
            <Button variant="outline-success">Додати</Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}

export default CreateDevice;
