import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Layout from '../layout/Layout';
import * as userService from '../../services/user.service';

const CreasteUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const submitForm = async (event) => {
        event.preventDefault();
        const payload = {
            name,
            email,
            city,
            country,
        };

        try {
            const response = await userService.createUser(payload);
            if (response?.status) {
                const getUserID = response?.user.id;
                setName('');
                setEmail('');
                setCity('');
                setCountry('');
                toast.success(`User ${getUserID} created!`);
            } else {
                toast.error('Error creating the user!');
            }
        } catch (err) {
            const getErrorMessage = () => {
                const {
                    data: {
                        errors: { body }
                    },
                } = err.response;
                const message = body[0]?.message
                return message[0].toUpperCase() + message.substring(1);
            }

            toast.error(getErrorMessage());
        }
    };

    return (
        <Layout>
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
                        <Button variant="primary" type="submit" onClick={submitForm}>Add User</Button>
                    </Form>


                </Col>
            </Row>
        </Layout>
    )
};

export default CreasteUser;