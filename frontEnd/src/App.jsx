import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Policy from "./pages/Policy.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import Dashbord from "./pages/user/Dashbord.jsx";
import PrivateRoute from "./components/Routes/Private.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import AdminRoute from "./components/Routes/AdminRoute.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import CreateCategory from "./pages/Admin/CreateCategory.jsx";
import Users from "./pages/Admin/Users.jsx";
import Profile from "./pages/user/Profile.jsx";
import Order from "./pages/user/Order.jsx";
import "antd/dist/reset.css";
import Product from "./pages/Admin/Product.jsx";
import UpdateProduct from "./pages/Admin/UpdateProduct.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        //create nested route
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashbord />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct/>} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
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
