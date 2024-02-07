import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"><UserMenu /></div>
          <div className="col-md-9">
            <h2>Name: {auth?.user?.name}</h2>
            <h2>Email: {auth?.user?.email}</h2>
            <h2>Address: {auth?.user?.address}</h2>
            <h2>Phone: {auth?.user?.phone}</h2>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard