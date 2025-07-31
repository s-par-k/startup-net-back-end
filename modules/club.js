import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  clubName: String
}, { timestamps: true });

export default mongoose.model('club', clubSchema);
