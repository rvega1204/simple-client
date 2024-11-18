import * as userService from '../../services/user.service';
import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Layout from "../layout/Layout";

const UsersList = () => {
  const [users, setUsers] = useState({});
  const fetchUsers = async () => {
    const users = await userService.getAllUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <h3 className="text-center mb-3">Users</h3>

      {Object.values(users).map((user) => (
        <Row className="justify-content-center">
          <Col lg={4}>
            <Card>
              <Card.Body>
                <h4>{user.name}</h4>
                <p>{user.email}</p>

                {user.city && user.country && (
                  <p>
                    {user.city} - {user.country}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Layout>
  );
};

export default UsersList;
