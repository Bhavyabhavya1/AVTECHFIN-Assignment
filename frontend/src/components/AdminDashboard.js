import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', course: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchStudents = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/students', {
                headers: { 'x-auth-token': token },
            });
            setStudents(res.data);
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:5000/api/students', formData, {
                headers: { 'x-auth-token': token },
            });
            setFormData({ name: '', email: '', course: '' });
            fetchStudents();
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/students/${id}`, {
                headers: { 'x-auth-token': token },
            });
            fetchStudents();
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    const handleEditClick = (student) => {
        setEditingId(student._id);
        setFormData({ name: student.name, email: student.email, course: student.course });
    };

    const handleUpdate = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/students/${editingId}`, formData, {
                headers: { 'x-auth-token': token },
            });
            setEditingId(null);
            setFormData({ name: '', email: '', course: '' });
            fetchStudents();
        } catch (err) {
            console.error(err.response.data.msg);
        }
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h2 className="card-title text-center mb-4">Admin Dashboard</h2>
                <h3 className="mb-3">Add New Student</h3>
                <form onSubmit={handleAddStudent} className="row g-3">
                    <div className="col-md-4">
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Name" required />
                    </div>
                    <div className="col-md-4">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Email" required />
                    </div>
                    <div className="col-md-4">
                        <input type="text" name="course" value={formData.course} onChange={handleChange} className="form-control" placeholder="Course" required />
                    </div>
                    <div className="col-12">
                        <div className="d-grid">
                            <button type="submit" className="btn btn-success">Add Student</button>
                        </div>
                    </div>
                </form>

                <h3 className="mt-5 mb-3">All Students</h3>
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Enrollment Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student._id}>
                                    <td>{editingId === student._id ? <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" /> : student.name}</td>
                                    <td>{editingId === student._id ? <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" /> : student.email}</td>
                                    <td>{editingId === student._id ? <input type="text" name="course" value={formData.course} onChange={handleChange} className="form-control" /> : student.course}</td>
                                    <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                                    <td>
                                        {editingId === student._id ? (
                                            <button onClick={handleUpdate} className="btn btn-success btn-sm me-2">Save</button>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(student)} className="btn btn-primary btn-sm me-2">Edit</button>
                                                <button onClick={() => handleDelete(student._id)} className="btn btn-danger btn-sm">Delete</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;