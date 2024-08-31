import React from "react";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";

const Order = () => {
  return (
    <Layout title={"Your Order"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Order</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
