import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
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
      select: false
    },

    // Club Profile Fields
    clubName: { type: String },
    clubType: { type: String }, // e.g., 'university', 'independent'
    parentOrganization: { type: String },
    foundingYear: { type: String },
    memberCount: { type: String },

    location: { type: String },
    clubDescription: { type: String },
    fullName: { type: String }, // Founder or President
    role: {
      type: String,
      default: 'club'
    },

    logo: {
      type: mongoose.Schema.Types.Mixed // Could be URL or file Buffer
    },

    mainActivities: [{ type: String }], // e.g., ['Hackathons', 'Workshops']

    socialLinks: {
      website: { type: String },
      instagram: { type: String },
      linkedin: { type: String }
    }
  },
  { timestamps: true }
);

export default mongoose.model('club', clubSchema);
