import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Grid } from '@mui/material';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
  const { device } = useContext(Context);
  console.log(device._devices);
  return (
    device._devices.rows && (
      <Grid container spacing={2} sx={{ marginTop: '10px' }}>
        {device._devices.rows.map((device) => (
          <Grid
            item
            md={3}
            xs={12}
            key={device.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <DeviceItem device={device} />
          </Grid>
        ))}
      </Grid>
    )
  );
});
export default DeviceList;
