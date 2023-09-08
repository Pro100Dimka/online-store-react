import React, { useRef } from 'react';
import { Modal, Box, Backdrop, Fade } from '@mui/material';
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

function CustModal({
  isOpenBrandModal,
  setIsOpenBrandModal,
  labelId,
  children,
}) {
  const modalRef = useRef();
  return (
    <Modal
      ref={modalRef}
      open={isOpenBrandModal}
      onClose={() => setIsOpenBrandModal(!isOpenBrandModal)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      aria-labelledby={labelId}
    >
      <Fade in={isOpenBrandModal}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}

export default CustModal;
