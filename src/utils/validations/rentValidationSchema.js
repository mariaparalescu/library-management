import * as Yup from 'yup';

let today = new Date();
today.setDate(today.getDate() - 1);

export const RentalFormSchema = Yup.object().shape({
  isbn: Yup.string().required('Required'),
  date: Yup.date()
    .min(today, "The rental date can't be in the past")
    .required('Required'),
});
