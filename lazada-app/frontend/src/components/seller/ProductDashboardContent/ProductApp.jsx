import { useState, useEffect } from 'react';
import ProductList from './ProductList';

const ProductApp = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [nextProductId, setNextProductId] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userData = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        // Fetch products data
        fetch('http://localhost:3001/api/vendor/product/get-all', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "vendor_name": userData.name }),

        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    setProducts(data.data);
                    setLoading(false);
                } else {
                    throw new Error(data.message || 'Failed to fetch data');
                }
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });

        // Fetch category data
        fetch('http://localhost:3001/api/vendor/category/get-all')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    setCategories(data.data);
                } else {
                    throw new Error(data.message || 'Failed to fetch categories');
                }
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    const handleEdit = (updatedProducts) => {
        // const updatedProducts = products.map(product => {
        //     if (product._id === productId) {
        //         return { ...product, ...updatedFields };
        //     }
        //     return product;
        // });
        setProducts(updatedProducts);
    };

    const handleAddProduct = (newProduct) => {
        const updatedProducts = [...products, { ...newProduct, _id: nextProductId }];
        setProducts(updatedProducts);
        setNextProductId(nextProductId + 1);
    };

    const createProduct = (newProductData) => {
        fetch('http://localhost:3001/api/vendor/product/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProductData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    handleAddProduct(data.data);
                } else {
                    throw new Error(data.message || 'Failed to create product');
                }
            })
            .catch((error) => {
                setError(error);
            });
    };

    const handleDelete = (productId) => {
        // Send a DELETE request to the API endpoint
        fetch(`http://localhost:3001/api/vendor/product/delete/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    // Remove the deleted product from the state
                    const updatedProducts = products.filter((product) => product._id !== productId);
                    setProducts(updatedProducts);
                } else {
                    throw new Error(data.message || 'Failed to delete product');
                }
            })
            .catch((error) => {
                setError(error);
            });
    };

    const updateProduct = (updatedProductData) => {
        fetch(`http://localhost:3001/api/vendor/product/update/${updatedProductData._id}`, {
            method: 'PUT', // Use PUT method for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'OK') {
                    handleEdit(data.data);
                } else {
                    throw new Error(data.message || 'Failed to update product');
                }
            })
            .catch((error) => {
                setError(error); // Handle and display any errors
            });
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <ProductList
                products={products}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onSaveChanges={updateProduct}
                onSave={createProduct}
                onCancel={() => { }}
                categories={categories}
            />
        </div>
    );
};

export default ProductApp;
