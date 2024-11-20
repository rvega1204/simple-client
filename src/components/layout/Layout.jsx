import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import TopNavigation from "./TopNavigation.jsx";
import { createGlobalStyle } from "styled-components";
import Footer from "./Footer.jsx";

/**
 * Global style for background color using styled-components.
 * Applies a light or dark background color to the body based on the `light` prop.
 */
const BackgroundColor = createGlobalStyle`
  body {
    background-color: ${(props) => (props.light ? "#f2f2f2" : "#333")};
  }
`;

/**
 * Layout component that wraps the main structure of the application.
 * Includes global background styling, navigation, toast notifications, and footer.
 *
 * @component
 * @param {Object} props - Props passed to the component.
 * @param {React.ReactNode} props.children - The child components to render inside the layout.
 * @example
 * return (
 *   <Layout>
 *     <MainContent />
 *   </Layout>
 * );
 */
const Layout = ({ children }) => {
  return (
    <>
      <Container fluid className="mb-5">
        {/* Apply global background color styling */}
        <BackgroundColor light />
        {/* Toast notification container */}
        <ToastContainer />
        {/* Top navigation bar */}
        <TopNavigation />
        {/* Main content container */}
        <Container fluid className="mt-5">
          {children}
        </Container>
      </Container>
      {/* Footer section */}
      <Footer />
    </>
  );
};

export default Layout;