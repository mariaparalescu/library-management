import React, {Fragment} from 'react';
import NavBar from './NavBar';
import {ThemeProvider} from "@strapi/design-system/ThemeProvider"
import {lightTheme} from "@strapi/design-system/themes"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import BooksTable from "./BooksTable";
import MinimalNabar from "./MinimalNabar";
import {Crumb, Breadcrumbs, Box} from '@strapi/design-system';
import { BaseHeaderLayout, HeaderLayout } from '@strapi/design-system/Layout';

function App (){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <ThemeProvider theme={lightTheme}>
                                            <NavBar />
                                          </ThemeProvider>}
                >
                {/*<Route path="/" element={ <MinimalNabar />}>*/}
                   <Route index element={<div>Homepage</div>}/>
                   <Route path="books" element={<ThemeProvider theme={lightTheme}><BooksTable /></ThemeProvider>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;