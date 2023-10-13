import { Link, useLoaderData, useNavigate } from "react-router-dom";
function SellerApproval() {
    const navigate = useNavigate();
    const loadData = useLoaderData();
    console.log(loadData);

    async function updateSellerStatus(phone, email, verified) {
        const data = {
            phone: phone,
            email: email,
            verified : verified
        }
        await fetch(`http://localhost:3001/admin/seller/update`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(e => {
            console.log(e);
            return null;
        })
        navigate(0);
    }

    return (
        <div className="row">
            <div className="col-2">
                <button className="btn btn-primary mx-5 mt-2">
                    <Link to={`/admin`} className="text text-white">Go Back</Link>
                </button>
            </div>
            <div className='col-8 d-inline-block mt-2'>
                {
                    loadData.map(item => {
                        return (
                            <div className="border border-3 border-primary mb-3">
                                <h1><strong>Username: </strong>{item.username}</h1>
                                <h1><strong>Email: </strong>{item.email}</h1>
                                <h1><strong>Phone: </strong>{item.phone}</h1>
                                <h1><strong>Business Name: </strong>{item.business_name}</h1>
                                <div className="d-block">
                                    <div className="justify-content-center align-content-center d-flex"> 
                                        <h1>
                                        {(item.verified) 
                                        ? <span className="text text-success fw-bold">Status: Verified</span>
                                        : 
                                        <span className="text text-danger fw-bold">Status: Not Verified</span>}</h1>
                                    </div>
                                    <div className="justify-content-center align-content-center d-flex"> 
                                        {(item.verified) ?
                                                                            
                                            <button className="btn btn-danger fw-bold" onClick={() => updateSellerStatus(item.phone, item.email, item.verified)}>
                                                Unverified
                                            </button>
                                            :
                                            <button className="btn btn-success fw-bold" onClick={() => updateSellerStatus(item.phone, item.email, item.verified)}>
                                                Verified
                                            </button>

                                        }
                                    </div>
                                </div>
                            </div>
                        
                        );
                    })
                }
            </div>
        </div>
    );
}


export async function loadSeller() {
    var data = await
    fetch('http://localhost:3001/admin/seller')
    .then(res => res.json())
    .then(data => {
        return data;
    })
    .catch(e => {
        console.log(e);
        return null;
    })
    console.log(data);
    return data;
    
}

export default SellerApproval;