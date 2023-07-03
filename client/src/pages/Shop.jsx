import { Grid, Container } from '@mui/material';
import React, { useContext, useEffect } from 'react';
// import { Container } from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {
  fetchBrands,
  fetchDevices,
  fetchTypes,
} from '../components/apiHelper/apiDevice';

const Shop = observer(() => {
  const { device } = useContext(Context);
  useEffect(() => {
    fetchTypes().then((response) => {
      device.setTypes(response);
    });
    fetchBrands().then((response) => {
      device.setBrands(response);
    });
    fetchDevices().then((response) => {
      console.log(response);
      device.setDevices(response);
    });
  }, []);
  return (
    <Container style={{ maxWidth: '93%' }}>
      <Grid container spacing={2}>
        <Grid item md={3}>
          <TypeBar />
        </Grid>
        <Grid item md={9}>
          <BrandBar />
          <DeviceList />
        </Grid>
      </Grid>
    </Container>
  );
});

export default Shop;
