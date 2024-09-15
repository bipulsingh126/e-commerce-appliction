import React from 'react'
import Layout from '../../components/Layout/Layout.jsx'
import AdminMenu from '../../components/Layout/AdminMenu.jsx'
import { useAuth } from '../../context/auth.jsx'

const AdminDashboard = () => {
  const [auth]= useAuth();
  return (
    <Layout title={'Dashboard - Admin'} >
    <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu/>
      </div>
      <div className="col-md-9">
        <div className="card w-80 p-3" >
          <h3> Admin Name : {auth?.user?.name} </h3>
          <h3>Admin Email : {auth?.user?.email} </h3>
          <h3>Admin Contact : {auth?.user?.phone} </h3>
        </div>
      </div>
    </div>
    </div>
    </Layout>
  )
}

export default AdminDashboard
