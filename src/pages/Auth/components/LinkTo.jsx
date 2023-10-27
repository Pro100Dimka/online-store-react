import React from 'react';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LinkTo({ text, buttonLabel, link }) {
  const navigate = useNavigate();
  return (
    <>
      {text}&nbsp;
      <Link onClick={() => navigate(link)} underline="hover">
        {buttonLabel}
      </Link>
    </>
  );
}

export default LinkTo;
