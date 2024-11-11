import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ username: '', idNumber: '' });

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        setUsers(storedUsers);
    }, []);

    const handleDelete = (idNumber) => {
        const updatedUsers = users.filter(u => u.idNumber !== idNumber);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        alert('User deleted successfully');
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({ 
            username: user.username, 
            idNumber: user.idNumber 
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUsers = users.map(user => 
            user.idNumber === editingUser.idNumber ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setEditingUser(null); // Close the edit form
        alert('User updated successfully');
    };

    const handleCancelEdit = () => {
        setEditingUser(null); // Cancel editing
    };

    return (
        <section>
            <h2>List of Users</h2>
            {editingUser ? (
                <form onSubmit={handleSubmit}>
                    <h3>Edit User</h3>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                    <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} placeholder="ID Number" required disabled />
                    <button type="submit">Save</button>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>ID Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.idNumber}>
                                <td>{user.username}</td>
                                <td>{user.idNumber}</td>
                                <td>
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                    <button onClick={() => handleDelete(user.idNumber)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default UserList;
