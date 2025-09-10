import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/students/profile', {
                    headers: { 'x-auth-token': token },
                });
                setUser(res.data);
                setFormData(res.data);
            } catch (err) {
                console.error(err.response.data.msg);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/students/profile', formData, {
                headers: { 'x-auth-token': token },
            });
            setIsEditing(false);
            setUser(formData);
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Student Dashboard</h2>
                {isEditing ? (
                    <div>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Course</label>
                            <input type="text" name="course" value={formData.course} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="d-grid gap-2">
                            <button onClick={handleUpdate} className="btn btn-success">Save</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Course:</strong> {user.course}</p>
                        <p><strong>Enrollment Date:</strong> {new Date(user.enrollmentDate).toLocaleDateString()}</p>
                        <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;