import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";

import CreateUser from "./components/CreateUser";
import UsersList from "./components/UsersList";
import GetUser from "./components/GetUser";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/:userId" element={<GetUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
