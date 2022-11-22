import { actions } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.REMOVE_BOOK: {
      const isbn = action.isbn;
      const bookIndex = state.books.findIndex((book) => book.isbn === isbn);

      const books = [...state.books];
      if (books[bookIndex].available === books[bookIndex].copies) {
        books.splice(bookIndex, 1);
      }

      return { ...state, books };
    }

    case actions.ADD_BOOK: {
      return { ...state, books: [...state.books, action.book] };
    }

    case actions.INCREASE_BOOK_COPIES: {
      const isbn = action.isbn;
      const bookIndex = state.books.findIndex((book) => book.isbn === isbn);

      const books = [...state.books];
      books[bookIndex].copies++;
      books[bookIndex].available++;

      return { ...state, books };
    }

    case actions.DECREASE_BOOK_COPIES: {
      const isbn = action.isbn;
      const bookIndex = state.books.findIndex((book) => book.isbn === isbn);

      const books = [...state.books];
      if (books[bookIndex].available && books[bookIndex].copies > 0) {
        books[bookIndex].available--;
        books[bookIndex].copies--;
      }

      return { ...state, books };
    }

    case actions.ADD_USER: {
      return { ...state, users: [...state.users, action.user] };
    }

    case actions.REMOVE_USER: {
      const userIndex = state.users.findIndex(
        (user) => user.phoneNumber === action.phoneNumber
      );
      const users = [...state.users];
      if (!users[userIndex].hasRentedBook) {
        users.splice(userIndex, 1);
      }

      return { ...state, users };
    }

    case actions.RENT_BOOK: {
      const bookIndex = state.books.findIndex(
        (book) => `${book.isbn}` === action.isbn
      );
      const books = [...state.books];
      books[bookIndex].available--;

      const userIndex = state.users.findIndex(
        (user) => user.phoneNumber === action.phoneNumber
      );
      const users = [...state.users];
      if (!users[userIndex].hasRentedBook) {
        users[userIndex].startingDate = action.date;
        users[userIndex].hasRentedBook = true;
        users[userIndex].rentedBookIsbn = action.isbn;
        users[userIndex].rentedBookTitle = state.books[bookIndex].title;
        users[userIndex].hasToPay = state.books[bookIndex].price;
        users[userIndex].rentedBookAuthor = state.books[bookIndex].author;
      }
      return { ...state, users, books };
    }

    case actions.RETURN_BOOK: {
      const userIndex = state.users.findIndex(
        (user) => user.phoneNumber === action.phoneNumber
      );

      const books = [...state.books];
      if (state.users[userIndex].hasRentedBook) {
        const bookIndex = state.books.findIndex(
          (book) => `${book.isbn}` === state.users[userIndex].rentedBookIsbn
        );
        books[bookIndex].available++;
      }

      const users = [...state.users];

      if (users[userIndex].hasRentedBook) {
        users[userIndex].startingDate = '-';
        users[userIndex].hasToPay = 0;
        users[userIndex].hasRentedBook = false;
        users[userIndex].rentedBookIsbn = '';
        users[userIndex].rentedBookTitle = '';
        users[userIndex].rentedBookAuthor = '';
      }

      return { ...state, users, books };
    }

    default:
      return state;
  }
};
