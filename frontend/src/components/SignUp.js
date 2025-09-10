import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);
            navigate('/login');
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter email" required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Create a password" required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-success">Sign Up</button>
                    </div>
                </form>
                <p className="mt-3 text-center">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;