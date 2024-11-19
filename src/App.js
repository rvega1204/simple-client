import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

import CreateUser from "./components/pages/user/CreateUser";
import UsersList from "./components/pages/user/UsersList";
import GetUser from "./components/pages/user/GetUser";
import EditUser from "./components/pages/user/EditUser";
import DeleteUser from "./components/pages/user/DeleteUser";
import Contact from "./components/pages/static/Contact";
import AboutUs from "./components/pages/static/AboutUs";

const App = () => {
  return (
    <>
      <BrowserRouter>
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
