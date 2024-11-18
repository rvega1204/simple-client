import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as userService from '../../services/user.service';
import { toast } from 'react-toastify';
import { Card, Col, Row } from 'react-bootstrap';
import Layout from '../layout/Layout';

const GetUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});

    const fetchUser = async () => {
        if (fetchUser.isFetching) return;
        fetchUser.isFetching = true;

        try {
            const response = await userService.getUser(userId);
            setUser(response);
        } catch (err) {
            setUser(null);
            const getErrorMessage = () => {
                const {
                    data: { message },
                } = err.response;
                if (typeof message === "string") {
                    return message.charAt(0).toUpperCase() + message.slice(1);
                }

                return `Error getting the user: ${userId}`;
            }

            toast.error(getErrorMessage());
        } finally {
            fetchUser.isFetching = false;
        }
    };
    fetchUser.isFetching = false;

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (

        <Layout>
            {user ? (
                <Row className='justify-content-center'>
                    <Col lg={5}>
                        <h3 className='text-center mb-3'>{user.name}</h3>
                        <Card>
                            <Card.Body className='text-center'>
                                <h4>{user.name}</h4>
                                <p>{user.email}</p>

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