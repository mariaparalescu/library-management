import React from 'react';
import UsersTable from '../components/UsersTable';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

const ManageUsers = () => {
  return (
    <>
      <BaseHeaderLayout
        padding={2}
        title="Users and Rentals Management"
        as="h2"
      />
      <UsersTable />
    </>
  );
};

export default ManageUsers;
