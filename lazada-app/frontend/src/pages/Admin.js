import { Outlet, useLoaderData, Link} from 'react-router-dom';

function Admin() {
    // var data = useLoaderData();
    // const keys = Object.keys(data);
    return (
        <div className='row'>
            <div className='col-2 left-panel bg-dark mt-5'>
                <button className="btn btn-primary w-100 m-1">
                    <Link to="category" className="text text-white">Category Management</Link>
                </button>
                <button className="btn btn-primary w-100 m-1">
                    <Link to="seller" className="text text-white">Seller Management</Link>
                </button>
            </div>
            <div className='col-8 d-inline-block mt-5'>
                <div>
                    <h1>Welcome To Admin Page</h1>
                </div>
            </div>
        </div>
    );
}

export async function loadAdmin() {
    var data = await
    fetch('http://localhost:3001/admin')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        return data;
    })
    .catch(e => {
        console.log(e);
        return null;
    })
    return data;
}


export default Admin;