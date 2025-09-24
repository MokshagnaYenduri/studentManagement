import express from 'express';
import { createStudent, updateStudent, deleteStudent, getAllStudents, getStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post('/create', createStudent);
router.put('/update/:rollNumber', updateStudent);
router.delete('/delete/:rollNumber', deleteStudent);
router.get('/all', getAllStudents);
router.get("/:rollNumber", getStudent);