import Layout from "../../components/Layout/Layout.jsx";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import "../../style/AuthStyle.css";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/auth/forgot-password",
        {
          email,
          newPassword,
          answer,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went worng");
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce app"}>
      <div className="form-container">
        <h4 className="title">RESET PASSWORD</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enater Yoour Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) =>setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enater your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={answer}
              onChange={(e) =>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enater Your favorite sports "
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
