import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Layout from '../../layout/Layout';
import * as userService from '../../../services/user.service';

/**
 * Component for deleting a user with confirmation.
 * Opens a modal to confirm the deletion of a user by their ID.
 * Redirects to the home page after the action is completed.
 */
const DeleteUser = () => {
    // Constants
    const DELAY_BEFORE_REDIRECTION_MS = 2000; // Delay before redirection in milliseconds.

    // Get the user ID from the route parameters.
    const { userId } = useParams();

    // State for controlling the visibility of the modal.
    const [showModal, setShowModal] = useState(false);

    /**
     * Opens the modal.
     */
    const handleShow = () => setShowModal(true);

    /**
     * Closes the modal and cancels the delete action.
     */
    const handleClose = () => {
        setShowModal(false);
        cancelAction();
    };

    /**
     * Extracts and formats an error message from the API response.
     * @param {Object} err - Error object from the API.
     * @returns {string} - Formatted error message.
     */
    const getDeleteErrorMessage = (err) => {
        const {
            data: { message },
        } = err?.response;

        // Format the message to start with an uppercase letter.
        return message[0].toUpperCase() + message.substring(1);
    };

    /**
     * Submits the delete action for the user.
     * Displays success or error notifications and triggers redirection.
     */
    const submitAction = async () => {
        try {
            const response = await userService.deleteUser(userId);
            if (response?.status) {
                toast.success('User removed!');
                timeOutFunc();
            } else if (response.message) {
                toast.error(response.message);
            } else {
                toast.error(`Error removing the user ${userId}`);
            }
        } catch (error) {
            toast.error(getDeleteErrorMessage(error));
        }
    };

    /**
     * Cancels the delete action and redirects the user.
     */
    const cancelAction = () => {
        timeOutFunc();
    };

    /**
     * Redirects the user to the home page after a delay.
     */
    const timeOutFunc = () => {
        setTimeout(() => {
            window.location.href = '/';
        }, DELAY_BEFORE_REDIRECTION_MS);
    };

    // Open the modal when the component mounts or the userId changes.
    useEffect(() => {
        handleShow();
    }, [userId]);

    return (
        <Layout>
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure to delete the user #{userId}?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={cancelAction}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={submitAction}>
                            Yes, delete it!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    );
};

export default DeleteUser;