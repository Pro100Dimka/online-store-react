import React from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Grid, Typography } from '@mui/material';

import Star from '../img/Star1.png';

function DevicePage() {
  const device = {
    id: 7,
    name: 'Iphone 12 Pro',
    price: 5000,
    rating: 5,
    img: 'https://bipbap.ru/wp-content/uploads/2017/04/000f_7290754.jpg',
  };
  const description = [
    { id: 1, title: 'Оперативная память', description: '5 гб' },
    { id: 2, title: 'Камера', description: '5 гб' },
    { id: 3, title: 'Процессор', description: '5 гб' },
    { id: 4, title: 'Кол-во ядер', description: '5 гб' },
    { id: 5, title: 'Аккамулятор', description: '5 гб' },
  ];
  return (
    <Container style={{ maxWidth: '90%' }}>
      <Grid container>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Image width={400} height={400} src={device.img} />
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h3">{device.name}</Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              background: `url(${Star}) no-repeat center center`,
              width: 340,
              height: 340,
              backgroundSize: 'cover',
            }}
          >
            <Typography fontSize={64}>{device.rating}</Typography>
          </div>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 400,
              height: 400,
              fontSize: 32,
              border: '5px solid lightgray',
            }}
          >
            <h3>{device.price} грн.</h3>
            <Button variant={'outline-dark'}>Додати в кошик</Button>
          </Card>
        </Grid>
        <Grid item md={12}>
          <h1>Характеристики</h1>
          {description.map((desc, index) => (
            <Grid
              item
              key={desc.id}
              style={{
                background: index % 2 ? 'lightgray' : 'transperent',
                padding: 10,
              }}
            >
              {desc.title}:{desc.description}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DevicePage;
