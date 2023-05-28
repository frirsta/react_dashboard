import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NavBar from "./components/NavBar";
import Tester from "./components/Tester";
import AddTester from "./pages/AddTester";
import TesterLogin from "./pages/tester/TesterLogin";
import OfflineNavbar from "./components/OfflineNavbar";

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
      <Route path="/create" element={<AddTester />} />
    </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
