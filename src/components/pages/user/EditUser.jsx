import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as userService from '../../../services/user.service';
import Layout from '../../layout/Layout';

/**
 * EditUser component allows users to edit their profile information.
 * It fetches the user's current data from the API and populates the fields.
 * The user can update their name, email, city, and country.
 *
 * @component
 * @example
 * return <EditUser />;
 */
const EditUser = () => {
    // State variables to store form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    // Extract userId from the URL params using react-router
    const { userId } = useParams();

    /**
     * Fetches the user data from the server and populates the form fields.
     * This function is called when the component mounts.
     */
    const populateUserFields = async () => {
        try {
            // Get user details by userId
            const user = await userService.getUser(userId);
            if (user?.id) {
                // Set state with the user data if available
                setName(user.name);
                setEmail(user.email);
                setCity(user.city);
                setCountry(user.country);
            } else if (!user?.status) {
                // Show an error if the user data could not be retrieved
                toast.error(user.message);
            }
        } catch (error) {
            // Show error if there was an issue fetching user data
            toast.error(`User ${userId} could not been found!`);
        }
    };

    /**
     * Handles form submission and sends updated data to the server.
     * @param {Event} event - The submit event triggered when the form is submitted.
     */
    const submitForm = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Create the payload to send to the API
        const payload = {
            name,
            email,
            city,
            country,
        };

        try {
            // Send the updated user data to the server
            const response = await userService.editUser(userId, payload);
            if (response?.status) {
                // Show success message if the user was updated successfully
                const userName = response.message.name;
                toast.success(`User ${userName} updated!`);
            } else {
                // Show error message if there was an issue updating the user
                toast.error('Error updating the user!');
            }
        } catch (err) {
            // Show error if the update request fails
            toast.error(userService.getErrorMessage(err));
        }
    };

    // Fetch user data when the component mounts or userId changes
    useEffect(() => {
        populateUserFields();
    }, [userId]);

    return (
        <Layout>
            <h3 className='text-center'>Edit User</h3>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <Form>
                        {/* Name input field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(fieldElement) => setName(fieldElement.target.value)}
                            />
                        </Form.Group>

                        {/* Email input field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(fieldElement) => setEmail(fieldElement.target.value)}
                            />
                        </Form.Group>

                        {/* City input field */}
                        <Form.Group className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="City"
                                value={city}
                                onChange={(fieldElement) => setCity(fieldElement.target.value)}
                            />
                        </Form.Group>

                        {/* Country input field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Country"
                                value={country}
                                onChange={(fieldElement) => setCountry(fieldElement.target.value)}
                            />
                        </Form.Group>

                        {/* Submit button to edit user */}
                        <Button
                            variant="primary"
                            type="submit"
                            className='m-1'
                            onClick={submitForm}
                        >
                            Edit User
                        </Button>

                        {/* Button to delete user, navigating to the delete page */}
                        <Button
                            variant='danger'
                            as={NavLink}
                            to={`/delete/${userId}`}
                            className='m-1'
                        >
                            Delete User
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Layout>
    );
};

export default EditUser;