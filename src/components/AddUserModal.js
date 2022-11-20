import React, { useState } from 'react';
import {
    ModalLayout,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Button, Typography, DatePicker, Box } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { TFooter } from '@strapi/design-system/Table';
import { useData } from '../contexts/DataProvider';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from '@strapi/design-system/TextInput';
import { Tooltip } from '@strapi/design-system/Tooltip';

const AddUserModal = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const { data, setData } = useData();

    const UserFormSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'The name should be at least 2 characters long')
            .max(50, "The name should have maximum 50 characters'")
            .matches(
                /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
                "The name can contain only letters, spaces and these special characters: ' and - "
            )
            .required('Required'),
        surname: Yup.string()
            .min(2, 'The surname should be at least 2 characters long')
            .max(50, "The surname should have maximum 50 characters'")
            .matches(
                /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
                "The surname can contain only letters, spaces and these special characters: ' and - "
            )
            .required('Required'),
        phoneNumber: Yup.string()
            .length(10, 'The phone number must be 10 digits long')
            .matches(/^\d+$/, 'The phone number can contain only digits ')
            .required('Required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            phoneNumber: '',
        },
        validationSchema: UserFormSchema,
        onSubmit: (values) => {
            if (formik.isValid) {
                const newUser = {
                    ...values,
                    hasRentedBook: false,
                    startingDate: '-',
                    hasToPay: '-',
                };
                setData({ ...data, users: [...data.users, newUser] });
                setIsVisible((prev) => !prev);
            }
        },
    });

    return (
        <>
            <TFooter
                onClick={() => setIsVisible((prev) => !prev)}
                icon={<Plus />}
            >
                Add a new user
            </TFooter>
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
                            Add a new book
                        </Typography>
                    </ModalHeader>
                    <ModalBody>
                        {/*<DatePicker onChange={setDate} selectedDate={date} label="Date picker" name="datepicker" clearLabel={'Clear the datepicker'} onClear={() => setDate(undefined)} selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`} />*/}
                        <form id="user-form" onSubmit={formik.handleSubmit}>
                            <Box paddingTop={2} paddingBottom={2}>
                                <TextInput
                                    id="name"
                                    name="name"
                                    label="Name"
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                            ? formik.errors.name
                                            : ''
                                    }
                                    placeholder="Book title"
                                    required
                                    hint="Example: Romeo and Juliet"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    labelAction={
                                        <Tooltip description="Content of the tooltip">
                                            <button
                                                aria-label="Information about the email"
                                                style={{
                                                    border: 'none',
                                                    padding: 0,
                                                    background: 'transparent',
                                                }}
                                            ></button>
                                        </Tooltip>
                                    }
                                />
                            </Box>
                            <Box paddingTop={2} paddingBottom={2}>
                                <TextInput
                                    id="surname"
                                    name="surname"
                                    label="Surname"
                                    required
                                    error={
                                        formik.touched.surname &&
                                        Boolean(formik.errors.surname)
                                            ? formik.errors.surname
                                            : ''
                                    }
                                    placeholder="Book author"
                                    hint="Example: William Shakespeare"
                                    value={formik.values.surname}
                                    onChange={formik.handleChange}
                                    labelAction={
                                        <Tooltip description="Content of the tooltip">
                                            <button
                                                aria-label="Information about the email"
                                                style={{
                                                    border: 'none',
                                                    padding: 0,
                                                    background: 'transparent',
                                                }}
                                            ></button>
                                        </Tooltip>
                                    }
                                />
                            </Box>
                            <Box paddingTop={2} paddingBottom={2}>
                                <TextInput
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    label="Phone Number"
                                    error={
                                        formik.touched.phoneNumber &&
                                        Boolean(formik.errors.phoneNumber)
                                            ? formik.errors.phoneNumber
                                            : ''
                                    }
                                    required
                                    placeholder="Rental price"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    labelAction={
                                        <Tooltip description="Content of the tooltip">
                                            <button
                                                aria-label="Information about the email"
                                                style={{
                                                    border: 'none',
                                                    padding: 0,
                                                    background: 'transparent',
                                                }}
                                            ></button>
                                        </Tooltip>
                                    }
                                />
                            </Box>
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
                                <Button form="user-form" type="submit">
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

export default AddUserModal;
