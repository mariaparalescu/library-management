import React, { useState } from 'react';
import {
  ModalLayout,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from '@strapi/design-system/ModalLayout';
import { Button, Typography, DatePicker } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { useData } from '../contexts/DataProvider';
import { useFormik } from 'formik';
import { IconButton } from '@strapi/design-system/IconButton';
import { Select, Option } from '@strapi/design-system/Select';
import { Stack } from '@strapi/design-system/Stack';
import { RentalFormSchema } from '../utils/validations/rentValidationSchema';

const RentalModal = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, rentBook } = useData();
  const [date, setDate] = useState();

  let today = new Date();
  today.setDate(today.getDate() - 1);

  const formik = useFormik({
    initialValues: {
      isbn: '',
      date: '',
    },
    validationSchema: RentalFormSchema,
    onSubmit: (values) => {
      if (formik.isValid) {
        rentBook(
          props.user.phoneNumber,
          formik.values.isbn,
          formik.values.date
        );
        setIsVisible((prev) => !prev);
      }
    },
  });

  return (
    <>
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
            {props.user.hasRentedBook ? (
              <div> A user can rent one book at a time</div>
            ) : (
              <form id="rental-form" onSubmit={formik.handleSubmit}>
                <Stack paddingBottom={6} spacing={11}>
                  <Select
                    id="isbn"
                    name="isbn"
                    label="Available books"
                    required
                    placeholder="Please select a book"
                    clearLabel="Clear"
                    error={formik.errors.isbn}
                    value={formik.values.isbn}
                    onChange={(e) => formik.setFieldValue('isbn', e)}
                    disabled={false}
                    startIcon={<Plus />}
                  >
                    {data.books.map(
                      (book) =>
                        book.available > 0 && (
                          <Option key={book.isbn} value={`${book.isbn}`}>
                            {`${book.title} - ${book.author}`}
                          </Option>
                        )
                    )}
                  </Select>
                </Stack>
                <DatePicker
                  onChange={(e) => formik.setFieldValue('date', e)}
                  selectedDate={date}
                  id="date"
                  name="date"
                  label="Date"
                  value={formik.values.date}
                  minDate={today}
                  error={
                    formik.touched.date && Boolean(formik.errors.date)
                      ? formik.errors.date
                      : ''
                  }
                  clearLabel={'Clear the datepicker'}
                  onClear={() => setDate(undefined)}
                  selectedDateLabel={(formattedDate) =>
                    `Date picker, current is ${formattedDate}`
                  }
                />
              </form>
            )}
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
