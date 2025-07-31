import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    enum: ['club', 'startup', 'student']
  },
  // Additional fields specific to each role
  profile: {
    name: { type: String, required: true },
    // Club-specific fields
    clubName: { type: String, required: function() { return this.role === 'club'; } },
    // Startup-specific fields
    startupName: { type: String, required: function() { return this.role === 'startup'; } },
    // Student-specific fields
    studentId: { type: String, required: function() { return this.role === 'student'; } },
    university: { type: String, required: function() { return this.role === 'student'; } }
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);