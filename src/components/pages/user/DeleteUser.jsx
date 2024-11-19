import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Layout from '../../layout/Layout';
import * as userService from '../../../services/user.service';

const DeleteUser = () => {
    const DELAY_BEFORE_REDIRECTION_MS = 800;
    const { userId } = useParams(); // Get the user ID from the route parameters.
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => {
        setShowModal(false)
        cancelAction();
    };

    const getDeleteErrorMessage = (err) => {
        const {
            data: {
                message
            },
        } = err?.response;

        // Format the message to start with an uppercase letter
        return message[0].toUpperCase() + message.substring(1);
    }

    const submitAction = async () => {
        try {
            const response = await userService.deleteUser(userId);
            if (response?.status) {
                toast.success('User removed!');
                timeOutFunc();
            } else {
                toast.error(`Error removing the user ${userId}`);
            }
        } catch (error) {
            toast.error(getDeleteErrorMessage(error));
        }
    };

    const cancelAction = () => {
        timeOutFunc();
    };

    const timeOutFunc = () => {
        setTimeout(() => {
            window.location.href = '/';
        }, DELAY_BEFORE_REDIRECTION_MS);
    };

    useEffect(() => {
        handleShow();
    }, [userId])

    return (
        <Layout>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal
                    show={showModal}
                    onHide={handleClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure to delete the user #{userId}?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelAction}>Close</Button>
                        <Button variant="danger" onClick={submitAction}>Yes, delete it!</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    );
};

export default DeleteUser;