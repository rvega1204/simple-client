import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Col, Form, Row } from 'react-bootstrap';
import * as userService from '../../../services/user.service';
import Layout from '../../layout/Layout';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const { userId } = useParams();

    const populateUserFields = async () => {
        try {
            const user = await userService.getUser(userId);
            setName(user.name);
            setEmail(user.email);
            setCity(user.city);
            setCountry(user.country);
        } catch (error) {
            console.error(error);
            toast.error(`User ${userId} could not been found!`);
        }
    };

    const submitForm = async (event) => {
        event.preventDefault();
        const payload = {
            name,
            email,
            city,
            country,
        };

        try {
            const response = await userService.editUser(userId, payload);
            if (response?.status) {
                const userName = response.message.name;
                toast.success(`User ${userName} updated!`);
            } else {
                toast.error('Error updating the user!');
            }
        } catch (err) {
            toast.error(userService.getErrorMessage(err));
        }
    };

    useEffect(() => {
        populateUserFields();
    }, [userId])

    return (
        <Layout>
            <h3 className='text-center'>Edit User</h3>
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
                        <Button
                            variant="primary"
                            type="submit"
                            className='m-1'
                            onClick={submitForm}
                        >
                            Edit User
                        </Button>
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
    )
};

export default EditUser;