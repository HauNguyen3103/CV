import { useState } from 'react';

const ProductForm = ({ product, onSave, onCancel, onEdit, categories, onSaveChanges }) => {
    const defaultDimensions = {
        length: 0,
        width: 0,
        height: 0,
    };

    const [updatedFields, setUpdatedFields] = useState({
        ...product,
        dimensions: product.dimensions || defaultDimensions,
        date: product.date || "",
        category: "",
    });

    const handleFieldChange = (fieldName, value) => {
        setUpdatedFields(prevFields => ({
            ...prevFields,
            [fieldName]: value,
        }));
    };

    const userData = JSON.parse(localStorage.getItem('auth'));

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...updatedFields,
            category: {
                _id: updatedFields.category,
                name: (categories?.find((category) => category._id === updatedFields.category)?.name) || '',
            },
            vendor: {
                _id: userData._id,
                name: userData.name,
            },
        };

        if (onEdit) {
            // Editing an existing product
            onSaveChanges(productData);
        } else {
            // Adding a new product
            onSave(productData);
        }

        window.location.reload();
    };


    return (
        <div>
            <form className='form-control' onSubmit={handleSubmit}>
                <label className='form-control' htmlFor="name">Title:</label>
                <input className='form-control' type="text" id="name" name="name" value={updatedFields.name} onChange={(e) => handleFieldChange("name", e.target.value)} />

                <label className='form-control' htmlFor="price">Price:</label>
                <input className='form-control' type="number" id="price" name="price" step="0.01" value={updatedFields.price} onChange={(e) => handleFieldChange("price", parseFloat(e.target.value))} />

                <label className='form-control' htmlFor="old_price">Old Price:</label>
                <input className='form-control' type="number" id="old_price" name="old_price" step="0.01" value={updatedFields.old_price} onChange={(e) => handleFieldChange("old_price", parseFloat(e.target.value))} />

                <label className='form-control' htmlFor="quantity">Quantity:</label>
                <input className='form-control' type="number" id="quantity" name="quantity" step="1" value={updatedFields.quantity} onChange={(e) => handleFieldChange("quantity", parseFloat(e.target.value))} />

                <label className='form-control' htmlFor="description">Description:</label>
                <input className='form-control' type="text" id="description" name="description" value={updatedFields.description} onChange={(e) => handleFieldChange("description", e.target.value)} />

                <label className='form-control' htmlFor="date">Date:</label>
                <input className='form-control' type="date" id="date" name="date" value={updatedFields.date} onChange={e => handleFieldChange("date", e.target.value)} />

                <label className='form-control' htmlFor="img">Image:</label>
                <input className='form-control' type="text" id="img" name="img" value={updatedFields.img} onChange={e => handleFieldChange("img", e.target.value)} />

                <label className='form-control' htmlFor="length">Length:</label>
                <input className='form-control' type="number" name="length" step="1" value={updatedFields.dimensions.length} onChange={(e) => handleFieldChange("dimensions", { ...updatedFields.dimensions, length: parseFloat(e.target.value) })} />

                <label className='form-control' htmlFor="width">Width:</label>
                <input className='form-control' type="number" name="width" step="1" value={updatedFields.dimensions.width} onChange={(e) => handleFieldChange("dimensions", { ...updatedFields.dimensions, width: parseFloat(e.target.value) })} />

                <label className='form-control' htmlFor="height">Height:</label>
                <input className='form-control' type="number" name="height" step="1" value={updatedFields.dimensions.height} onChange={(e) => handleFieldChange("dimensions", { ...updatedFields.dimensions, height: parseFloat(e.target.value) })} />

                <label className='form-control' htmlFor="category">Category:</label>
                <select
                    className='form-control'
                    name="category"
                    value={updatedFields.category}
                    onChange={(e) => handleFieldChange("category", e.target.value)}
                >
                    <option value="" className='form-control'>Select a category</option>
                    {categories && categories.map(category => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className='form-control' type="submit">{onEdit ? "Save Changes" : "Add Product"}</button>
                {onEdit && <button className='form-control' type="button" onClick={onCancel}>Cancel</button>}
            </form>
        </div>
    );
};

export default ProductForm;
