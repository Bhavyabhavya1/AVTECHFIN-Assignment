const User = require('../models/User');

const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' }).select('-password');
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getStudentProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateStudentProfile = async (req, res) => {
    const { name, email, course } = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.course = course || user.course;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const addStudent = async (req, res) => {
    const { name, email, password, course } = req.body;
    try {
        const newStudent = new User({ name, email, password, course, role: 'Student' });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email, course } = req.body;
    try {
        let student = await User.findById(id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        student.name = name || student.name;
        student.email = email || student.email;
        student.course = course || student.course;
        await student.save();
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await User.findById(id);
        if (!student) {
            return res.status(404).json({ msg: 'Student not found' });
        }
        await User.deleteOne({ _id: id });
        res.json({ msg: 'Student removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllStudents,
    getStudentProfile,
    updateStudentProfile,
    addStudent,
    updateStudent,
    deleteStudent,
};