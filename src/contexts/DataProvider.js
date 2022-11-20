import { createContext, useContext, useState } from 'react'

const DataContext = createContext({})

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
        ],
        users: [
            {
                name: 'Carrie',
                surname: 'Bradshaw',
                hasRentedBook: false,
                startingDate: '',
                hasToPay: '',
            },
        ],
    })

    return (
        <DataContext.Provider value={{ data, setData }}>
            {children}
        </DataContext.Provider>
    )
}

export const useData = () => {
    return useContext(DataContext)
}
