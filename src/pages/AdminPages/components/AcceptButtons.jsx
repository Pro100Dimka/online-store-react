import React from 'react';
import { Button, Grid } from '@mui/material';

function AcceptButtons({ handleClick }) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={6} xs={6} md={6}>
        <Button variant="contained" color="success" type="submit" fullWidth>
          Додати
        </Button>
      </Grid>
      <Grid item sm={6} xs={6} md={6}>
        <Button variant="contained" color="error" onClick={handleClick} fullWidth>
          Закрити
        </Button>
      </Grid>
    </Grid>
  );
}

export default AcceptButtons;
