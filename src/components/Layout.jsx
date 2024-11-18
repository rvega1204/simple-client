import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import TopNavigation from "./TopNavigation.jsx";
import { createGlobalStyle } from "styled-components";

const BackgroundoColor = createGlobalStyle`
  body {
    background-color: ${(props) => (props.light ? "#f2f2f2" : "#333")};
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <Container fluid className="mb-5">
        <BackgroundoColor light />
        <ToastContainer />
        <TopNavigation />
        <Container fluid className="mt-5">
          {children}
        </Container>
      </Container>
    </>
  );
};

export default Layout;
