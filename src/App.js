import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

import CreateUser from "./components/user/CreateUser";
import UsersList from "./components/user/UsersList";
import GetUser from "./components/user/GetUser";
import EditUser from "./components/user/EditUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/:userId" element={<GetUser />} />
          <Route path="/edit/:userId" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
