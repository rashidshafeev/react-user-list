import React from 'react';

import { Provider } from 'react-redux';
import { store } from './store/index'

import UserList from './components/UserList';
import MainLayout from './layout/MainLayout';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
            <Provider store={store}>
      <MainLayout></MainLayout>
    </Provider>
    </ThemeProvider>
    
  );
}

export default App;
