import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useContext } from 'react'
import { DataContext } from '../store/globalState'
import { deleteItem } from '../store/Actions'

const ModalExample = ({ show, handleClose }) => {
    const { state, dispatch } = useContext(DataContext)
    const { modal } = state

    const handleSubmit = () => {
        dispatch(deleteItem(modal.data, modal.id, 'ADD_CART'))
        dispatch({
            type: 'ADD_MODAL',
            payload: {}
        })
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want to remove this item from your cart?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalExample