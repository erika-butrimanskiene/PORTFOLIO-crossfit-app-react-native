import React from 'react';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/assets/styles/theme';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import {configStore} from './src/state/store';

const {store, persistor} = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
