import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Import Link for navigation
import './App.css';
import Auth from './Auth';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import StockManagement from './StockManagement';
import ProductList from './ProductList';
import UserList from './UserList';
import StockList from './StockList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLogin = () => {
        setIsAuthenticated(true);
    };
    
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="container">
            <div id="welcome-page">
                    <h1>WELCOME TO WINGS CAFE!!!</h1>
                </div>
                <header>
                    <h2>HELLO WELCOME BACK TO OUR STORE!</h2>
                    {isAuthenticated && (
                        <nav>
                                 
                                <Link to="/product-management">PRODUCT MANAGEMENT</Link>
                                <Link to="/user-management">USER MANAGEMENT</Link>
                                <Link to="/dashboard">DASHBOARD</Link>
                                <Link to="/stock-management">STOCK MANAGEMENT</Link>
                                <button onClick={handleLogout}>LOG OUT</button>
                            
                        </nav>
                    )}
                </header>
                
                <Routes>
                    <Route path="/" element={<Auth onLogin={handleLogin} />} />
    
                    <Route path="/product-management" element={isAuthenticated ? <ProductManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/user-management" element={isAuthenticated ? <UserManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/stock-management" element={isAuthenticated ? <StockManagement /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/product-list" element={isAuthenticated ? <ProductList /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/user-list" element={isAuthenticated ? <UserList /> : <Auth onLogin={handleLogin} />} />
                    <Route path="/stock-list" element={isAuthenticated ? <StockList /> : <Auth onLogin={handleLogin} />} />
                    
                </Routes>
            </div>
        </Router>
    );
};

export default App;