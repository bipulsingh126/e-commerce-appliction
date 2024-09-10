import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";
import axios from "axios";
import { useAuth } from "../../context/auth.jsx";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  //get orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/auth/orders`
      );
      setOrders(data?.orders);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Your Order"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Order</h1>
            {JSON.stringify(orders, null, 4)}
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
