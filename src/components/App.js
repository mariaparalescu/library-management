import React, { Fragment } from 'react';
import NavBar from './NavBar';
import { ThemeProvider } from '@strapi/design-system/ThemeProvider';
import { lightTheme } from '@strapi/design-system/themes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ManageBooks from '../pages/ManageBooks';
import UsersTable from './UsersTable';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ThemeProvider theme={lightTheme}>
                            <NavBar />
                        </ThemeProvider>
                    }
                >
                    {/*<Route path="/" element={ <MinimalNabar />}>*/}
                    <Route index element={<div>Homepage</div>} />
                    <Route
                        path="books"
                        element={
                            <ThemeProvider theme={lightTheme}>
                                <ManageBooks />
                            </ThemeProvider>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <ThemeProvider theme={lightTheme}>
                                <UsersTable />
                            </ThemeProvider>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
