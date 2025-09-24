import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    studentName: {type: String, required: true},
    course: {type: String, required: true},
    cgpa: {type: Number, required: true},
});

export default mongoose.model('Student', studentSchema);