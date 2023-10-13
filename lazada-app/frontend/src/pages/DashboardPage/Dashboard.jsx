import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../../components/AdminLayout/UserMenu'
import {useAuth} from "../../context/AuthContext"

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
      <Outlet />
      <div className='container-fluid m-3 p-3' style={{ height: "80vh" }}>
          <div className="row">
              <div className="col-md-3">
                <UserMenu></UserMenu>
              </div>
              <div className="col-md-9">
                <div className="card w-75 p-2">
                  <h3> User Name: {auth?.user?.name}</h3>
                  <h3> User Email: {auth?.user?.email}</h3>
                  <h3> User Phone: {auth?.user?.phone}</h3>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Dashboard
