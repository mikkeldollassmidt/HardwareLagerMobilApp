// App.js (or your root file)
import React from 'react';
import { AuthProvider } from '../components/Helpers/AuthContext';
import Home from '../app/(tabs)/_layout';  

const App = () => {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
};

export default App;
