import React from 'react';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/assets/styles/theme';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import {configStore} from './src/state/store';
import CustomisableAlert from 'react-native-customisable-alert';

const {store, persistor} = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Navigator />
        <CustomisableAlert
          titleStyle={{
            fontSize: 18,
            fontWeight: 'bold',
          }}
        />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
