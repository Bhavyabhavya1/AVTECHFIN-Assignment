const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const {
    getAllStudents,
    getStudentProfile,
    updateStudentProfile,
    addStudent,
    updateStudent,
    deleteStudent,
} = require('../controllers/studentController');

// Routes for both students and admins
router.get('/profile', verifyToken, getStudentProfile);
router.put('/profile', verifyToken, updateStudentProfile);

// Routes for Admins only
router.get('/', verifyToken, isAdmin, getAllStudents);
router.post('/', verifyToken, isAdmin, addStudent);
router.put('/:id', verifyToken, isAdmin, updateStudent);
router.delete('/:id', verifyToken, isAdmin, deleteStudent);

module.exports = router;