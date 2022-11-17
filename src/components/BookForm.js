import React, {useState} from 'react';
import { TextInput } from '@strapi/design-system/TextInput';
import { Tooltip } from '@strapi/design-system/Tooltip';
import { Box } from '@strapi/design-system/Box';
// import { Information } from '@strapi/design-system/Information';
import { useData } from "../contexts/DataProvider";

const BookForm = () => {
    const [form, setForm] = useState({
        title: '',
        author: '',
        price: 0,
        isbn: 0,
    });
    const {data, setData} = useData();

    return (
        <>
            <Box paddingTop={2} paddingBottom={2}>
                <TextInput placeholder="Book title" label="Title" name="content" hint="Example: Romeo and Juliet"  onChange={e => {setForm({...form, title: e.target.value});}} value={form.title} labelAction={<Tooltip description="Content of the tooltip">
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
                <TextInput placeholder="Book author" label="Author" name="content" hint="Example: William Shakespeare"  onChange={e => {setForm({...form, author: e.target.value});}} value={form.author} labelAction={<Tooltip description="Content of the tooltip">
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
                <TextInput placeholder="Rental price" label="Price" name="content"  onChange={e => {setForm({...form, price: e.target.value});}} value={form.price} labelAction={<Tooltip description="Content of the tooltip">
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
                <TextInput placeholder="ISBN" label="ISBN" name="content"  hint="Please introduce a 13 digit number that starts with 978"  onChange={e => {setForm({...form, isbn: e.target.value});}} value={form.isbn} labelAction={<Tooltip description="Content of the tooltip">
                    <button aria-label="Information about the email" style={{
                        border: 'none',
                        padding: 0,
                        background: 'transparent'
                    }}>
                        {/*<Information aria-hidden={true} />*/}
                    </button>
                </Tooltip>} />
            </Box>
        </>
    );
}


export default BookForm;