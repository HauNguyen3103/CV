import React, { useEffect, useState } from 'react'
import AdminMenu from './../../components/AdminLayout/index'
import axios from 'axios'
import CategoryForm from './../../components/Form/CategoryForm';
import { Form, Button, Toast } from 'react-bootstrap';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  // handle Form
    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('/api/v1/category/create-category', {name});
            if (data?.success) {
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 1000);
                getAllCategory();
                setName(""); // Reset value input
            } else {
                setShowErrorToast(true);
                setTimeout(() => setShowErrorToast(false), 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

  // Get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category')
      if (data.success) {
        setCategories(data.category)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Update category

  // Delete category
  const handleDelete = async (pId) => {
    try {
        const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`);
        if (data?.success) {
            setShowDeleteSuccessToast(true);
            setTimeout(() => setShowDeleteSuccessToast(false), 1000);
            getAllCategory();
        } else {
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 1000);
        }
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  return (
    <div className='m-3 p-3' style={{ height: '80vh' }}>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1> Manage Category</h1>
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}></CategoryForm>
          </div>
          <div className='w-75'>
            <table className='table'>
              <thead >
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {categories?.map((c) => (
                    <>
                    <tr>
                        <td key={c._id}>
                            {c.name}
                        </td>
                        <td> <button className='btn btn-primary ms-2'>Edit</button>
                         <button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id)}>Delete</button>
                        </td>
                    </tr>
                    </>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        {/* Success Toast */}
        <Toast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} bg="success" className="position-fixed top-0 start-50 translate-middle-x m-4 text-white">
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Category created successfully.</Toast.Body>
      </Toast>
        

         {/* Delete Success Toast */}
      <Toast show={showDeleteSuccessToast} onClose={() => setShowDeleteSuccessToast(false)} bg="success"  className="position-fixed top-0 start-50 translate-middle-x m-4 text-white">
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Category deleted successfully.</Toast.Body>
      </Toast>


      {/* Error Toast */}
      <Toast show={showErrorToast} onClose={() => setShowErrorToast(false)} bg="danger" text="white"   className="position-fixed top-0 start-50 translate-middle-x m-4 text-white">
        <Toast.Header>
          <strong className="mr-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Error creating the category. Please try again.</Toast.Body>
      </Toast>
    </div>
  )
}

export default CreateCategory
