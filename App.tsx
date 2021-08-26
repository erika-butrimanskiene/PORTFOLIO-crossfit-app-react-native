import React from 'react';
import {ThemeProvider} from 'styled-components';
import {theme} from './src/assets/styles/theme';
import Navigator from './src/routes/Navigator';
import {Provider} from 'react-redux';
import {configStore} from './src/state/store';
import CustomisableAlert from 'react-native-customisable-alert';
import {PersistGate} from 'redux-persist/integration/react';

const {store, persistor} = configStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Navigator />

          <CustomisableAlert
            titleStyle={{
              fontSize: 18,
              fontWeight: 'bold',
            }}
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
