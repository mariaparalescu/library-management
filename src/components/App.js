import React, {Fragment} from 'react';
import NavBar from './NavBar';
import {ThemeProvider} from "@strapi/design-system/ThemeProvider"
import {lightTheme} from "@strapi/design-system/themes"
import {Crumb, Breadcrumbs, Box} from '@strapi/design-system';
import { BaseHeaderLayout, HeaderLayout } from '@strapi/design-system/Layout';

function App (){
    return(
        <Fragment>
            <ThemeProvider theme={lightTheme}>
                    <NavBar />
            </ThemeProvider>
        </Fragment>

    );
}

export default App;