import React, { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Grid, Typography, Container, Card, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, FormikProvider } from 'formik';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { NewFormikObject } from '../../components';
import { initialValues, Schema, submit, LinkTo, FieldsMapper } from './components';
import fields from './consts/fields';
import './index.css';
import { Context } from '../../index';

function Auth() {
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const onSubmit = (values) => {
    submit(values, isLogin, enqueueSnackbar, user, navigate);
  };
  const formik = NewFormikObject(initialValues, Schema(isLogin), onSubmit);
  const { handleSubmit } = formik;
  return (
    <Container className="horizontal-vertical-center-flex container-main">
      <Card className="half-width">
        <Container className="container-padding">
          <Typography variant="h2" textAlign="center">
            {isLogin ? 'Авторизація' : 'Реєстрація'}
          </Typography>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit} className="form-styles">
              <Grid container spacing={2} sx={{ pt: '5%' }}>
                <FieldsMapper fields={fields} formik={formik} condition={isLogin} />
                <Grid item sm={6} md={6} className="vertical-center-row link-to-grid-element">
                  {isLogin ? (
                    <LinkTo
                      text="Не має аккаунту?"
                      buttonLabel="Зареєструйся!"
                      link={REGISTRATION_ROUTE}
                    />
                  ) : (
                    <LinkTo text="Є аккаунт?" buttonLabel="Увійдіть!" link={LOGIN_ROUTE} />
                  )}
                </Grid>
                <Grid item sm={6} md={6} className="button-grid-element">
                  <Button type="submit" variant="contained">
                    {isLogin ? 'Увійти' : 'Зареєструватися'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Container>
      </Card>
    </Container>
  );
}

export default Auth;
