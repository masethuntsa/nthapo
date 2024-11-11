import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate

const Auth = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.password) newErrors.password = "Password is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (isSignUp) {
            signUp();
        } else {
            login();
        }
    };

    const signUp = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === formData.username)) {
            alert('User with this username already exists.');
            return;
        }
        users.push(formData);
        localStorage.setItem("users", JSON.stringify(users));
        alert('Account created successfully');
        setIsSignUp(false);
    };

    const login = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === formData.username && u.password === formData.password);
        if (user) {
            onLogin(); // Call onLogin to set authentication
            navigate('/dashboard'); // Redirect to the dashboard after successful login
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <section>
            <h2>{isSignUp ? "REGISTER" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" required value={formData.username} onChange={handleChange} className={errors.username ? 'error' : ''} />
                <span className="error-message">{errors.username}</span>
                
                <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className={errors.password ? 'error' : ''} />
                <span className="error-message">{errors.password}</span>
                
                <button type="submit">{isSignUp ? "REGISTER" : "Login"}</button>
                
                <p>
                    {isSignUp ? "Already have an account? " : "DO YOU WANT TO REGISTER? "}
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? "Login" : "REGISTER"}</button>
                </p>
            </form>
        </section>
    );
};

export default Auth;