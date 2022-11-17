import React, {useState} from 'react';
import { ModalLayout, ModalBody, ModalHeader, ModalFooter } from '@strapi/design-system/ModalLayout';
import { Button, Typography, DatePicker, Box } from '@strapi/design-system';
import {Plus} from "@strapi/icons";
import {TFooter} from "@strapi/design-system/Table";
const Modal = (props) => {
    const [isVisible, setIsVisible] = useState(false);
    const [date, setDate] = useState();
    return <>
        <TFooter onClick={() => setIsVisible(prev => !prev)} icon={<Plus />}>Add a new book</TFooter>
        {isVisible && <ModalLayout onClose={() => setIsVisible(prev => !prev)} labelledBy="title">
            <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                    Add a new book
                </Typography>
            </ModalHeader>
            <ModalBody>
                {/*<DatePicker onChange={setDate} selectedDate={date} label="Date picker" name="datepicker" clearLabel={'Clear the datepicker'} onClear={() => setDate(undefined)} selectedDateLabel={formattedDate => `Date picker, current is ${formattedDate}`} />*/}
                {props.content}
            </ModalBody>
            <ModalFooter startActions={<Button onClick={() => setIsVisible(prev => !prev)} variant="tertiary">
                Cancel
            </Button>} endActions={<>
                <Button variant="secondary">Add new stuff</Button>
                <Button onClick={() => setIsVisible(prev => !prev)}>Finish</Button>
            </>} />
        </ModalLayout>}
    </>;
}

export default Modal;