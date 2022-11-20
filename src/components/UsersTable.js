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
import { Plus, CarretDown, Pencil, Trash } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { IconButton } from '@strapi/design-system/IconButton';
import BooksModal from './BooksModal';
import { useData } from '../contexts/DataProvider';
import AddUserModal from './AddUserModal';

const UsersTable = () => {
    const { data, setData } = useData();
    const ROW_COUNT = 6;
    const COL_COUNT = 10;
    const entries = [];

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
                            <Typography variant="sigma">Has a book</Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">
                                Rental starting day
                            </Typography>
                        </Th>
                        <Th>
                            <Typography variant="sigma">Due to pay</Typography>
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
                                    {`${entry.hasRentedBook}`}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.startingDate}
                                </Typography>
                            </Td>
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.hasToPay}
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
                                            onClick={() =>
                                                console.log('delete')
                                            }
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
