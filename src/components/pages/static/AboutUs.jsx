import { Col, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";

/**
 * AboutUs component provides an overview of the project's purpose, goals, and technologies.
 *
 * @component
 * @example
 * return <AboutUs />;
 */
const AboutUs = () => {
    return (
        <Layout>
            <Row className="justify-content-center">
                <Col md={6}>
                    {/* Main header */}
                    <h1>About Us</h1>
                    <p>
                        This project is a learning initiative to explore modern web development technologies.
                        We combine <strong>React</strong> for building interactive user interfaces with
                        <strong> Node.js and Express.js</strong> to create a reliable backend architecture.
                    </p>

                    {/* Section: Why This Project? */}
                    <h2>Why This Project?</h2>
                    <p>The goal is to gain hands-on experience in:</p>
                    <ul>
                        <li>
                            <strong>Frontend Development</strong>: Building a dynamic and responsive client-side interface with React.
                        </li>
                        <li>
                            <strong>Backend Development</strong>: Creating APIs and handling server-side logic using Node.js and Express.js.
                        </li>
                        <li>
                            <strong>Full-Stack Integration</strong>: Connecting the frontend and backend for a seamless user experience.
                        </li>
                    </ul>

                    {/* Section: What We’re Learning */}
                    <h2>What We’re Learning</h2>
                    <ul>
                        <li>How to design and implement RESTful APIs.</li>
                        <li>Managing state and rendering efficient components in React.</li>
                        <li>Structuring full-stack applications for scalability and maintainability.</li>
                    </ul>
                </Col>
            </Row>
        </Layout>
    );
};

export default AboutUs;