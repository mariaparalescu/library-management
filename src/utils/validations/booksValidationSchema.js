import * as Yup from 'yup';

const BookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'The title should be at least 2 characters long')
    .max(50, "The title should have maximum 50 characters'")
    .matches(
      /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
      "The title can contain only letters, spaces and these special characters: ' and - "
    )
    .required('Required'),
  author: Yup.string()
    .min(2, 'The author should be at least 2 characters long')
    .max(50, "The author should have maximum 50 characters'")
    .matches(
      /^([ \u00c0-\u01ffa-zA-Z'\-])+$/,
      "The author can contain only letters, spaces and these special characters: ' and - "
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
});

export default BookValidationSchema;
