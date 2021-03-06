import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from './app/store';

//
import { SnackbarProvider } from 'notistack';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import theme from "theme";


store.subscribe(() => {
  window.state = store.getState();
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            // preventDuplicate={true}
            iconVariant={{
              info: <ShoppingCartIcon style={{ padding: '5px' }} />,
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            maxSnack={3}
          >
            <App />
          </SnackbarProvider>

        </ThemeProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
