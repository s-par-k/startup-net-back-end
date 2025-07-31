import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  studentId: String,
  university: String
}, { timestamps: true });

export default mongoose.model('student', studentSchema);
