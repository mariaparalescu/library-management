import React from 'react';
import BooksTable from '../components/BooksTable';
import { BaseHeaderLayout } from '@strapi/design-system/Layout';

const ManageBooks = () => {
  return (
    <>
      <BaseHeaderLayout padding={2} title="Books management" as="h2" />
      <BooksTable />
    </>
  );
};

export default ManageBooks;
