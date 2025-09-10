import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            onLogin(res.data);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter email" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Password" required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    Don't have an account? <Link to="/signup">Sign up here</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;