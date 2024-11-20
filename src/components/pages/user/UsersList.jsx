import * as userService from '../../../services/user.service';
import React, { useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import Layout from "../../layout/Layout";
import UserCard from '../../user/UserCard';

/**
 * UsersList component displays a list of user cards.
 * It fetches the data from the server using `userService.getAllUsers`.
 *
 * @component
 * @example
 * return <UsersList />;
 */
const UsersList = () => {
  // State to store users
  const [users, setUsers] = useState({});
  // State to store error messages
  const [errorMessage, setErrorMessage] = useState(null);
  // State to manage loading state
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Fetches the list of users from the server and updates the state.
   * Handles errors by setting an appropriate error message.
   */
  const fetchUsers = async () => {
    try {
      setIsLoading(true); // Start loading
      const users = await userService.getAllUsers(); // Fetch users
      setUsers(users); // Update users state
    } catch (error) {
      /**
       * Returns an error message based on the server response or a default message.
       * @returns {string} The error message.
       */
      const getErrorMessage = () => {
        const apiErrorMessage = error?.response?.data?.message;
        return apiErrorMessage ?? 'Error connecting to the server'; // Default error message
      };

      setErrorMessage(getErrorMessage()); // Update error message state
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      {isLoading ? (
        // Show a loading spinner while data is being fetched
        <div className="text-center">
          <Spinner animation="grow" role="status" />
        </div>
      ) : errorMessage ? (
        // Display an error message if an error occurred
        <h3 className="text-center text-danger fw-bold">{errorMessage}</h3>
      ) : (
        <>
          {/* Header */}
          <h3 className="text-center mb-3">Users</h3>
          {/* User cards displayed in a grid */}
          <Row className="justify-content-center">
            {Object.values(users).map((user) => (
              <Col lg={3} className="d-flex p-1" key={user.id}>
                {/* Render each user as a UserCard component */}
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