import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Grid, Link, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <Typography variant="h2" className="m-auto">
          {isLogin ? 'Авторизація' : 'Реєстрація'}
        </Typography>
        <Grid container spacing={2} style={{ marginTop: '10px' }}>
          <Grid item md={12}>
            <TextField fullWidth placeholder="Введіть пошту" />
          </Grid>
          <Grid item md={12}>
            <TextField fullWidth placeholder="Введіть пароль" />
          </Grid>
          <Grid item md={6}>
            {isLogin ? (
              <>
                Не має аккаунту?{' '}
                <Link href={REGISTRATION_ROUTE} underline="hover">
                  Зареєструйся!
                </Link>
              </>
            ) : (
              <>
                Є аккаунт?{' '}
                <Link href={LOGIN_ROUTE} underline="hover">
                  Увійдіть!
                </Link>
              </>
            )}
          </Grid>
          <Grid
            item
            md={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button style={{ width: 'auto' }} variant="outline-success">
              {isLogin ? 'Увійти' : 'Зареєструватися'}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default Auth;
