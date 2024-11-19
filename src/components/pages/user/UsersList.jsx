import * as userService from '../../../services/user.service';
import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Layout from "../../layout/Layout";
import UserCard from '../../user/UserCard';

const UsersList = () => {
  const [users, setUsers] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const users = await userService.getAllUsers();
      setUsers(users);
    } catch (error) {
      const getErrorMessage = () => {
        const apiErrorMessage = error?.response?.data?.message;

        return apiErrorMessage ?? 'Error connecting to the server';
      };

      setErrorMessage(getErrorMessage());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="grow" role="status" />
        </div>
      ) : errorMessage ? (
        <h3 className="text-center text-danger fw-bold">{errorMessage}</h3>
      ) : (
        <>
          <h3 className="text-center mb-3">Users</h3>
          <Row className="justify-content-center">
            {Object.values(users).map((user) => (
              <Col lg={3} className="d-flex p-1" key={user.id}>
                <UserCard data={user} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </Layout>
  );
};

export default UsersList;