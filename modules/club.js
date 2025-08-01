import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },

  clubName: { type: String },
  clubType: { type: String }, // e.g., 'university', 'independent', etc.
  parentOrganization: { type: String },
  foundingYear: { type: String },
  memberCount: { type: String },

  location: { type: String },
  clubDescription: { type: String },
  fullName: { type: String }, // Possibly the founder or president
  role: { type: String },     // e.g., 'club'

  logo: { type: mongoose.Schema.Types.Mixed }, // Use Buffer/String depending on how you handle images

  mainActivities: [{ type: String }], // e.g., ['Hackathons', 'Workshops']
  
  socialLinks: {
    website: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  }

}, { timestamps: true });

export default mongoose.model('club', clubSchema);
