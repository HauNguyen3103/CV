import { useState } from 'react';
import ProductForm from './ProductForm';
import styles from './Product.module.css';

const ProductList = ({ products, onDelete, onEdit, onSave, categories, onSaveChanges }) => {
    const [editingProduct, setEditingProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchMinPrice, setSearchMinPrice] = useState('');
    const [searchMaxPrice, setSearchMaxPrice] = useState('');
    const productsPerPage = 5;

    const handleEditClick = (productId) => {
        setEditingProduct(productId);
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
    };

    console.log("Products:", products);
    const filteredProducts = products.filter(product =>
        (product.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) || false) &&
        (searchDate === '' || (product.date && product.date.includes(searchDate))) &&
        (searchMinPrice === '' || product.price >= parseFloat(searchMinPrice)) &&
        (searchMaxPrice === '' || product.price <= parseFloat(searchMaxPrice))
    );
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationControls = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationControls.push(
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "active" : ""}
            >
                {page}
            </button>
        );
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search by product name"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <input
                type="date"
                placeholder="Search by date (YYYY-MM-DD)"
                value={searchDate}
                onChange={e => setSearchDate(e.target.value)}
            />
            <input
                type="number"
                placeholder="Search by minimum price"
                value={searchMinPrice}
                onChange={e => setSearchMinPrice(e.target.value)}
            />
            <input
                type="number"
                placeholder="Search by maximum price"
                value={searchMaxPrice}
                onChange={e => setSearchMaxPrice(e.target.value)}
            />
            {onSave && (
                <div>
                    <h3>Add New Product</h3>
                    <ProductForm
                        product={{
                            name: '',
                            price: 0,
                            old_price: 0,
                            quantity: 0,
                            description: '',
                            dimensions: { length: 0, width: 0, height: 0 },
                            img: '',
                        }}
                        onSave={onSave}
                        categories={categories}
                        onCancel={handleCancelEdit}
                        onEdit={false}
                    />
                </div>
            )}
            {products.length === 0 ? (
                <p>Please Add Your Product</p>
            ) : (
                <ul className='form-control' >
                    {currentProducts.map(product => (
                        <li className='form-control' key={product._id}>
                            <h3>{product.name}</h3>
                            <p>Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            <p>Old Price: ${product.old_price}</p>
                            <p>Quantity: {product.quantity}</p>
                            <p>Category: {product.category && typeof product.category === 'object' ? product.category.name : product.category}</p>
                            <p>Date: {product.date}</p>
                            <img className={`${styles.maxwidth}`} src={product.img} alt="" />
                            {product.dimensions && (
                                <p>
                                    Dimensions: {product.dimensions.length} x {product.dimensions.width} x {product.dimensions.height}
                                </p>
                            )}
                            {editingProduct === product._id ? (
                                <div>
                                    <ProductForm
                                        product={product}
                                        onSave={(updatedFields) => {
                                            onEdit(product._id, updatedFields);
                                            setEditingProduct(null);
                                        }}
                                        onCancel={handleCancelEdit}
                                        categories={categories}
                                        onEdit={editingProduct === product._id}
                                        onSaveChanges={onSaveChanges}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <button onClick={() => onDelete(product._id)}>Delete</button>
                                    <button onClick={() => handleEditClick(product._id)}>Edit</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {paginationControls}
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentProducts.length < productsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
