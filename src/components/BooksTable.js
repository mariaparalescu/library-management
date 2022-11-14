import React from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system/Table';
import { Box } from '@strapi/design-system';
import {Plus, CarretDown, Pencil, Trash } from '@strapi/icons';
import { Typography } from '@strapi/design-system/Typography';
import { Flex } from '@strapi/design-system/Flex';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { Avatar } from '@strapi/design-system';
import { IconButton } from '@strapi/design-system/IconButton';
import Modal from "./Modal";


const BooksTable = () => {
        const ROW_COUNT = 6;
        const COL_COUNT = 10;
        const entry = {
            cover: 'https://avatars.githubusercontent.com/u/3874873?v=4',
            description: 'Chez Léon is a human sized Parisian',
            category: 'French cuisine',
            contact: 'Leon Lafrite'
        };
        const entries = [];

        for (let i = 0; i < 5; i++) {
            entries.push({ ...entry,
                id: i
            });
        }

        return <Box padding={8} background="neutral100">
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter onClick={(e)=>{e.preventDefault(); console.log('plm')}} icon={<Plus />}>Add a new book</TFooter>}>
                <Thead>
                    <Tr>
                        <Th>
                            <BaseCheckbox aria-label="Select all entries" />
                        </Th>
                        <Th action={<IconButton label="Sort on ID" icon={<CarretDown />} noBorder />}>
                            <Typography variant="sigma">ISBN</Typography>
                        </Th>
                        <Th action={<IconButton label="Sort on ID" icon={<CarretDown />} noBorder />}>
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
                    {entries.map(entry => <Tr key={entry.id}>
                        <Td>
                            <BaseCheckbox aria-label={`Select ${entry.contact}`} />
                        </Td>
                        <Td contenteditable='true'>
                            <Typography textColor="neutral800">{entry.id}</Typography>
                        </Td>
                        <Td>
                            <Avatar src={entry.cover} alt={entry.contact} />
                        </Td>
                        <Td>
                            <Typography textColor="neutral800">{entry.description}</Typography>
                        </Td>
                        <Td>
                            <Typography textColor="neutral800">{entry.category}</Typography>
                        </Td>
                        <Td>
                            <Typography textColor="neutral800">{entry.contact}</Typography>
                        </Td>
                        <Td>
                            <Flex>
                                <IconButton onClick={() => console.log('edit')} label="Edit" noBorder icon={<Pencil />} />
                                <Box paddingLeft={1}>
                                    <IconButton onClick={() => console.log('delete')} label="Delete" noBorder icon={<Trash />} />
                                </Box>
                            </Flex>
                        </Td>
                    </Tr>)}
                </Tbody>
            </Table>
            <Modal />
        </Box>;
}
export default BooksTable;