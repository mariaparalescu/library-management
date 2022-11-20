import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Th,
    TFooter,
} from '@strapi/design-system/Table'
import { Box } from '@strapi/design-system'
import { Plus, CarretDown, Pencil, Trash } from '@strapi/icons'
import { Typography } from '@strapi/design-system/Typography'
import { Flex } from '@strapi/design-system/Flex'
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox'
import { IconButton } from '@strapi/design-system/IconButton'
import Modal from './Modal'
import { useData } from '../contexts/DataProvider'

const BooksTable = () => {
    const { data, setData } = useData()
    const ROW_COUNT = 6
    const COL_COUNT = 10
    const entry = {
        isbn: 9781234567891234,
        title: 'Booky',
        author: 'Lala',
        price: '5',
        copies: 1,
        available: 1,
    }
    const entries = []

    console.log('===', data.books.length, data)

    for (let i = 0; i < data.books.length; i++) {
        entries.push({ ...data.books[i], id: i })
    }

    return (
        <Box padding={8} background="neutral100">
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<Modal />}>
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
                            <Td>
                                <Typography textColor="neutral800">
                                    {entry.copies}
                                </Typography>
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
    )
}
export default BooksTable
