import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_ROUTE,
  BRANDS_LIST,
  DEVICES_LIST,
  TYPES_LIST,
} from '../../../utils/consts';

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <>
      <Container className="d-flex flex-column ">
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => navigate(`${ADMIN_ROUTE}${DEVICES_LIST}`)}
        >
          Товари
        </Button>
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => navigate(`${ADMIN_ROUTE}${BRANDS_LIST}`)}
        >
          Бренди
        </Button>
        <Button
          variant={'outline-dark'}
          className="mt-4 p-4"
          onClick={() => navigate(`${ADMIN_ROUTE}${TYPES_LIST}`)}
        >
          Категорії товірів
        </Button>
      </Container>
    </>
  );
}

export default AdminPanel;
