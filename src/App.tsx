import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import config from './router/config'

function App() {
  return (
    <BrowserRouter>
      {renderRoutes(config)}
    </BrowserRouter>
  );
}

export default App;
