import React from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function PageTitle({
  text, isReturnButton, isEdit, editFunc, textAlign
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={!textAlign ? 'space-between' : textAlign}
      mb={5}
      ml={1}
    >
      <Typography variant="h4" gutterBottom sx={{ width: '90%' }}>
        {text}
        {isEdit && (
          <IconButton onClick={editFunc}>
            <EditIcon style={{ color: theme.palette.primary.main, cursor: 'pointer' }} />
          </IconButton>
        )}
      </Typography>

      {isReturnButton && (
        <Button
          size="medium"
          className="mt-3 mr-3"
          sx={{
            marginRight: '0px'
          }}
          variant="DiiaButtonSave"
          onClick={() => navigate(-1)}
        >
          Повернутись
        </Button>
      )}
    </Stack>
  );
}

export default PageTitle;
