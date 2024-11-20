import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";

/**
 * Footer component for the application.
 * Provides navigation links and a copyright notice.
 *
 * @component
 * @example
 * return <Footer />;
 */
const Footer = () => {
    return (
        <Container>
            {/* Main row for footer sections */}
            <Row className="justify-content-center mt-2 mb-5">
                {/* Home section */}
                <Col md={{ span: 3, offset: 1 }}>
                    <h4 className="text-decoration-underline">Home</h4>
                    <NavLink to='/' className='text-muted'>Home</NavLink>
                </Col>

                {/* Contact section */}
                <Col md={{ span: 3, offset: 1 }}>
                    <h4 className="text-decoration-underline">Contact</h4>
                    <NavLink to='/contact' className='text-muted'>Contact</NavLink>
                </Col>

                {/* About Us section */}
                <Col md={{ span: 3 }}>
                    <h4 className="text-decoration-underline">About us</h4>
                    <NavLink to='/about' className='text-muted'>About us</NavLink>
                </Col>
            </Row>

            {/* Footer copyright notice */}
            <div
                className='text-center p-3 m-1 mt-2'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
                &copy; {new Date().getFullYear()} Copyright: RVG
            </div>
        </Container>
    );
};

export default Footer;