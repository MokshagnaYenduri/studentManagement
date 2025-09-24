import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    rollNumber: {type: String, required: true, unique: true},
    studentName: {type: String, required: true},
    course: {type: String, required: true},
    cgpa: {type: Number, required: true},
});

export default mongoose.model('Student', studentSchema);