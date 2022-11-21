import { createContext, useContext, useState } from 'react';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
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
            },
            {
                name: 'Charlotte',
                surname: 'York',
                phoneNumber: '0723232321',
                hasRentedBook: false,
                startingDate: '-',
                hasToPay: 0,
                rentedBookIsbn: '',
            },
        ],
    });

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
