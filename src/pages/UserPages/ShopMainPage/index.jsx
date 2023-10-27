import { Grid, Container } from '@mui/material';
import React from 'react';
import TypeBar from '../../../components/TypeBar';
import BrandBar from '../../../components/BrandBar';
import DeviceList from '../../../components/DeviceList';

const ShopMainPage = () => {
  return (
    <Container style={{ maxWidth: '93%', paddingTop: '2%' }}>
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
};

export default ShopMainPage;
