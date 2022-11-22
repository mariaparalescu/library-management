import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { Box } from '@strapi/design-system';
import { Trash, Check } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import { useData } from '../contexts/DataProvider';
import AddUserModal from './AddUserModal';
import RentalModal from './RentalModal';

const UsersTable = () => {
  const { data, setData, removeUser, returnBook } = useData();
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const entries = [];
  const HEADERS = [
    'ID',
    'Name',
    'Surname',
    'Phone Number',
    'Rented Book',
    'Rental starting date',
    'Due to pay',
    'Rent',
    'Return',
    '',
  ];

  const getNewPrice = (difference, user) => {
    const penaltyDays = Math.ceil(difference) - 14;
    return user.hasToPay + user.hasToPay * 0.01 * penaltyDays;
  };

  const hasToPay = (user) => {
    const today = new Date();
    const startingDate = new Date(user.startingDate);
    const difference =
      (today.getTime() - startingDate.getTime()) / (1000 * 3600 * 24);
    if (difference > 14) {
      const newPrice = getNewPrice(difference, user);
      return newPrice.toFixed(2);
    }
    return false;
  };

  return (
    <Box padding={8} background="neutral100">
      <Table
        colCount={COL_COUNT}
        rowCount={ROW_COUNT}
        footer={<AddUserModal />}
      >
        <Thead>
          <Tr>
            {HEADERS.map((header) => (
              <Th key={header}>
                <Typography variant="sigma"> {header}</Typography>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.users?.map((entry, index) => (
            <Tr key={`row-${index}`}>
              <Td contenteditable="true">
                <Typography textColor="neutral800">{index}</Typography>
              </Td>
              <Td contenteditable="true">
                <Typography textColor="neutral800">{entry.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.surname}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.phoneNumber}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.hasRentedBook
                    ? `${entry.rentedBookTitle} - ${entry.rentedBookAuthor}`
                    : 'None'}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.hasRentedBook
                    ? entry.startingDate.toLocaleDateString('en-US')
                    : '-'}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {hasToPay(entry)
                    ? `${hasToPay(entry)} RON`
                    : `${entry.hasToPay} RON`}
                </Typography>
              </Td>
              <Td>
                <RentalModal user={entry} />
              </Td>
              <Td>
                <IconButton
                  onClick={() => {
                    returnBook(entry.phoneNumber);
                  }}
                  label="Return the book"
                  noBorder
                  icon={<Check />}
                />
              </Td>
              <Td>
                <Flex>
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => removeUser(entry.phoneNumber)}
                      label="Delete"
                      noBorder
                      icon={<Trash />}
                    />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
export default UsersTable;
