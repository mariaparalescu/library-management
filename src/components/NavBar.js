import React, {Fragment, useState} from 'react';
import {
    MainNav,
    NavSection,
    NavSections,
    NavCondense,
    NavBrand,
    NavUser,
    NavLink,
} from '@strapi/design-system/MainNav';
import {Divider, Box, Breadcrumbs, Crumb} from '@strapi/design-system';
import {Write, Layer, Landscape, Information, Puzzle, ShoppingCart, Cog} from '@strapi/icons';
import {BaseHeaderLayout} from "@strapi/design-system/Layout";

const NavBar = () => {
    const [condensed, setCondensed] = useState(false);
    return <Box background="neutral100"  style={{
        height: '100vh', display: 'flex'
    }}>
        <MainNav condensed={condensed}>
            <NavBrand workplace="Workplace" title="Library dashboard" icon={<i className="book icon violet"></i>} />
            <Divider />
            <NavSections>
                <NavLink to="/laa" icon={<Write />} className="active">
                    Home
                </NavLink>
                <NavSection label="Books">
                    <NavLink to="/" icon={<Layer />}>
                        Builder
                    </NavLink>
                    <NavLink to="/content" icon={<Landscape />}>
                        Media library
                    </NavLink>
                    <NavLink to="/content" icon={<Information />}>
                        Documentation
                    </NavLink>
                </NavSection>
                <NavSection label="Users">
                    <NavLink to="/builder" icon={<Puzzle />}>
                        Plugins
                    </NavLink>
                    <NavLink to="/content" icon={<ShoppingCart />}>
                        Marketplace
                    </NavLink>
                    <NavLink to="/content" icon={<Cog />}>
                        Settings
                    </NavLink>
                </NavSection>
            </NavSections>
            <NavUser src="https://avatars.githubusercontent.com/u/3874873?v=4" to="/somewhere-i-belong">
                Admin
            </NavUser>
            <NavCondense onClick={() => setCondensed(s => !s)}>
                {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
            </NavCondense>
        </MainNav>
            <BaseHeaderLayout title="Media Library" subtitle={<Breadcrumbs label="folders">
                <Crumb>Animals</Crumb>
                <Crumb>Cats</Crumb>
            </Breadcrumbs>} as="h2" />
    </Box>;
}

export default NavBar;