import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(''); /* State for displaying messages*/

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setMessage(''); // Clear message when user types
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Product name is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price || isNaN(formData.price)) newErrors.price = "price is required";
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = " quantity is required";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const newProduct = {
                id: Date.now(), // Unique ID for each product
                name: formData.name,
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity)
            };

            // Retrieve existing products from localStorage
            const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
            
            // Add the new product to the list
            storedProducts.push(newProduct);

            // Save updated list back to localStorage
            localStorage.setItem("products", JSON.stringify(storedProducts));

            setMessage(`Product added successfully: ${newProduct.name}`);
            setFormData({ name: '', description: '', category: '', price: '', quantity: '' });
        } catch (error) {
            console.error(error);
            setMessage(`Error adding product: ${error.message}`);
        }
    };

    const handleViewProducts = () => {
        console.log('View Products button clicked');
    };

    return (
        <section>
            <h2>Product Management</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name" 
                    required 
                    value={formData.name} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.name}</span>
                
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Product Description" 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.description}</span>
                
                <input 
                    type="text" 
                    name="category" 
                    placeholder="Product Category" 
                    required 
                    value={formData.category} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.category}</span>

                <input 
                    type="number" 
                    name="price" 
                    placeholder="Product Price" 
                    required 
                    value={formData.price} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.price}</span>
                
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Product Quantity" 
                    required 
                    value={formData.quantity} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.quantity}</span>

                <button type="submit">Add Product</button>
            </form>
            {message && <p className="message">{message}</p>} {/* Display message here */}
            <Link to="/product-list"> {/* Ensure route is correct */}
                <button>View Products</button>
            </Link>
        </section>
    );
};

export default ProductManagement;
