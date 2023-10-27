import React, { useRef } from 'react';
import { Modal, Stack, Typography, Paper } from '@mui/material';
import './index.css';

function CustModal({ isOpenBrandModal, setIsOpenBrandModal, labelId, children, sx, title }) {
  const modalRef = useRef();
  return (
    <Modal
      ref={modalRef}
      open={isOpenBrandModal}
      onClose={() => setIsOpenBrandModal(!isOpenBrandModal)}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }}
      aria-labelledby={labelId}
    >
      <Paper
        sx={{
          border: 'none ',
          '&:focus-visible': {
            outline: 'none',
            border: 'none'
          },
          ...sx
        }}
        className="modal"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 999999,
            pt: 3,
            pb: 1
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Stack>
        {children}
      </Paper>
    </Modal>
  );
}

export default CustModal;
