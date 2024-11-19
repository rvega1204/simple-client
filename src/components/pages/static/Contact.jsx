import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";

const Contact = () => {
    return (
        <Layout>
            <h3 className="text-center">Contact Us</h3>
            <Row className="justify-content-center">
                <Col md={10}>
                    <p className="text-center">
                        Contact me at <span className="fst-italic">YOUR EMAIL ADDRESS</span>
                    </p>
                </Col>
            </Row>
        </Layout>
    )
};

export default Contact;