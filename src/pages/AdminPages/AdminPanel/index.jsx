import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../utils/consts';
import buttons from './consts/buttons';
import './index.css';

function AdminPanel() {
  const navigate = useNavigate();
  return (
    <Box className="horizontal-vertical-center-flex admin-main-box">
      <Container className="vertical-center-row admin-main-container">
        {buttons.map((button, index) => (
          <Button
            key={index}
            size="large"
            variant="contained"
            fullWidth
            onClick={() => navigate(`${ADMIN_ROUTE}${button.route}`)}
          >
            {button.label}
          </Button>
        ))}
      </Container>
    </Box>
  );
}

export default AdminPanel;
