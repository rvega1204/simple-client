import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

import CreateUser from "./components/pages/user/CreateUser";
import UsersList from "./components/pages/user/UsersList";
import GetUser from "./components/pages/user/GetUser";
import EditUser from "./components/pages/user/EditUser";
import DeleteUser from "./components/pages/user/DeleteUser";
import Contact from "./components/pages/static/Contact";
import AboutUs from "./components/pages/static/AboutUs";
import { useEffect } from "react";

/**
 * DynamicTitle component updates the document title based on the current URL path.
 * It maps specific routes to their corresponding page titles.
 *
 * @component
 * @example
 * return <DynamicTitle />;
 */
const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    // Mapping routes to specific page titles
    const titles = {
      '/': 'Home - Simple Client',
      '/about': 'About Us - Simple Client',
      '/contact': 'Contact - Simple Client',
      '/create': 'Create User - Simple Client',
    };

    // Set the document title based on the current pathname
    document.title = titles[location.pathname] || 'Simple Client';
  }, [location]); // Re-run effect when location changes

  return null;
};

/**
 * The main App component that renders the application routes and handles routing logic.
 * It includes routes for user management (create, edit, delete, view), and static pages (about, contact).
 *
 * @component
 * @example
 * return <App />;
 */
const App = () => {
  return (
    <>
      <BrowserRouter>
        {/* DynamicTitle component sets the page title based on the route */}
        <DynamicTitle />
        {/* Define routes for various pages */}
        <Routes>
          {/* Route for listing all users */}
          <Route path="/" element={<UsersList />} />
          {/* Route for creating a new user */}
          <Route path="/create" element={<CreateUser />} />
          {/* Route for viewing a single user's details, using userId parameter */}
          <Route path="/:userId" element={<GetUser />} />
          {/* Route for editing a user, using userId parameter */}
          <Route path="/edit/:userId" element={<EditUser />} />
          {/* Route for deleting a user, using userId parameter */}
          <Route path="/delete/:userId" element={<DeleteUser />} />
          {/* Static route for the contact page */}
          <Route path="/contact" element={<Contact />} />
          {/* Static route for the about us page */}
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;