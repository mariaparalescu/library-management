import { createContext, useContext, useReducer, useState } from 'react';
import { actions, initialState } from './actions';
import { reducer } from './reducers';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    data: state,
    removeBook: (isbn) => dispatch({ type: actions.REMOVE_BOOK, isbn }),
    addBook: (book) => dispatch({ type: actions.ADD_BOOK, book }),
    increaseBook: (isbn) =>
      dispatch({ type: actions.INCREASE_BOOK_COPIES, isbn }),
    decreaseBook: (isbn) =>
      dispatch({ type: actions.DECREASE_BOOK_COPIES, isbn }),
    addUser: (user) => dispatch({ type: actions.ADD_USER, user }),
    removeUser: (phoneNumber) =>
      dispatch({ type: actions.REMOVE_USER, phoneNumber }),
    rentBook: (phoneNumber) =>
      dispatch({ type: actions.RENT_BOOK, phoneNumber }),
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};
