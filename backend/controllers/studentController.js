import mongoose from "mongoose";
import express from "express";
import Student from "../models/student.js";

const router = express.Router();

// Create a new student
export const createStudent = async (req, res) => {
    const {rollNumber, studentName, course, cgpa} = req.body;
    try {
        const existingStudent = await Student.findOne({rollNumber});
        if(existingStudent) {
            return res.status(400).json({message: 'Student with this roll number already exists'});
        }
        const newStudent = new Student({
            rollNumber,
            studentName,
            course,
            cgpa
        });
        await newStudent.save();
        res.status(200).json({message: 'Student created successfully'});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

export const updateStudent = async (req, res) => {
    const {rollNumber} = req.params;
    const {studentName, course, cgpa} = req.body;

    try {
        const student = await Student.findOne({rollNumber});
        if(!student) {
            return res.status(404).json({message: 'Student not found'});
        }
        student.name = studentName || student.studentName;
        student.course = course || student.course;
        student.cgpa = cgpa || student.cgpa;

        await student.save();
        res.status(200).json({message: 'Student updated successfully'});
    }
    catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}