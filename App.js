import React from 'react';
import {AuthProvider} from './src/routes/AuthProvider';

import Navigator from './src/routes/Navigator';

const App = () => {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  );
};

export default App;
