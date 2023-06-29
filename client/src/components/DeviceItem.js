import React from 'react';
import { Card } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Grid } from '@mui/material';
import { Image } from 'react-bootstrap';

const DeviceItem = ({ device }) => {
  return (
    <Card style={{ width: 175, cursor: 'pointer' }} border={'light'}>
      <Image width={175} height={175} src={device.img} />
      <div className="d-flex justify-content-between align-items-center">
        <div>{device.name}</div>
        <div>
          {device.rating}
          <StarBorderIcon style={{ width: '19px' }} />
        </div>
      </div>
    </Card>
  );
};
export default DeviceItem;
