import React, { Fragment, useState } from 'react';
import {
  MainNav,
  NavSection,
  NavSections,
  NavCondense,
  NavBrand,
  NavUser,
  NavLink,
} from '@strapi/design-system/MainNav';
import { Divider, Box, Breadcrumbs, Crumb } from '@strapi/design-system';
import { Write, Layer, Book, Archive, User, Dashboard } from '@strapi/icons';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

import { Outlet } from 'react-router-dom';

const NavBar = () => {
  const [condensed, setCondensed] = useState(false);
  return (
    <Box
      background="neutral100"
      style={{
        height: '100vh',
        display: 'flex',
      }}
    >
      <MainNav condensed={condensed}>
        <NavBrand
          style={{ padding: '1rem' }}
          workplace="Workplace"
          title="Library dashboard"
          icon={<Write />}
        />
        <Divider />
        <NavSections>
          <NavSection label="Categories">
            <NavLink to="/books" icon={<Book />}>
              Books
            </NavLink>
            <NavLink to="/users" icon={<User />}>
              Users
            </NavLink>
          </NavSection>
        </NavSections>
        <NavUser
          src="https://avatars.githubusercontent.com/u/3874873?v=4"
          to="/somewhere-i-belong"
        >
          Admin
        </NavUser>
        <NavCondense onClick={() => setCondensed((s) => !s)}>
          {condensed ? 'Expanded the navbar' : 'Collapse the navbar'}
        </NavCondense>
      </MainNav>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <BaseHeaderLayout padding={2} title="Media Library" as="h2" />
        <Outlet />
      </div>
    </Box>
  );
};

export default NavBar;
