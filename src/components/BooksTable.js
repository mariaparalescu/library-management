import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th } from '@strapi/design-system/Table';
import { Box } from '@strapi/design-system';
import { Plus, Trash, Minus } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { IconButton } from '@strapi/design-system/IconButton';
import BooksModal from './BooksModal';
import { useData } from '../contexts/DataProvider';

const BooksTable = () => {
  const { data, removeBook, increaseBook, decreaseBook } = useData();
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const HEADERS = [
    'ID',
    'ISBN',
    'Title',
    'Author',
    'Price',
    'Copies',
    'Available',
    '',
  ];

  return (
    <Box padding={8} background="neutral100">
      <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<BooksModal />}>
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
          {data?.books?.map((entry, index) => (
            <Tr key={`row-${index}`}>
              <Td contenteditable="true">
                <Typography textColor="neutral800">{index}</Typography>
              </Td>
              <Td contenteditable="true">
                <Typography textColor="neutral800">{entry.isbn}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.title}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{entry.author}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {`${entry.price} RON`}
                </Typography>
              </Td>
              <Td style={{ display: 'flex', alignItem: 'center' }}>
                <IconButton
                  onClick={() => decreaseBook(entry.isbn)}
                  label="Remove a copy"
                  noBorder
                  icon={<Minus />}
                />
                <Typography paddingTop={5} textColor="neutral800">
                  {entry.copies}
                </Typography>
                <IconButton
                  onClick={() => increaseBook(entry.isbn)}
                  label="Add a copy"
                  noBorder
                  icon={<Plus />}
                />
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {entry.available}
                </Typography>
              </Td>
              <Td>
                <Flex>
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => removeBook(entry.isbn)}
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
export default BooksTable;
