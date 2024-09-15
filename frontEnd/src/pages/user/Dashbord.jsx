import React from "react";
import Layout from "../../components/Layout/Layout.jsx";
import UserMenu from "../../components/Layout/UserMenu.jsx";
import { useAuth } from "../../context/auth.jsx";

const Dashbord = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashbord - Ecommerce App"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col md-3">
            <UserMenu />
          </div>
          <div className="col md-9">
            <h1 className="card w-75 p-3">
              <h3> Name : {auth?.user?.name} </h3>
              <h3> Email : {auth?.user?.email} </h3>
              <h3> Address : {auth?.user?.address} </h3>
              <h3> Contact : {auth?.user?.phone} </h3>
            </h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashbord;
