import React, {useState} from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Box, Button, NumberInput } from '@strapi/design-system';
// import { Information } from '@strapi/design-system/Information';
import { useData } from "../contexts/DataProvider";

const BookForm = () => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        price: '',
        isbn: '',
    });
    const [error, setError] = useState({
        title: '',
        author: '',
        price: '',
        isbn: '',
    });
    const {data, setData} = useData();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formIsValid = handleValidation();
        if (formIsValid){
            setData(data.books.push({...form, copies: 1 }));
            setData({...data, bookModalIsOpen: !data.bookModalIsOpen})
        }
    }

    const handleValidation = () => {
        let formIsValid = true;

        if(!form.title.match(/^[A-Za-z][A-Za-z0-9]*$/) || form.title === '' ){
            setError({...error, title: 'Please introduce a valid input, that is not empty and contains only letters'});
            formIsValid = false;
            console.log('====title', error)
        } else {
            setError({...error, title: ''});
        }

        if(!form.author.match(/^[A-Za-z][A-Za-z0-9]*$/) || form.author === '' ){
            setError({...error, auhtor: 'Please introduce a valid input, that is not empty and contains only letters'});
            formIsValid = false;
            console.log('====author', error)
        } else {
            setError({...error, author: ''});
        }

        if(!form.price.match(/^\d+$/) || form.price === 0 ){
            setError({...error, price: 'Please introduce a price that contains only numbers and is greater than 0'});
            formIsValid = false;
            console.log('====price', error)
        } else {
            setError({...error, price: ''});
        }

        if(!form.isbn.match(/^\d+$/) || form.isbn === 0 ){
            setError({...error, isbn: 'Please introduce a number that contains only numbers and is greater than 0'});
            formIsValid = false;
            console.log('====isbn', error)
        } else {
            setError({...error, isbn: ''});
        }

        return formIsValid;
    }

    return (
        <>
            <form id="addBookForm" onSubmit={(e) => { console.log("bla"); e.preventDefault();}}>
                <Box paddingTop={2} paddingBottom={2}>
                    <TextInput error={error.title} placeholder="Book title"  required label="Title" name="content" hint="Example: Romeo and Juliet"  onChange={e => {setForm({...form, title: e.target.value});}} value={form.title} labelAction={<Tooltip description="Content of the tooltip">
                        <button aria-label="Information about the email" style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent'
                        }}>
                            {/*<Information aria-hidden={true} />*/}
                        </button>
                    </Tooltip>} />
                </Box>
                <Box paddingTop={2} paddingBottom={2}>
                    <TextInput error={error.author} placeholder="Book author" required label="Author" name="content" hint="Example: William Shakespeare"  onChange={e => {setForm({...form, author: e.target.value});}} value={form.author} labelAction={<Tooltip description="Content of the tooltip">
                        <button aria-label="Information about the email" style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent'
                        }}>
                            {/*<Information aria-hidden={true} />*/}
                        </button>
                    </Tooltip>} />
                </Box>
                <Box paddingTop={2} paddingBottom={2}>
                    <TextInput error={error.price} type="number" required placeholder="Rental price" label="Price" name="content"  onChange={e => {setForm({...form, price: e.target.value});}} value={form.price} labelAction={<Tooltip description="Content of the tooltip">
                        <button aria-label="Information about the email" style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent'
                        }}>
                            {/*<Information aria-hidden={true} />*/}
                        </button>
                    </Tooltip>} />
                </Box>
                <Box paddingTop={2} paddingBottom={2}>
                    <TextInput error={error.isbn} type="number" required placeholder="ISBN" label="ISBN" name="content"  hint="Please introduce a 13 digit number that starts with 978"  onChange={e => {setForm({...form, isbn: e.target.value});}} value={form.isbn} labelAction={<Tooltip description="Content of the tooltip">
                        <button aria-label="Information about the email" style={{
                            border: 'none',
                            padding: 0,
                            background: 'transparent'
                        }}>
                            {/*<Information aria-hidden={true} />*/}
                        </button>
                    </Tooltip>} />
                </Box>
                <Button onClick={ handleSubmit } size="S">Submit</Button>
                {console.log(error)}
            </form>
        </>
    );
}


export default BookForm;