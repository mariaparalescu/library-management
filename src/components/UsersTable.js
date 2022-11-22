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
import { Plus, CarretDown, Pencil, Trash, Minus, Check } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { IconButton } from '@strapi/design-system/IconButton';
import BooksModal from './BooksModal';
import { useData } from '../contexts/DataProvider';
import AddUserModal from './AddUserModal';
import RentalModal from './RentalModal';

const UsersTable = () => {
    const { data, setData } = useData();
    const ROW_COUNT = 6;
    const COL_COUNT = 10;
    const entries = [];

    const updateUsers = (phoneNumber) => {
        const userIndex = data.users.findIndex(
            (user) => user.phoneNumber === phoneNumber
        );
        const usersCopy = [...data.users];
        if (usersCopy[userIndex].hasRentedBook) {
            usersCopy[userIndex].startingDate = '-';
            usersCopy[userIndex].hasRentedBook = false;
            usersCopy[userIndex].rentedBookIsbn = '';
            usersCopy[userIndex].rentedBookTitle = '';
            usersCopy[userIndex].rentedBookAuthor = '';
        }
        return usersCopy;
    };

    const updateBooksAvailability = (phoneNumber) => {
        const userIndex = data.users.findIndex(
            (user) => user.phoneNumber === phoneNumber
        );
        const booksCopy = [...data.books];
        if (data.users[userIndex].hasRentedBook) {
            const bookIndex = data.books.findIndex(
                (book) =>
                    `${book.isbn}` === data.users[userIndex].rentedBookIsbn
            );
            booksCopy[bookIndex].available++;
        }
        return booksCopy;
    };

    const deleteUserValidation = (phoneNumber) => {
        const userIndex = data.users.findIndex(
            (user) => user.phoneNumber === phoneNumber
        );
        const usersCopy = [...data.users];
        if (!usersCopy[userIndex].hasRentedBook) {
            usersCopy.splice(userIndex, 1);
        }
        return usersCopy;
    };

    const returnBook = (user) => {
        setData({
            ...data,
            books: updateBooksAvailability(user.phoneNumber),
            users: updateUsers(user.phoneNumber),
        });
    };

    const deleteUser = (phoneNumber) => {
        setData({ ...data, users: deleteUserValidation(phoneNumber) });
    };

    for (let i = 0; i < data.users.length; i++) {
        entries.push({ ...data.users[i], id: i });
    }

    return (
        <Box padding={8} background="neutral100">
            <Table
                colCount={COL_COUNT}
                rowCount={ROW_COUNT}
                footer={<AddUserModal />}
            >
                <Thead>
                    <Tr>
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
                            <Typography variant="sigma">Name</Typography>
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
                            <Typography variant="sigma">Surname</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                Phone Number
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Rented Book</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                Rental starting date
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Due to pay</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Rent</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Return</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma"></Typography>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {entries.map((entry) => (
                        <Tr key={entry.id}>
                            <Td contenteditable="true">
                                <Typography textColor="neutral800">
                                    {entry.id}
                                </Typography>
                            </Td>
                            <Td contenteditable="true">
                                <Typography textColor="neutral800">
                                    {entry.name}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.surname}
                                </Typography>
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
                                    {JSON.stringify(entry.startingDate)}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {`${entry.hasToPay} RON`}
                                </Typography>
                            </Td>
                            <Td>
                                <RentalModal user={entry} />
                            </Td>
                            <Td>
                                <IconButton
                                    onClick={(e) => {
                                        e.preventDefault();
                                        returnBook(entry);
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
                                            onClick={(e) => {
                                                e.preventDefault();
                                                deleteUser(entry.phoneNumber);
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
export default UsersTable;
