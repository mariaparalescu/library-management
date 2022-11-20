import {createContext, useContext, useState} from "react";

const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [data, setData] = useState({
        books: [{
            isbn: 9781234567891234,
            title: 'Booky',
            author: 'Lala',
            price: 6,
            copies: 1,
            available: 1,
        }],
        users: [],
    });

    return (
        <DataContext.Provider value={{data, setData}}>
            {children}
        </DataContext.Provider>
    )
}


export const useData = () => {
    return useContext(DataContext)
}