import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NavBar from "./components/NavBar";
import Tester from "./components/Tester";
import AddTester from "./pages/AddTester";
import TesterLogin from "./pages/tester/TesterLogin";
import OfflineNavbar from "./components/OfflineNavbar";
import EditTester from "./pages/tester/EditTester";
import TesterDetails from "./pages/tester/TesterDetails";
import TestList from "./pages/tests/AddTest";
import AddTest from "./pages/tests/AddTest";
import EditTest from "./pages/tests/EditTest";

function App() {
  return (
    <div>
      <ToastContainer theme="colored"></ToastContainer>
      <BrowserRouter>
        <NavBar />
        <OfflineNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/testerlogin" element={<TesterLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tester" element={<Tester />} />
          <Route path="/tester/:id" element={<TesterDetails />} />
          <Route path="/create" element={<AddTester />} />
          <Route path="/edittester/:id" element={<EditTester />} />
          <Route path="/testlist" element={<TestList />} />
          <Route path="/createtest" element={<AddTest />} />
          <Route path="/edittest/:id" element={<EditTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
