import express from 'express';
import { createStudent, updateStudent, deleteStudent, getAllStudents, getStudent } from '../controllers/studentController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/create', verifyToken, isAdmin, createStudent);
router.put('/update/:rollNumber', verifyToken, isAdmin, updateStudent);
router.delete('/delete/:rollNumber', verifyToken, isAdmin, deleteStudent);
router.get('/all', verifyToken, getAllStudents);
router.get("/:rollNumber", verifyToken, getStudent);

export default router;