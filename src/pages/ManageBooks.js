import React from "react";
import BooksTable from "../components/BooksTable";
import Modal from "../components/Modal";

const ManageBooks = () => {
    return(
        <>
            <BooksTable />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Modal />
            </div>

        </>
    );
}

export default ManageBooks;