import React, { useState } from 'react'
import {
    ModalLayout,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from '@strapi/design-system/ModalLayout'
import { Button, Typography, DatePicker, Box } from '@strapi/design-system'
import { Plus } from '@strapi/icons'
import { TFooter } from '@strapi/design-system/Table'
import { useData } from '../contexts/DataProvider'
import { Formik, Form, Field, useFormik } from 'formik'
import * as Yup from 'yup'
import { TextInput } from '@strapi/design-system/TextInput'
import { Tooltip } from '@strapi/design-system/Tooltip'

const Modal = (props) => {
    const [isVisible, setIsVisible] = useState(false)
    const { data, setData } = useData()

    const BookFormSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'The title should be at least 2 characters long')
            .max(50, "The title should have maximum 50 characters'")
            .matches(
                /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
                "The name can contain only letters, spaces and these special characters: ' and - "
            )
            .required('Required'),
        author: Yup.string()
            .min(2, 'The title should be at least 2 characters long')
            .max(50, "The title should have maximum 50 characters'")
            .matches(
                /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
                "The name can contain only letters, spaces and these special characters: ' and - "
            )
            .required('Required'),
        price: Yup.number()
            .positive()
            .min(0.1, 'The price should be greater than 0')
            .required('Required'),
        isbn: Yup.string()
            .matches(
                /978[0-9]{10}/,
                'The number should start with 978 and should have the length 13'
            )
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            price: '',
            isbn: '',
        },
        validationSchema: BookFormSchema,
        onSubmit: (values) => {
            if (formik.isValid) {
                console.log(data)
                const newBook = { ...values, copies: 1, available: 1 }
                setData({ ...data, books: [...data.books, newBook] })
                setIsVisible((prev) => !prev)
            }
        },
    })

    return (
        <>
            <TFooter
                onClick={() => setIsVisible((prev) => !prev)}
                icon={<Plus />}
            >
                Add a new book
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
                        <form id="book-form" onSubmit={formik.handleSubmit}>
                            <Box paddingTop={2} paddingBottom={2}>
                                <TextInput
                                    id="title"
                                    name="title"
                                    label="title"
                                    error={
                                        formik.touched.title &&
                                        Boolean(formik.errors.title)
                                            ? formik.errors.title
                                            : ''
                                    }
                                    placeholder="Book title"
                                    required
                                    hint="Example: Romeo and Juliet"
                                    value={formik.values.title}
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
                                    id="author"
                                    name="author"
                                    label="author"
                                    error={
                                        formik.touched.author &&
                                        Boolean(formik.errors.author)
                                            ? formik.errors.author
                                            : ''
                                    }
                                    placeholder="Book author"
                                    hint="Example: William Shakespeare"
                                    value={formik.values.author}
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
                                    id="price"
                                    name="price"
                                    label="price"
                                    error={
                                        formik.touched.price &&
                                        Boolean(formik.errors.price)
                                            ? formik.errors.price
                                            : ''
                                    }
                                    type="number"
                                    required
                                    placeholder="Rental price"
                                    value={formik.values.price}
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
                                    id="isbn"
                                    name="isbn"
                                    label="isbn"
                                    error={
                                        formik.touched.isbn &&
                                        Boolean(formik.errors.isbn)
                                            ? formik.errors.isbn
                                            : ''
                                    }
                                    type="number"
                                    required
                                    placeholder="ISBN"
                                    hint="Please introduce a 13 digit number that starts with 978"
                                    value={formik.values.isbn}
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
                                <Button form="book-form" type="submit">
                                    Finish
                                </Button>
                            </>
                        }
                    />
                </ModalLayout>
            )}
        </>
    )
}

export default Modal
