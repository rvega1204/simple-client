import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as userService from '../../../services/user.service';
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'react-bootstrap';
import Layout from '../../layout/Layout';

/**
 * Component to fetch and display user details by user ID.
 * 
 * @component
 */
const GetUser = () => {
    const { userId } = useParams(); // Get the user ID from the route parameters.
    const [user, setUser] = useState({}); // State to store user details.

    /**
     * Fetches user details from the API using the provided userId.
     * Implements a flag (`isFetching`) to prevent duplicate requests.
     */
    const fetchUser = async () => {
        if (fetchUser.isFetching) return; // Prevent duplicate calls.
        fetchUser.isFetching = true;

        try {
            // Make an API call to fetch user details.
            const response = await userService.getUser(userId);
            setUser(response); // Update state with the fetched user data.
        } catch (err) {
            setUser(null); // Set user to null if an error occurs.

            /**
             * Extracts and formats the error message from the API error response.
             * 
             * @returns {string} - The formatted error message.
             */
            const getErrorMessage = () => {
                try {
                    const {
                        data: { message },
                    } = err.response;

                    // Handle string messages; format them.
                    if (typeof message === "string") {
                        return message.charAt(0).toUpperCase() + message.slice(1);
                    }

                    // Fallback message if error is not in the expected format.
                    return `Error getting the user: ${userId}`;
                } catch (e) {
                    return 'An unexpected error occurred while fetching the user.';
                }
            };

            // Show an error toast with the extracted message.
            toast.error(getErrorMessage());
        } finally {
            fetchUser.isFetching = false; // Reset the fetching flag.
        }
    };

    // Initialize the `isFetching` flag on the function.
    fetchUser.isFetching = false;

    // Fetch user details whenever the `userId` changes.
    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        <Layout>
            {/* Display user details if found, otherwise show an error message */}
            {user ? (
                <Row className='justify-content-center'>
                    <Col lg={5}>
                        <h3 className='text-center mb-3'>{user.name}</h3>
                        <Card>
                            <Card.Body className='text-center'>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>

                                {/* Display city and country if available */}
                                {user.city && user.country && (
                                    <p>{user.city} - {user.country}</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <div className='text-danger text-center fw-bold'>User can't be found</div>
            )}
        </Layout>
    );
};

export default GetUser;