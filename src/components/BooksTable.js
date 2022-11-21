import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    TFooter,
} from '@strapi/design-system/Table';
import { Box } from '@strapi/design-system';
import { Plus, CarretDown, Pencil, Trash, Minus } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { IconButton } from '@strapi/design-system/IconButton';
import BooksModal from './BooksModal';
import { useData } from '../contexts/DataProvider';

const BooksTable = () => {
    const { data, setData } = useData();
    const ROW_COUNT = 6;
    const COL_COUNT = 10;
    const entries = [];

    const increaseCopies = (isbn) => {
        const bookIndex = data.books.findIndex((book) => book.isbn === isbn);
        const booksCopy = [...data.books];
        booksCopy[bookIndex].copies++;
        booksCopy[bookIndex].available++;
        return booksCopy;
    };
    const decreaseCopies = (isbn) => {
        const bookIndex = data.books.findIndex((book) => book.isbn === isbn);
        const booksCopy = [...data.books];
        if (booksCopy[bookIndex].available && booksCopy[bookIndex].copies > 0) {
            booksCopy[bookIndex].available--;
            booksCopy[bookIndex].copies--;
        }
        return booksCopy;
    };

    const deleteBookValidation = (isbn) => {
        const bookIndex = data.books.findIndex((book) => book.isbn === isbn);
        const booksCopy = [...data.books];
        if (booksCopy[bookIndex].available === booksCopy[bookIndex].copies) {
            booksCopy.pop(bookIndex);
        }
        return booksCopy;
    };

    const addBookCopy = (isbn) => {
        setData({ ...data, books: increaseCopies(isbn) });
    };

    const removeBookCopy = (isbn) => {
        setData({ ...data, books: decreaseCopies(isbn) });
    };

    const deleteBook = (isbn) => {
        setData({ ...data, books: deleteBookValidation(isbn) });
    };

    for (let i = 0; i < data.books.length; i++) {
        entries.push({ ...data.books[i], id: i });
    }

    return (
        <Box padding={8} background="neutral100">
            <Table
                colCount={COL_COUNT}
                rowCount={ROW_COUNT}
                footer={<BooksModal />}
            >
                <Thead>
                    <Tr>
                        <Th>
                            <BaseCheckbox aria-label="Select all entries" />
                        </Th>
                        <Th
                            action={
                                <IconButton
                                    label="Sort on ID"
                                    icon={<CarretDown />}
                                    noBorder
                                />
                            }
                        >
                            <Typography variant="sigma">ID</Typography>
                        </Th>
                        <Th
                            action={
                                <IconButton
                                    label="Sort on ISBN"
                                    icon={<CarretDown />}
                                    noBorder
                                />
                            }
                        >
                            <Typography variant="sigma">ISBN</Typography>
                        </Th>
                        <Th
                            action={
                                <IconButton
                                    label="Sort on ID"
                                    icon={<CarretDown />}
                                    noBorder
                                />
                            }
                        >
                            <Typography variant="sigma">Title</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Author</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Price</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Copies</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Available</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma"></Typography>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {entries.map((entry) => (
                        <Tr key={entry.id}>
                            <Td>
                                <BaseCheckbox
                                    aria-label={`Select ${entry.contact}`}
                                />
                            </Td>
                            <Td contenteditable="true">
                                <Typography textColor="neutral800">
                                    {entry.id}
                                </Typography>
                            </Td>
                            <Td contenteditable="true">
                                <Typography textColor="neutral800">
                                    {entry.isbn}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.title}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.author}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {`${entry.price} RON`}
                                </Typography>
                            </Td>
                            <Td
                                style={{ display: 'flex', alignItem: 'center' }}
                            >
                                <IconButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        removeBookCopy(entry.isbn);
                                    }}
                                    label="Remove a copy"
                                    noBorder
                                    icon={<Minus />}
                                />
                                <Typography
                                    paddingTop={5}
                                    textColor="neutral800"
                                >
                                    {entry.copies}
                                </Typography>
                                <IconButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addBookCopy(entry.isbn);
                                    }}
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
                                    <IconButton
                                        onClick={() => console.log('edit')}
                                        label="Edit"
                                        noBorder
                                        icon={<Pencil />}
                                    />
                                    <Box paddingLeft={1}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteBook(entry.isbn);
                                            }}
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
