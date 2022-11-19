import React, {useState} from 'react';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Button, Typography, DatePicker, Box } from '@strapi/design-system';
import {Plus} from "@strapi/icons";
import {TFooter} from "@strapi/design-system/Table";
import {useData} from "../contexts/DataProvider";
const Modal = (props) => {
    //const [isVisible, setIsVisible] = useState(false);
    const [date, setDate] = useState();
    const {data, setData} = useData();
    return <>
        <TFooter onClick={() => setData({...data, bookModalIsOpen: !data.bookModalIsOpen})} icon={<Plus />}>Add a new book</TFooter>
        {data.bookModalIsOpen && <ModalLayout onClose={() => setData({...data, bookModalIsOpen: !data.bookModalIsOpen})} labelledBy="title">
            <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                    Add a new book
                </Typography>
            </ModalHeader>
            <ModalBody>
                {/*<DatePicker onChange={setDate} selectedDate={date} label="Date picker" name="datepicker" clearLabel={'Clear the datepicker'} onClear={() => setDate(undefined)} selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`} />*/}
                {props.content}
            </ModalBody>
            <ModalFooter startActions={<Button onClick={() => setData(!data.bookModalIsOpen )} variant="tertiary">
                Cancel
            </Button>} endActions={<>
                <Button variant="secondary">Add new stuff</Button>
                <Button onClick={() => setData({...data, bookModalIsOpen: !data.bookModalIsOpen})}>Finish</Button>
            </>} />
        </ModalLayout>}
    </>;
}

export default Modal;