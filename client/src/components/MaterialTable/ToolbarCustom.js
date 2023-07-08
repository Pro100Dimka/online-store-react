import { Box } from '@mui/material';
import { MTableToolbar } from '@material-table/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbarWrapper: {
    '& .MuiToolbar-gutters': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));

const ToolbarCustom = ({ props, headerButtons }) => {
  const classes = useStyles();
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          {headerButtons &&
            headerButtons.map((btn, key) => <Box key={key}>{btn}</Box>)}
        </Box>
        <div className={classes.toolbarWrapper}>
          <MTableToolbar
            {...props}
            disableGutters={true}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} из ${count}`
            }
          />
        </div>
      </div>
    </div>
  );
};
export default ToolbarCustom;
