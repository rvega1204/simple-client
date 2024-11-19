import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Layout from '../../layout/Layout';
import * as userService from '../../../services/user.service';

/**
 * Component to create a new user by submitting a form.
 * 
 * @component
 */
const CreateUser = () => {
    // State variables to manage form input fields.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    /**
     * Handles form submission, creates a new user by calling the API, 
     * and manages success/error notifications.
     * 
     * @param {Object} event - The form submit event object.
     */
    const submitForm = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior.

        // Create the payload with form input values.
        const payload = { name, email, city, country };

        try {
            // Call the API to create a user.
            const response = await userService.createUser(payload);

            if (response?.status && response?.user) {
                const userName = response.user?.name; // Get the new user's name
                // Reset form inputs on successful creation.
                setName('');
                setEmail('');
                setCity('');
                setCountry('');
                // Show a success toast notification.
                toast.success(`User ${userName} created!`);
            } else {
                // Show an error toast notification if status is not true.
                toast.error('Error creating the user!');
            }
        } catch (err) {
            /**
             * Extracts and formats the error message from the API response.
             * 
             * @returns {string} - The formatted error message.
             */
            const getErrorMessage = () => {
                try {
                    const {
                        data: {
                            errors: { body }
                        },
                    } = err.response;

                    // Extract and format the first error message.
                    const message = body[0]?.message;
                    return message[0].toUpperCase() + message.substring(1);
                } catch (e) {
                    return 'An unexpected error occurred while creating the user.';
                }
            };

            // Show an error toast notification with the formatted message.
            toast.error(getErrorMessage());
        }
    };

    return (
        <Layout>
            <h3 className="text-center">Create User</h3>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(fieldElement) => setName(fieldElement.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(fieldElement) => setEmail(fieldElement.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(fieldElement) => setCity(fieldElement.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(fieldElement) => setCountry(fieldElement.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitForm}>
                            Add User
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};

export default CreateUser;