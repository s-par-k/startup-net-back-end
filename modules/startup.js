import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  startupName: String
}, { timestamps: true });

export default mongoose.model('startup', startupSchema);
