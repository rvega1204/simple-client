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

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      '/': 'Home - Simple Client',
      '/about': 'About Us - Simple Client',
      '/contact': 'Contact - Simple Client',
      '/create': 'Create User - Simple Client',
    };

    document.title = titles[location.pathname] || 'Simple Client';
  }, [location]);

  return null;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
      <DynamicTitle />
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/:userId" element={<GetUser />} />
          <Route path="/edit/:userId" element={<EditUser />} />
          <Route path="/delete/:userId" element={<DeleteUser />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
