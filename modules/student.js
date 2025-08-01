import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      select: false // avoid returning password by default
    },
    role: {
      type: String,
      default: 'student'
    },
    // Profile fields (flattened)
    fullName: { type: String },
    country: { type: String },
    state: { type: String },
    district: { type: String },
    university: { type: String },
    isUniversityCollege: { type: Boolean },
    college: { type: String },
    graduationYear: { type: String },
    course: { type: String },
    major: { type: String },
    skills: [{ type: String }],
    bio: { type: String },
    linkedinUrl: { type: String },
    githubUrl: { type: String },
    interests: [{ type: String }]
  },
  { timestamps: true }
);

export default mongoose.model('student', studentSchema);
