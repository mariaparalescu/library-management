import React from 'react';
import NavBar from './NavBar';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { lightTheme } from '@strapi/design-system/themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManageBooks from '../pages/ManageBooks';
import UsersTable from './UsersTable';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<ManageBooks />} />
            <Route path="users" element={<UsersTable />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
