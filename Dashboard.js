import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const images = [
    'wings.jpg',
    'tea.jpg',
    'aww.jpg',
    'meat.jpg',
    'yeah.jpg',
];

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
        const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
        setTransactions(storedTransactions);

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    const calculateSoldStock = (product) => {
        return product.quantity < 20 ? 20 - product.quantity : 0;
    };

    const calculateTotalStockValue = () => {
        return products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2);
    };

    const handleDeleteTransaction = (index) => {
        const confirmDelete = window.confirm("Are you sure to delete?");
        if (confirmDelete) {
            const newTransactions = transactions.filter((_, i) => i !== index);
            setTransactions(newTransactions);
            localStorage.setItem("transactions", JSON.stringify(newTransactions));
        }
    };

    return (
        <section className="container" style={{
            minHeight: '100vh',
            color: 'white'
        }}>
            <h2>Dashboard</h2>
            <h3>Total Stock Value: M{calculateTotalStockValue()}</h3>
            <div className="chart-container">
                <h3>Product Quantity Overview</h3>
                {products.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={products} barSize={50}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="quantity" fill="#007bff" />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div>Data unavailable to be displayed</div>
                )}
            </div>

            <h3>Product Inventory</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Stock Level</th>
                        <th>Sold Stock</th>
                        <th>Sold Products</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                                <td>M{product.price.toFixed(2)}</td>
                                <td>{product.quantity < 5 ? "Low Stock" : "Available"}</td>
                                <td>{calculateSoldStock(product)}</td>
                                <td>{calculateSoldStock(product) > 0 ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>No Products Available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
            }}>
                <img
                src={images[currentImageIndex]}
                alt="Rotating Product"
                style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                transition: 'transform 1s linear',
                transform: `rotate(${currentImageIndex * 90}deg)`
                    }}
        />
    </div>
    </section>
    );
};

export default Dashboard;
