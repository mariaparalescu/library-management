import * as Yup from 'yup';

export const RentalFormSchema = Yup.object().shape({
  isbn: Yup.string().required('Required'),
  date: Yup.date()
    .min(new Date(), "The rental date can't be in the past")
    .required('Required'),
});
