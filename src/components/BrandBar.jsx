import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Context } from '../index';
import { SELECTED_BRAND } from '../utils/consts';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Box>
      <List
        variant="outlined"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 1,
          py: 1,
          overflow: 'auto',
          width: 'auto',

          '::-webkit-scrollbar': { display: 'none' }
        }}
      >
        {device._brands.rows &&
          device._brands?.rows.map((brand) => (
            <ListItem
              sx={{
                borderRadius: '5px 5px 0 0',
                border:
                  brand.id === device._selectedBrand.id
                    ? '1px solid rgba(128, 128, 128, 0.5)'
                    : 'none',
                borderBottom: '1px solid rgba(128, 128, 128, 0.5)'
              }}
              disablePadding
              key={brand.id}
            >
              <ListItemButton
                style={{
                  cursor: 'pointer'
                }}
                selected={brand.id === device._selectedBrand.id}
                onClick={() => device.setStoreItems(SELECTED_BRAND, brand)}
              >
                <ListItemText primary={brand.name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
});

export default BrandBar;
