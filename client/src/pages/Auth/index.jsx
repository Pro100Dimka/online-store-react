import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { REGISTRATION_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import { Grid, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NewFormikObject from '../../components/getFormik';
import initialValues from './formik/initialValues';
import schema from './formik/schema';
import submit from './formik/Submit';
import { Form, FormikProvider } from 'formik';
import GridTextField from '../../components/fields/GridTextField';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const onSubmit = (values) => {
    submit(values, isLogin);
  };
  const formik = NewFormikObject(initialValues, schema, onSubmit);
  const { handleSubmit } = formik;

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <Typography variant="h2" className="m-auto">
          {isLogin ? 'Авторизація' : 'Реєстрація'}
        </Typography>
        <FormikProvider value={formik}>
          <Form
            autoComplete="off"
            noValidate
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: '10px',
            }}
          >
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              <GridTextField
                sm={12}
                xs={12}
                md={6}
                labelParagraph="Введіть ім`я"
                field="name"
                formik={formik}
              />
              <GridTextField
                sm={12}
                xs={12}
                md={6}
                labelParagraph="Введіть прізвище"
                field="surname"
                formik={formik}
              />
              <GridTextField
                sm={12}
                xs={12}
                md={12}
                labelParagraph="Введіть номер телефону"
                field="phone"
                formik={formik}
              />
              <GridTextField
                sm={12}
                xs={12}
                md={12}
                labelParagraph="Введіть пошту"
                field="email"
                formik={formik}
              />
              <GridTextField
                sm={12}
                xs={12}
                md={12}
                labelParagraph="Введіть пароль"
                field="password"
                formik={formik}
              />
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
                <Button
                  type="submit"
                  style={{ width: 'auto' }}
                  variant="outline-success"
                  // onClick={() => signIn()}
                >
                  {isLogin ? 'Увійти' : 'Зареєструватися'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Card>
    </Container>
  );
}

export default Auth;
