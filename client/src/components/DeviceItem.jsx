import React from 'react';
import { Card, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Card
      style={{
        width: 195,
        cursor: 'pointer',
        padding: '10px',
      }}
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
      border={'light'}
    >
      <Image width={175} height={175} src={device.img} />
      <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
        <Typography variant="subtitle1">Samsung...</Typography>
        <Typography>
          {device.rating} <StarBorderIcon style={{ width: '20px' }} />
        </Typography>
      </div>
      <Typography variant="subtitle1" style={{ fontWeight: 600 }}>
        {device.name}
      </Typography>
    </Card>
  );
};
export default DeviceItem;
