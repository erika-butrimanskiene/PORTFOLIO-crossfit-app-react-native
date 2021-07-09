import React from 'react';
import {AuthProvider} from './src/routes/AuthProvider';
import {ThemeProvider} from 'styled-components';
// import {ThemeProvider} from 'react-native-elements';
import {theme} from './src/assets/styles/theme';

import Navigator from './src/routes/Navigator';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
