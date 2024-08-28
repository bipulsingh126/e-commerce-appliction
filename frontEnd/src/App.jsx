import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Auth/Login.jsx";
import Dashbord from "./pages/user/Dashbord.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        //create nested route
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashbord />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
