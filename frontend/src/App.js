import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminDashboard from './components/AdminDashboard';
import StudentDashboard from './components/StudentDashboard';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (token && storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData.user));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <Router>
            <div className="container mt-5">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        
                        <div className="d-flex">
                            {user && <button className="btn btn-danger" onClick={handleLogout}>Logout</button>}
                        </div>
                    </div>
                </nav>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8">
                        <Routes>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/signup" element={<SignUp />} />
                            {user?.role === 'Admin' ? (
                                <Route path="/dashboard" element={<AdminDashboard />} />
                            ) : user?.role === 'Student' ? (
                                <Route path="/dashboard" element={<StudentDashboard />} />
                            ) : (
                                <Route path="*" element={<Login onLogin={handleLogin} />} />
                            )}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;