import React from 'react';
import AdminMenu from './../../components/AdminLayout/index';

const Users = () => {
    return (
        <div className="m-3 p-3" style={{ height: "80vh" }}>
           <div className="row">
                <div className="col-md-3">
                    <AdminMenu></AdminMenu>
                </div>
                <div className="col-md-9">
                     <h1> All Users</h1>
                </div>
            </div>
        </div>
    );
};

export default Users;