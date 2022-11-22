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
import UserValidationSchema from '../utils/validations/userValidationSchema';

const AddUserModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data, addUser } = useData();

  const phoneNumberIsUnique = (phoneNumber) => {
    const phoneNumberArr = data.users.map((user) => user.phoneNumber);
    return !phoneNumberArr.includes(phoneNumber);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phoneNumber: '',
    },
    validationSchema: UserValidationSchema,
    onSubmit: (values) => {
      if (formik.isValid && phoneNumberIsUnique(formik.values.phoneNumber)) {
        const newUser = {
          ...values,
          hasRentedBook: false,
          startingDate: '-',
          hasToPay: 0,
          rentedBookIsbn: '',
        };
        addUser(newUser);
        setIsVisible((prev) => !prev);
      }
    },
  });

  return (
    <>
      <TFooter onClick={() => setIsVisible((prev) => !prev)} icon={<Plus />}>
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
              Add a new user
            </Typography>
          </ModalHeader>
          <ModalBody>
            <form id="user-form" onSubmit={formik.handleSubmit}>
              <Box paddingTop={2} paddingBottom={2}>
                <TextInput
                  id="name"
                  name="name"
                  label="Name"
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                      ? formik.errors.name
                      : ''
                  }
                  placeholder="Name"
                  required
                  hint="Example: Jon"
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
                    formik.touched.surname && Boolean(formik.errors.surname)
                      ? formik.errors.surname
                      : ''
                  }
                  placeholder="Surname"
                  hint="Example: Smith"
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
                      : phoneNumberIsUnique(formik.values.phoneNumber)
                      ? ''
                      : "There's already a user registered with this phone number. The phone number must be unique!"
                  }
                  required
                  placeholder="Phone number"
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
