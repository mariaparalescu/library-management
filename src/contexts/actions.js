export const initialState = {
  books: [
    {
      isbn: 9783161484100,
      title: 'Booky',
      author: 'Lala',
      price: 6,
      copies: 1,
      available: 1,
    },
    {
      isbn: 9783161484101,
      title: 'Paine si vin',
      author: 'Charles Bukovskyite',
      price: 6,
      copies: 1,
      available: 1,
    },
  ],
  users: [
    {
      name: 'Carrie',
      surname: 'Bradshaw',
      phoneNumber: '0723232323',
      hasRentedBook: false,
      startingDate: '-',
      hasToPay: 0,
      rentedBookIsbn: '',
      rentedBookTitle: '',
      rentedBookAuthor: '',
    },
    {
      name: 'Charlotte',
      surname: 'York',
      phoneNumber: '0723232321',
      hasRentedBook: false,
      startingDate: '-',
      hasToPay: 0,
      rentedBookIsbn: '',
      rentedBookTitle: '',
      rentedBookAuthor: '',
    },
  ],
};

export const actions = {
  ADD_BOOK: 'ADD_BOOK',
  REMOVE_BOOK: 'REMOVE_BOOK',
  ADD_USER: 'ADD_USER',
  REMOVE_USER: 'REMOVE_USER',
  RENT_BOOK: 'RENT_BOOK',
  RETURN_BOOK: 'RETURN_BOOK',
  INCREASE_BOOK_COPIES: 'INCREASE_BOOK_COPIES',
  DECREASE_BOOK_COPIES: 'DECREASE_BOOK_COPIES',
};
