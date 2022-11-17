import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {DataProvider} from "./contexts/DataProvider";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DataProvider>
          <App />
      </DataProvider>
  </React.StrictMode>
);


