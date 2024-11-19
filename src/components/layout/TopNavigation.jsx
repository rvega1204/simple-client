import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';

/**
 * Component for the top navigation bar.
 * 
 * This component provides links for navigation throughout the app.
 * It includes links to the homepage, "Create User," and "Edit User" pages.
 *
 * @component
 */
const TopNavigation = () => {
  return (
    <>
      {/* Sticky navigation bar at the top */}
      <Navbar bg="light" data-bs-theme="light" sticky="top" className="mb-4">
        <Container>
          {/* Brand name linking to the homepage */}
          <Navbar.Brand as={NavLink} to="/">Simple Client</Navbar.Brand>

          {/* Navigation links */}
          <Nav className="flex-grow-1 justify-content-end">
            {/* Link to the "Create User" page */}
            <Nav.Link
              as={NavLink}
              to="/create"
              className="fw-bold"
            >Create User
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavigation;