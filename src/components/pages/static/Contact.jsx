import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";

/**
 * Contact component that displays contact information.
 * Wrapped with a layout for consistent styling and structure.
 *
 * @component
 * @example
 * return (
 *   <Contact />
 * );
 */
const Contact = () => {
    return (
        <Layout>
            {/* Page title */}
            <h3 className="text-center">Contact Us</h3>
            {/* Content section */}
            <Row className="justify-content-center">
                <Col md={10}>
                    <p className="text-center">
                        {/* Placeholder for the contact email */}
                        Contact me at <span className="fst-italic">YOUR EMAIL ADDRESS</span>
                    </p>
                </Col>
            </Row>
        </Layout>
    );
};

export default Contact;