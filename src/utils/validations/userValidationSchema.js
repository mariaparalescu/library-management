import * as Yup from 'yup';

const UserValidationSchema = Yup.object().shape({
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

export default UserValidationSchema;
