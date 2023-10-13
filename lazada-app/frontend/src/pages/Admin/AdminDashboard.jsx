import React from 'react';
import AdminMenu from './../../components/AdminLayout/index';
import {useAuth} from "../../context/AuthContext"

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <div>
            <div className="container-fluid m-3 p-3" style={{ height: "80vh" }}>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu></AdminMenu>
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-2">
                            <h3> Admin name: {auth?.user?.name}</h3>
                            <h3> Admin email: {auth?.user?.email}</h3>
                            <h3> Admin contact: {auth?.user?.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;