import { isString } from 'lodash';
import { Icon } from '@iconify/react';
import { useDropzone } from 'react-dropzone';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';
import { alpha, styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Paper,
  ListItem,
  IconButton,
  Typography,
} from '@mui/material';

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[100],
  border: `1px dashed ${theme.palette.grey[200]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}));

// ---------------------------------------------------------------------

export default function Dropzone({ error, files, onRemove, sx, ...other }) {
  const hasFile = files.length > 0;
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      ...other,
    });
  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'red',
            borderColor: 'black',
            bgcolor: 'white',
          }),
        }}
        style={{
          ...(files.length !== 0 && { display: 'none' }),
        }}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            p: 2.4,
            ml: { md: 2 },
          }}
        >
          <Typography align="center" gutterBottom variant="h5">
            Завантаження файлу
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Перемістіть файл або`}&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              клікніть
            </Typography>
            &nbsp;для завантаження
          </Typography>
        </Box>
      </DropZoneStyle>
      <List
        disablePadding
        sx={{
          ...(hasFile && { my: 0 }),
          ...(hasFile && { display: 'flex', justifyContent: 'center' }),
        }}
      >
        <AnimatePresence>
          {files.map((file) => {
            const { name, preview } = file;
            const key = isString(file) ? file : name;
            return (
              <ListItem
                key={key}
                component={motion.div}
                sx={{
                  p: 0,
                  width: 400,
                  height: 270,
                  borderRadius: 1.5,
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'inline-flex',
                }}
              >
                <Paper
                  variant="outlined"
                  component="img"
                  src={isString(file) ? file : preview}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'absolute',
                    borderRadius: '8px',
                  }}
                />

                <Box sx={{ top: 0, right: 0, position: 'absolute' }}>
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      p: '2px',
                      color: 'common.white',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      '&:hover': {
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.48),
                      },
                    }}
                  >
                    <Icon icon={closeFill} />
                  </IconButton>
                </Box>
              </ListItem>
            );
          })}
        </AnimatePresence>
      </List>
    </Box>
  );
}
