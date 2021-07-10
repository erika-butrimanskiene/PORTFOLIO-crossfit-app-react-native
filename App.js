import React from 'react';
import {AuthProvider} from './src/routes/AuthProvider';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/assets/styles/theme';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import store from './src/state/store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Navigator />
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
