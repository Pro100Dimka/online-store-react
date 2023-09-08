import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import App from './App';
import UserStore from './store/User';
import DeviceStore from './store/device';
import SnackbarCloseButton from './components/SnackbarCloseButton';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore()
    }}
  >
    <SnackbarProvider
      action={(snackbarKey) => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      maxSnack={5}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
      TransitionComponent={Slide}
    >
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </SnackbarProvider>
  </Context.Provider>
);
