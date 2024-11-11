import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(''); // State for displaying messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setMessage(''); // Clear message when user types
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
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
            const newUser = {
                username: formData.username,
                idNumber: Date.now().toString() // Unique ID for each user
            };

            // Retrieve existing users from localStorage
            const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
            
            // Add the new user to the list
            storedUsers.push(newUser);

            // Save updated list back to localStorage
            localStorage.setItem("users", JSON.stringify(storedUsers));

            setMessage(`User added successfully: ${newUser.username}`);
            setFormData({ username: '', password: '' });
        } catch (error) {
            console.error(error);
            setMessage(`Error adding user: ${error.message}`);
        }
    };

    return (
        <section>
            <h2>User Management</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    required 
                    value={formData.username} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.username}</span>

                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    required 
                    value={formData.password} 
                    onChange={handleChange} 
                />
                <span className="error-message">{errors.password}</span>

                <button type="submit">Add User</button>
            </form>
            {message && <p className="message">{message}</p>} {/* Display message here */}
            <Link to="/user-list"> {/* Ensure that the route is correct */}
                <button>View Users</button>
            </Link>
        </section>
    );
};

export default UserManagement;
