import React, { useState } from 'react';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Button, Typography, Box } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { TFooter } from '@strapi/design-system/Table';
import { useData } from '../contexts/DataProvider';
import { useFormik } from 'formik';
import { TextInput } from '@strapi/design-system/TextInput';
import { Tooltip } from '@strapi/design-system/Tooltip';
import BookFormSchema from '../utils/validations/booksValidationSchema';

const AddBookModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, addBook } = useData();

  const isbnIsUnique = (isbn) => {
    const isbnArr = data.books.map((book) => book.isbn);
    return !isbnArr.includes(isbn);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      price: '',
      isbn: '',
    },
    validationSchema: BookFormSchema,
    onSubmit: (values) => {
      if (formik.isValid && isbnIsUnique(formik.values.isbn)) {
        addBook({ ...values, copies: 1, available: 1 });
        setIsVisible((prev) => !prev);
      }
    },
  });

  return (
    <>
      <TFooter onClick={() => setIsVisible((prev) => !prev)} icon={<Plus />}>
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
            <form id="book-form" onSubmit={formik.handleSubmit}>
              <Box paddingTop={2} paddingBottom={2}>
                <TextInput
                  id="title"
                  name="title"
                  label="Title"
                  error={
                    formik.touched.title && Boolean(formik.errors.title)
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
                  label="Author"
                  error={
                    formik.touched.author && Boolean(formik.errors.author)
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
                  label="Price"
                  error={
                    formik.touched.price && Boolean(formik.errors.price)
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
                  label="ISBN"
                  error={
                    formik.touched.isbn && Boolean(formik.errors.isbn)
                      ? formik.errors.isbn
                      : isbnIsUnique(formik.values.isbn)
                      ? ''
                      : 'This isbn is already used. The isbn must be unique!'
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
  );
};

export default AddBookModal;
