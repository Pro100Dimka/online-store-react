import React from 'react';
import {
  Modal,
  Box,
  TextField,
  Backdrop,
  Fade,
  Typography,
} from '@mui/material';
import { Button } from 'react-bootstrap';
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

function CreateType({ isOpenTypeModal, setIsOpenTypeModal }) {
  return (
    <Modal
      open={isOpenTypeModal}
      onClose={() => setIsOpenTypeModal(!isOpenTypeModal)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby="add-new-type"
    >
      <Fade in={isOpenTypeModal}>
        <Box sx={style}>
          <Typography id="add-new-type" variant="h6" component="h2">
            Додати новий тип
          </Typography>
          <TextField fullWidth placeholder="Додати новий тип" />
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
              onClick={() => setIsOpenTypeModal(!isOpenTypeModal)}
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

export default CreateType;
