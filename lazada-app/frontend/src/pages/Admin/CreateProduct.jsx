import React from 'react';
import AdminMenu from './../../components/AdminLayout/index';

const CreateProduct = () => {
    return (
        <div className="m-3 p-3" style={{ height: "80vh" }}>
           <div className="row">
                <div className="col-md-3">
                    <AdminMenu></AdminMenu>
                </div>
                <div className="col-md-9">
                     <h1> Create Product</h1>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;