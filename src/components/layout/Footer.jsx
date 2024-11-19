import { Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const Footer = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={{ span: 3, offset: 1 }}>
                    <h4 className="text-decoration-underline">Home</h4>
                    <NavLink to='/' className='text-muted'>Home</NavLink>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <h4 className="text-decoration-underline">Contact</h4>
                    <NavLink to='/contact' className='text-muted'>Contact</NavLink>
                </Col>
                <Col md={{ span: 3 }}>
                    <h4 className="text-decoration-underline">About us</h4>
                    <NavLink to='/about' className='text-muted'>About us</NavLink>
                </Col>
                <div className='text-center p-3 m-1 mt-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    &copy; {new Date().getFullYear()} Copyright: RVG
                </div>
            </Row>
        </Container>

    )
};

export default Footer;