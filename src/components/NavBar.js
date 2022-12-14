import React, { useState } from 'react';
import {
  MainNav,
  NavSection,
  NavSections,
  NavCondense,
  NavBrand,
  NavUser,
  NavLink,
} from '@strapi/design-system/MainNav';
import { Divider, Box } from '@strapi/design-system';
import { Write, Book, User } from '@strapi/icons';

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
            <NavLink to="/" icon={<Book />}>
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
        <Outlet />
      </div>
    </Box>
  );
};

export default NavBar;
