import React from 'react';
import {AuthProvider} from './src/routes/AuthProvider';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/assets/styles/theme';
import {Text, View} from "react-native";
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import {configStore} from './src/state/store';

const {store, persistor} = configStore();

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
