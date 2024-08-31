import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spineer from "./Spineer.jsx";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/v1/auth/admin-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spineer path="" />;
}
