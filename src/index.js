import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { SnackbarProvider } from 'notistack';
import Slide from '@material-ui/core/Slide';
import App from './App';
import UserStore from './store/User';
import DeviceStore from './store/device';
import SnackbarCloseButton from './components/SnackbarCloseButton';
import './styles/index.css';

export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore()
    }}
  >
    <HelmetProvider>
      <SnackbarProvider
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
        maxSnack={5}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        TransitionComponent={Slide}
      >
        <App />
      </SnackbarProvider>
    </HelmetProvider>
  </Context.Provider>
);
