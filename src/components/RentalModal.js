import React, { useState } from 'react';
import {
    ModalLayout,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Button, Typography, DatePicker, Box } from '@strapi/design-system';
import { Check, Pencil, Plus, Trash } from '@strapi/icons';
import { useData } from '../contexts/DataProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '@strapi/design-system/TextInput';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { IconButton } from '@strapi/design-system/IconButton';
import { Select, Option } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { Td, Tr } from '@strapi/design-system/Table';
import { BaseCheckbox } from '@strapi/design-system/BaseCheckbox';
import { Flex } from '@strapi/design-system/Flex';

const RentalModal = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const { data, setData } = useData();
    const [date, setDate] = useState();
    const [value, setValue] = useState();
    const [error, toggleError] = useState();
    const [disabled, toggleDisabled] = useState();

    let today = new Date();

    const RentalFormSchema = Yup.object().shape({
        isbn: Yup.string().required('Required'),
        date: Yup.date()
            .min(today, "The rental date can't be in the past")
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            isbn: '',
            date: '',
        },
        validationSchema: RentalFormSchema,
        onSubmit: (values) => {
            if (formik.isValid) {
                const newUser = {
                    ...values,
                    hasRentedBook: false,
                    startingDate: '-',
                    hasToPay: '-',
                    rentedBookIsbn: '',
                };
                setData({ ...data, users: [...data.users, newUser] });
                setIsVisible((prev) => !prev);
            }
        },
    });

    return (
        <>
            {console.log(formik)}
            <IconButton
                onClick={() => setIsVisible((prev) => !prev)}
                label="Rent a book"
                noBorder
                icon={<Plus />}
            />
            {isVisible && (
                <ModalLayout
                    onClose={() => setIsVisible((prev) => !prev)}
                    labelledBy="title"
                >
                    <ModalHeader>
                        <Typography
                            fontWeight="bold"
                            textColor="neutral800"
                            as="h2"
                            id="title"
                        >
                            Rent a book
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                        <form id="rental-form" onSubmit={formik.handleSubmit}>
                            <Stack paddingBottom={6} spacing={11}>
                                {console.log(formik)}
                                <Select
                                    id="isbn"
                                    name="isbn"
                                    label="Available books"
                                    required
                                    placeholder="Please select a book"
                                    hint=""
                                    onClear={() => setValue(undefined)}
                                    clearLabel="Clear"
                                    error={formik.errors.isbn}
                                    value={formik.values.isbn}
                                    onChange={(e) =>
                                        formik.setFieldValue('isbn', e)
                                    }
                                    disabled={disabled}
                                    startIcon={<Plus />}
                                >
                                    {data.books.map((book) => {
                                        if (book.available > 0) {
                                            return (
                                                <Option
                                                    key={book.isbn}
                                                    value={`${book.isbn}`}
                                                >
                                                    {book.title} - {book.author}
                                                </Option>
                                            );
                                        }
                                    })}
                                </Select>
                            </Stack>
                            <DatePicker
                                onChange={(e) =>
                                    formik.setFieldValue('date', e)
                                }
                                selectedDate={date}
                                id="date"
                                name="date"
                                label="Date"
                                value={formik.values.date}
                                minDate={today}
                                error={
                                    formik.touched.date &&
                                    Boolean(formik.errors.date)
                                        ? formik.errors.date
                                        : ''
                                }
                                clearLabel={'Clear the datepicker'}
                                onClear={() => setDate(undefined)}
                                selectedDateLabel={(formattedDate) =>
                                    `Date picker, current is ${formattedDate}`
                                }
                            />
                            {console.log('===date', date)}
                        </form>
                    </ModalBody>
                    <ModalFooter
                        startActions={
                            <Button
                                onClick={() => setIsVisible((prev) => !prev)}
                                variant="tertiary"
                            >
                                Cancel
                            </Button>
                        }
                        endActions={
                            <>
                                <Button form="rental-form" type="submit">
                                    Finish
                                </Button>
                            </>
                        }
                    />
                </ModalLayout>
            )}
        </>
    );
};

export default RentalModal;
